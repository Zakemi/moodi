import { useRouter } from 'expo-router';
import { useAuthentication } from '@/src/hooks/useAuthentication';

export const App = () => {
  const router = useRouter();
  const { isAuthInitializing, user } = useAuthentication();

  if (isAuthInitializing) {
    return null;
  }

  if (user === null) {
    router.navigate('/login');
  } else {
    router.navigate('/(tabs)');
  }
  return null;
};

export default App;
