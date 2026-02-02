import {
  PRIMARY_COLOR,
  SECONDARY_VARIANT_COLOR,
  SURFACE_COLOR,
} from '@/src/constants/style';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { borderRadius: 20, padding: 20, backgroundColor: SURFACE_COLOR },
  header: { justifyContent: 'space-between', flexDirection: 'row' },
  headerText: { color: SECONDARY_VARIANT_COLOR },
  separator: {
    borderBottomWidth: 1,
    borderColor: SECONDARY_VARIANT_COLOR,
    marginTop: 3,
    marginBottom: 10,
  },
  mainText: { color: PRIMARY_COLOR },
  moods: { color: SECONDARY_VARIANT_COLOR, paddingTop: 10 },
  photos: { paddingTop: 10 },
});
