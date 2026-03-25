import { createThemedStyleSheet } from '@/src/containers/ThemeContext';

export const useThemedStyle = createThemedStyleSheet(() => ({
  userName: {
    marginLeft: 5,
  },
  logoutButton: {
    marginLeft: 20,
    marginRight: 25,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
}));
