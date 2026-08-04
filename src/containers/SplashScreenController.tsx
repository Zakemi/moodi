import { SplashScreen } from 'expo-router';
import { useAuthentication } from '@/src/hooks/useAuthentication';
import { useSelector } from 'react-redux';
import { initialized } from '@/src/store/diary';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isAuthInitializing } = useAuthentication();
  const isDiaryInitialized = useSelector(initialized);

  const isAppInitialized = !isAuthInitializing && isDiaryInitialized;

  useEffect(() => {
    if (!isAppInitialized) {
      return;
    }

    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
    SplashScreen.hide();
  }, [isAppInitialized]);

  return null;
}
