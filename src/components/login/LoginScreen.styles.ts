import { createThemedStyleSheet, Theme } from '@/src/containers/ThemeContext';

export const useThemedStyle = createThemedStyleSheet((theme: Theme) => ({
  screen: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.onAccent,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  container: {
    backgroundColor: theme.colors.surface,
    padding: 30,
    borderRadius: 20,
    gap: 30,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  fullwidth: {
    width: '100%',
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
}));
