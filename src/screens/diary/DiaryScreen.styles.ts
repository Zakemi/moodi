import { createThemedStyleSheet, Theme } from '@/src/contexts/Theme';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    position: 'relative',
    backgroundColor: theme.colors.background,
  },
  addNewContainer: {
    position: 'absolute',
    bottom: 16,
    right: 32,
    zIndex: 100,
  },
  addNewIcon: {
    backgroundColor: theme.colors.accent,
    padding: 10,
    borderRadius: 30,
  },
  diaryItemSeparator: { margin: 5 },
  emptyDiaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDiaryText: { color: theme.colors.primary },
}));
