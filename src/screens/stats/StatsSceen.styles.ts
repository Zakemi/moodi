import { createThemedStyleSheet, Theme } from '@/src/contexts/Theme';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.onSurface,
  },
}));
