import { user } from '@/src/store/user';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { useAuthentication } from '@/src/hooks/useAuthentication';

export const App = () => {
  const currentUser = useSelector(user);
  const router = useRouter();
  const { isAuthInitializing } = useAuthentication();

  console.log('currentUser', currentUser);

  if (isAuthInitializing) {
    return null;
  }

  if (currentUser === null) {
    router.navigate('/login');
  } else {
    router.navigate('/(tabs)');
  }
  return null;
};

export default App;
