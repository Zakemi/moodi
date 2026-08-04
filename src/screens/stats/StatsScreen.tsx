import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { WeeklySummary } from '@/src/hooks/useWeeklySummary';
import { useThemedStyle } from '@/src/screens/stats/StatsSceen.styles';

export interface StatsScreenProps {
  summary: WeeklySummary | null;
  loading: boolean;
  error: string | null;
  hasEntriesThisWeek: boolean;
  generateSummary: () => void;
}

export function StatsScreen({
  summary,
  loading,
  error,
  hasEntriesThisWeek,
  generateSummary,
}: StatsScreenProps) {
  const styles = useThemedStyle();

  useEffect(() => {
    generateSummary();
  }, [generateSummary]);

  if (!hasEntriesThisWeek) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.text}>
          Write a diary entry this week to see your summary here.
        </Text>
      </View>
    );
  }

  if (loading && !summary) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This week</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {summary && (
        <View style={styles.card}>
          <Text style={styles.summaryText}>{summary.summary}</Text>
          {!!summary.moodTrend.length && (
            <>
              <Text style={styles.sectionLabel}>Moods</Text>
              {summary.moodTrend.map((entry) => (
                <View key={entry.mood} style={styles.moodRow}>
                  <Text style={styles.moodText}>{entry.mood}</Text>
                  <Text style={styles.moodText}>{entry.count}</Text>
                </View>
              ))}
            </>
          )}
          {!!summary.highlight && (
            <Text style={styles.highlightText}>{summary.highlight}</Text>
          )}
        </View>
      )}
      {error && (
        <Pressable style={styles.button} onPress={generateSummary}>
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      )}
    </View>
  );
}
