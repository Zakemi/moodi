import { StatsScreen } from '@/src/screens/stats';
import { useWeeklySummary } from '@/src/hooks/useWeeklySummary';

export const StatsContainer = () => {
  const { summary, loading, error, hasEntriesThisWeek, generateSummary } =
    useWeeklySummary();

  return (
    <StatsScreen
      summary={summary}
      loading={loading}
      error={error}
      hasEntriesThisWeek={hasEntriesThisWeek}
      generateSummary={generateSummary}
    />
  );
};
