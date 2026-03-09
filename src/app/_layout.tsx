import { BACKGROUND_COLOR, PRIMARY_COLOR } from '@/src/constants/style';
import { store } from '@/src/store';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="test.db">
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: BACKGROUND_COLOR,
            },
            headerShadowVisible: false,
            headerTintColor: PRIMARY_COLOR,
          }}
        >
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              title: 'Dear diary, ...',
            }}
          />
        </Stack>
      </Provider>
    </SQLiteProvider>
  );
}
