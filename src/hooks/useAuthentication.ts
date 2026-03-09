import { setUser } from '@/src/store/user';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { initializeApp } from '@react-native-firebase/app';
import { getApp, getApps } from '@firebase/app';

export const useAuthentication = () => {
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
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
      onAuthStateChanged(getAuth(app), handleAuthStateChanged);
    }
    init();
  }, []);

  return {
    isAuthInitializing: initializing,
  };
};
