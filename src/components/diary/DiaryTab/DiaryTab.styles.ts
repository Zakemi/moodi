import {
  ACCENT_COLOR,
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
} from '@/src/containers/ThemeContext/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    position: 'relative',
    backgroundColor: BACKGROUND_COLOR,
  },
  addNewContainer: {
    position: 'absolute',
    bottom: 16,
    right: 32,
    zIndex: 100,
  },
  addNewIcon: {
    backgroundColor: ACCENT_COLOR,
    padding: 10,
    borderRadius: 30,
  },
  diaryItemSeparator: { margin: 5 },
  emptyDiaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDiaryText: { color: PRIMARY_COLOR },
});
