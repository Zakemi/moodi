import { createThemedStyleSheet, Theme } from '@/src/contexts/Theme';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.onSurface,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  summaryText: {
    fontSize: 16,
    color: theme.colors.onSurface,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  moodText: {
    color: theme.colors.onSurface,
  },
  highlightText: {
    color: theme.colors.onSurface,
    fontStyle: 'italic',
    marginTop: 16,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.onAccent,
    fontWeight: '600',
  },
}));
