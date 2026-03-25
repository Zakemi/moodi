import { createThemedStyleSheet, Theme } from '@/src/containers/ThemeContext';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  container: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  header: { justifyContent: 'space-between', flexDirection: 'row' },
  headerText: { color: theme.colors.secondaryVariant },
  separator: {
    borderBottomWidth: 1,
    borderColor: theme.colors.secondaryVariant,
    marginTop: 3,
    marginBottom: 10,
  },
  mainText: { color: theme.colors.primary },
  moods: { color: theme.colors.secondaryVariant, paddingTop: 10 },
  photos: { paddingTop: 10 },
}));
