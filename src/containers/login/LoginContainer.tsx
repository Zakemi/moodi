import { LoginScreen } from '@/src/screens/login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const LoginContainer = () => {
  const googleLogin = async () => {
    const result = await GoogleSignin.signIn();

    if (result.type === 'success' && result.data.idToken) {
      await signInWithCredential(
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
  return <LoginScreen onGoogleLogin={googleLogin} onGuestLogin={guestLogin} />;
};
