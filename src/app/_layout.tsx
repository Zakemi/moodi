import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8e0c8',
          },
          headerShadowVisible: false,
          headerTintColor: '#543022',
        }}
      >
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
  );
}
