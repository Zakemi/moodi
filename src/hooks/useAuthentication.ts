import { useEffect, useState } from 'react';
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';

import { initializeApp, getApp, getApps } from '@react-native-firebase/app';
import { useRouter } from 'expo-router';

export const useAuthentication = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();

  // Handle user state changes
  function handleAuthStateChanged(newUser: FirebaseAuthTypes.User | null) {
    setUser(newUser);
    // TODO fix error: Maximum call stack size exceeded
    // dispatch(setStoreUser(newUser));
    if (initializing) setInitializing(false);
  }

  async function logout() {
    await signOut(getAuth());
    router.navigate('/');
  }

  useEffect(() => {
    async function init() {
      const apps = getApps();
      let app;
      if (!apps.length) {
        // TODO move into env var
        app = await initializeApp({});
      } else {
        app = getApp();
      }

      const auth = getAuth(app);
      onAuthStateChanged(auth, handleAuthStateChanged);
    }

    init();
  }, []);

  return {
    isAuthInitializing: initializing,
    user,
    logout,
  };
};
