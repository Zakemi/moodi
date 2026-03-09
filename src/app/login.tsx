import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getAuth, signInAnonymously } from '@firebase/auth';

export const LoginPage = () => {
  const router = useRouter();

  const guestLogin = async () => {
    await signInAnonymously(getAuth());
    router.navigate('/');
  };

  return (
    <SafeAreaView>
      <Text>Login page</Text>
      <TouchableOpacity onPress={guestLogin}>
        <Text>Continue as Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginPage;
