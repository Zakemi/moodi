import { useRouter } from 'expo-router';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LoginScreen.styles';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export const LoginScreen = () => {
  const router = useRouter();

  const googleLogin = async () => {
    // todo Call it in Splash screen instead
    GoogleSignin.configure({
      webClientId: 'placeholder', // TODO move into env var
    });
    const result = await GoogleSignin.signIn();

    if (result.type === 'success' && result.data.idToken) {
      signInWithCredential(
        getAuth(),
        GoogleAuthProvider.credential(result.data.idToken),
      );
    } else {
      Alert.alert(
        'Google login error',
        'Login failed due to canceled flow or invalid credentials. Please try again',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const guestLogin = async () => {
    try {
      await signInAnonymously(getAuth());
      router.navigate('/');
    } catch (error) {
      console.error(error);
      Alert.alert('Guest login error', 'Login failed, please try again.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Login with a user</Text>
        <GoogleSigninButton onPress={googleLogin} style={styles.fullwidth} />
        <TouchableOpacity onPress={guestLogin} style={styles.button}>
          <Text style={styles.buttonText}>or continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
