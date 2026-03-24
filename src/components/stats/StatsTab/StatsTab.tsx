import { Text, View } from 'react-native';
import { useThemedStyle } from '@/src/components/stats/StatsTab/StatsTab.styles';

export function StatsTab() {
  const styles = useThemedStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics page</Text>
    </View>
  );
}
