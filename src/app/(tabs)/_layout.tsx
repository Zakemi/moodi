import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SECONDARY_VARIANT_COLOR,
} from '@/src/constants/style';
import { useDiary } from '@/src/hooks/useDiary';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { user } from '@/src/store/user';
import { Text, TouchableOpacity } from 'react-native';
import { useAuthentication } from '@/src/hooks/useAuthentication';

export default function TabLayout() {
  const [isReady, setIsReady] = useState(false);
  const { loadDiary } = useDiary();
  const { user: currentUser, logout } = useAuthentication();

  useEffect(() => {
    async function initializeApp() {
      try {
        await loadDiary();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    initializeApp();
  }, []);

  if (!isReady || !currentUser) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: BACKGROUND_COLOR,
          shadowColor: BACKGROUND_COLOR,
          borderColor: BACKGROUND_COLOR,
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: SECONDARY_VARIANT_COLOR,
        headerStyle: {
          backgroundColor: BACKGROUND_COLOR,
          shadowColor: BACKGROUND_COLOR,
          borderColor: BACKGROUND_COLOR,
        },
        headerTintColor: PRIMARY_COLOR,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'MOODI',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="book" color={color} />
          ),
          tabBarLabel: 'Diary',
          headerRight: (props) => (
            <>
              <Text>
                {currentUser.isAnonymous ? 'Guest' : currentUser.displayName}
              </Text>
              <Ionicons
                name="person-circle-outline"
                size={32}
                color={PRIMARY_COLOR}
                style={{ marginLeft: 5 }}
              />
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  marginRight: 25,
                  padding: 10,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                onPress={() => logout()}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'MOODI',
          tabBarLabel: 'Stats',
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
