import { BACKGROUND_COLOR, PRIMARY_COLOR } from '@/src/constants/style';
import { store } from '@/src/store';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Provider } from 'react-redux';
import {
  AuthenticationProvider,
  useAuthentication,
} from '@/src/hooks/useAuthentication';
import { SplashScreenController } from '@/src/containers/SplashScreenController';

export default function RootLayout() {
  return (
    <AuthenticationProvider>
      <RootNavigator />
    </AuthenticationProvider>
  );
}

// Protected routes are not working as documentation described. The current setup was the only way I found to make
// the routes available for navigation. More info: https://github.com/expo/expo/issues/37305

function RootNavigator() {
  const { isAuthInitializing, user } = useAuthentication();
  const isLoggedIn = user !== null;

  return (
    <SQLiteProvider databaseName="test.db">
      <Provider store={store}>
        <SplashScreenController />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: BACKGROUND_COLOR,
            },
            headerShadowVisible: false,
            headerTintColor: PRIMARY_COLOR,
          }}
        >
          {/* Had to make these parents public, otherwise navigation did not find private ones */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ headerShown: false }} />

          <Stack.Protected guard={!isAuthInitializing && isLoggedIn}>
            {/* '(tabs)' name is not working, had to specify first child */}
            <Stack.Screen
              name="(tabs)/diary"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!isAuthInitializing && isLoggedIn}>
            {/* 'modal' name were not working, had to add index */}
            <Stack.Screen
              name="modal/index"
              options={{
                presentation: 'modal',
                title: 'Dear diary, ...',
              }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!isAuthInitializing && !isLoggedIn}>
            {/* Same here, had to add index */}
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </SQLiteProvider>
  );
}
