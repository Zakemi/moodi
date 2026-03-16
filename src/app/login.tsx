import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { styles } from '@/src/components/login/LoginScreen.styles';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

export const LoginPage = () => {
  const router = useRouter();

  const googleLogin = async () => {
    GoogleSignin.configure({
      webClientId: 'placeholder',
    });
    const result = await GoogleSignin.signIn();
    console.log(result);
    if (result.type === 'success' && result.data.idToken) {
      signInWithCredential(
        getAuth(),
        GoogleAuthProvider.credential(result.data.idToken),
      );
    }
  };

  const guestLogin = async () => {
    try {
      console.log('pressed login');
      await signInAnonymously(getAuth());
      console.log('login successfully');
      router.navigate('/');
    } catch (error) {
      console.error(error);
      console.log(error.code);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Login with a user</Text>
        <TouchableOpacity onPress={guestLogin} style={styles.button}>
          <Text style={styles.buttonText}>Google account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={guestLogin} style={styles.button}>
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
        <GoogleSigninButton onPress={googleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
