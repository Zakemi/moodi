import {
  createElement,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

import { initializeApp, getApp, getApps } from '@react-native-firebase/app';

type AuthenticationContextValue = {
  isAuthInitializing: boolean;
  user: FirebaseAuthTypes.User | null;
  logout: () => Promise<void>;
};

const AuthenticationContext = createContext<AuthenticationContextValue | null>(
  null,
);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();

  const logout = async () => {
    await signOut(getAuth());
  };

  useEffect(() => {
    let unsubscribe: undefined | (() => void);

    const init = async () => {
      // TODO move into helper
      const apps = getApps();
      let app;
      if (!apps.length) {
        // TODO test if it works without this
        app = await initializeApp({
          apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
          projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
        });
      } else {
        app = getApp();
      }

      const auth = getAuth(app);
      unsubscribe = onAuthStateChanged(auth, (newUser) => {
        setUser(newUser);
        setInitializing(false);
        router.navigate('/');
      });
    };

    void init();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      isAuthInitializing: initializing,
      user,
      logout,
    }),
    [initializing, user],
  );

  return createElement(AuthenticationContext.Provider, { value }, children);
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider',
    );
  }

  return context;
};
