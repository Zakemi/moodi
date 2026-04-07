import { Text, View } from 'react-native';
import { useThemedStyle } from '@/src/screens/stats/StatsSceen.styles';

export function StatsScreen() {
  const styles = useThemedStyle();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics page</Text>
    </View>
  );
}
