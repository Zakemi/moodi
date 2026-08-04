import { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { httpsCallable } from '@react-native-firebase/functions';

import { getFunctionsClient } from '@/src/helpers/firebaseFunctions';
import { diaryEntries } from '@/src/store/diary';
import { DiaryStoreEntity } from '@/src/types';

export interface WeeklySummary {
  summary: string;
  moodTrend: { mood: string; count: number }[];
  highlight: string;
}

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getIsoWeekKey(date: Date): string {
  // Same-week entries always land on the same Monday, giving a stable cache key.
  const day = (date.getDay() + 6) % 7;
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(date.getDate() - day);
  return monday.toISOString().slice(0, 10);
}

function getEntriesFromLastWeek(
  entries: DiaryStoreEntity[],
): DiaryStoreEntity[] {
  const cutoff = Date.now() - ONE_WEEK_MS;
  return entries.filter((entry) => new Date(entry.created).getTime() >= cutoff);
}

export const useWeeklySummary = () => {
  const allEntries = useSelector(diaryEntries) as DiaryStoreEntity[];
  const [summary, setSummary] = useState<WeeklySummary | null>(null);
  const [cacheKey, setCacheKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inFlightKey = useRef<string | null>(null);

  // Recomputed only when allEntries changes, so its identity stays stable
  // across renders triggered by this hook's own loading/error state updates.
  const weekEntries = useMemo(
    () => getEntriesFromLastWeek(allEntries),
    [allEntries],
  );
  const requestKey =
    weekEntries.length > 0
      ? `${getIsoWeekKey(new Date())}:${weekEntries.length}`
      : null;

  const generateSummary = useCallback(async () => {
    if (!requestKey || weekEntries.length === 0) {
      return;
    }
    if (requestKey === cacheKey && summary) {
      return;
    }
    if (inFlightKey.current === requestKey) {
      return;
    }

    inFlightKey.current = requestKey;
    setLoading(true);
    setError(null);
    try {
      const callable = httpsCallable(
        getFunctionsClient(),
        'generateWeeklySummary',
      );
      const result = await callable({
        entries: weekEntries.map((entry) => ({
          text: entry.text,
          moods: entry.moods,
          created: entry.created,
        })),
      });
      setSummary(result.data as WeeklySummary);
      setCacheKey(requestKey);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate summary',
      );
    } finally {
      inFlightKey.current = null;
      setLoading(false);
    }
  }, [requestKey, weekEntries, cacheKey, summary]);

  return {
    summary,
    loading,
    error,
    hasEntriesThisWeek: weekEntries.length > 0,
    generateSummary,
  };
};
