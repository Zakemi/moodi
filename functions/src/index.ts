import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import Anthropic from '@anthropic-ai/sdk';

const anthropicApiKey = defineSecret('ANTHROPIC_API_KEY');

const MAX_ENTRIES = 200;
const MAX_TEXT_LENGTH = 4000;

interface WeeklySummaryEntry {
  text: string;
  moods: string[];
  created: string;
}

interface WeeklySummaryResult {
  summary: string;
  moodTrend: { mood: string; count: number }[];
  highlight: string;
}

const summaryFormatSchema = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    moodTrend: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          mood: { type: 'string' },
          count: { type: 'integer' },
        },
        required: ['mood', 'count'],
        additionalProperties: false,
      },
    },
    highlight: { type: 'string' },
  },
  required: ['summary', 'moodTrend', 'highlight'],
  additionalProperties: false,
} as const;

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  timeZone: 'UTC',
});

// Hour ranges are UTC, matching the UTC calendar-day grouping below.
// Upper bounds are exclusive; `night` wraps past midnight (21:00–3:59).
const TIME_OF_DAY_RANGES: { label: string; startHour: number }[] = [
  { label: 'night', startHour: 0 },
  { label: 'dawn', startHour: 4 },
  { label: 'morning', startHour: 7 },
  { label: 'noon', startHour: 12 },
  { label: 'afternoon', startHour: 13 },
  { label: 'evening', startHour: 17 },
  { label: 'night', startHour: 21 },
];

function getTimeOfDayLabel(created: string): string {
  const hour = new Date(created).getUTCHours();
  let label = TIME_OF_DAY_RANGES[0].label;
  for (const range of TIME_OF_DAY_RANGES) {
    if (hour >= range.startHour) {
      label = range.label;
    }
  }
  return label;
}

function groupEntriesByDate(
  entries: WeeklySummaryEntry[],
): { dateKey: string; entries: WeeklySummaryEntry[] }[] {
  const groups = new Map<string, WeeklySummaryEntry[]>();
  for (const entry of entries) {
    const dateKey = entry.created.slice(0, 10); // YYYY-MM-DD, UTC calendar day
    const existing = groups.get(dateKey);
    if (existing) {
      existing.push(entry);
    } else {
      groups.set(dateKey, [entry]);
    }
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKey, dayEntries]) => ({
      dateKey,
      entries: [...dayEntries].sort((a, b) =>
        a.created.localeCompare(b.created),
      ),
    }));
}

function formatEntriesPayload(entries: WeeklySummaryEntry[]): string {
  return groupEntriesByDate(entries)
    .map(({ dateKey, entries: dayEntries }) => {
      const weekday = WEEKDAY_FORMATTER.format(
        new Date(`${dateKey}T00:00:00Z`),
      );
      const entryLines = dayEntries
        .map(
          (entry) =>
            `  - [${getTimeOfDayLabel(entry.created)}] moods=[${entry.moods.join(', ')}] "${entry.text}"`,
        )
        .join('\n');
      return `${dateKey} (${weekday}) — ${dayEntries.length} ${
        dayEntries.length === 1 ? 'entry' : 'entries'
      }:\n${entryLines}`;
    })
    .join('\n');
}

function validateEntries(data: unknown): WeeklySummaryEntry[] {
  if (!Array.isArray(data) || data.length === 0) {
    throw new HttpsError(
      'invalid-argument',
      'entries must be a non-empty array',
    );
  }
  if (data.length > MAX_ENTRIES) {
    throw new HttpsError(
      'invalid-argument',
      `entries must not exceed ${MAX_ENTRIES} items`,
    );
  }

  return data.map((entry, index) => {
    if (
      typeof entry !== 'object' ||
      entry === null ||
      typeof (entry as Record<string, unknown>).text !== 'string' ||
      typeof (entry as Record<string, unknown>).created !== 'string' ||
      !Array.isArray((entry as Record<string, unknown>).moods)
    ) {
      throw new HttpsError(
        'invalid-argument',
        `entries[${index}] is malformed`,
      );
    }
    const { text, moods, created } = entry as WeeklySummaryEntry;
    return {
      text: text.slice(0, MAX_TEXT_LENGTH),
      moods: moods.filter((mood): mood is string => typeof mood === 'string'),
      created,
    };
  });
}

export const generateWeeklySummary = onCall(
  { secrets: [anthropicApiKey] },
  async (request): Promise<WeeklySummaryResult> => {
    // TODO add per-user rate limiting/quota — anonymous auth is allowed app-wide,
    //  abusers could run up Anthropic API costs.
    if (!request.auth) {
      throw new HttpsError(
        'unauthenticated',
        'Must be signed in to request a weekly summary',
      );
    }

    const entries = validateEntries(request.data?.entries);

    const client = new Anthropic({ apiKey: anthropicApiKey.value() });

    const entriesPayload = formatEntriesPayload(entries);

    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system:
        'You write short, supportive weekly recaps of a personal mood diary. ' +
        'Be warm and specific, never clinical. Base every claim only on the entries given. ' +
        'Entries are already grouped under their calendar date — treat every entry listed ' +
        'under the same date heading as happening on that single day, even if there are several. ' +
        'Each entry is also tagged with its time of day (dawn, morning, noon, afternoon, evening, or ' +
        'night) — use that to notice patterns, like a mood shift between morning and evening.',
      messages: [
        {
          role: 'user',
          content: `Here are this week's diary entries:\n${entriesPayload}\n\nSummarize the week.`,
        },
      ],
      output_config: {
        format: { type: 'json_schema', schema: summaryFormatSchema },
      },
    });

    if (response.stop_reason === 'refusal') {
      throw new HttpsError(
        'aborted',
        'Unable to generate a summary for this content',
      );
    }

    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new HttpsError('internal', 'No summary text returned');
    }

    // TODO wrap in try/catch and throw a clearer HttpsError on malformed JSON
    return JSON.parse(textBlock.text) as WeeklySummaryResult;
  },
);
