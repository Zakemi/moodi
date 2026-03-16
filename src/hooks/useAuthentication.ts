// import { setUser } from '@/src/store/user';
import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';

import { initializeApp, getApp, getApps } from '@react-native-firebase/app';
import { useRouter } from 'expo-router';

export const useAuthentication = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Handle user state changes
  function handleAuthStateChanged(newUser) {
    console.log('GOT USER:', newUser);
    setUser(newUser);
    if (initializing) setInitializing(false);
  }

  async function logout() {
    await signOut(getAuth());
    router.navigate('/');
    setUser(null);
  }

  useEffect(() => {
    async function init() {
      const apps = getApps();
      console.log(apps);
      let app;
      if (!apps.length) {
        try {
          // Firebase Auth required to call this, config files does not apply with Auth
          // [Error: Uncaught (in promise, id: 0) FirebaseError: Firebase: No Firebase App '[DEFAULT]' has been created - call initializeApp() first (app/no-app).]

          // Now it keeps throwing [Error: Firebase App named '[DEFAULT]' already exists], while
          // getApp throws the 'No Firebase App '[DEFAULT]' has been created' error
          app = await initializeApp({
            // config here...
          });
        } catch (error) {
          console.error(error);
          app = getApp();
        }
      } else {
        app = getApp();
      }
      console.log(app);
      const auth = getAuth(app);
      console.log(auth);
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
