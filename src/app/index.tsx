import { Href, Redirect } from 'expo-router';
import { useAuthentication } from '@/src/hooks/useAuthentication';

const authenticatedHref = '/(tabs)/diary' as Href;

export const App = () => {
  const router = useRouter();
  const { isAuthInitializing, user } = useAuthentication();

  if (isAuthInitializing) {
    return null;
  }

  return <Redirect href={user ? authenticatedHref : '/login'} />;
};

export default App;
