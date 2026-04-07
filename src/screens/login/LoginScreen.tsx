import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedStyle } from './LoginScreen.styles';
import { Text, TouchableOpacity, View } from 'react-native';

interface LoginScreenProps {
  onGoogleLogin: () => void;
  onGuestLogin: () => void;
}

export const LoginScreen = ({
  onGoogleLogin,
  onGuestLogin,
}: LoginScreenProps) => {
  const styles = useThemedStyle();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Login with a user</Text>
        <GoogleSigninButton onPress={onGoogleLogin} style={styles.fullwidth} />
        <TouchableOpacity onPress={onGuestLogin} style={styles.button}>
          <Text style={styles.buttonText}>or continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
