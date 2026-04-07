import { createThemedStyleSheet } from '@/src/contexts/Theme';

export const useThemedStyle = createThemedStyleSheet(() => ({
  button: {
    backgroundColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  disabled: {
    backgroundColor: '#777',
  },
}));
