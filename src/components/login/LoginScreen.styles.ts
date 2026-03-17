import { StyleSheet } from 'react-native';
import {
  ON_ACCENT_COLOR,
  PRIMARY_COLOR,
  SURFACE_COLOR,
} from '@/src/constants/style';

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: PRIMARY_COLOR,
    color: ON_ACCENT_COLOR,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  container: {
    backgroundColor: SURFACE_COLOR,
    padding: 30,
    borderRadius: 20,
    gap: 30,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: PRIMARY_COLOR,
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
    color: PRIMARY_COLOR,
  },
});
