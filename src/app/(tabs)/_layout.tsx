import { useDiary } from '@/src/hooks/useDiary';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const [isReady, setIsReady] = useState(false);
  const { loadDiary } = useDiary();

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

  if (!isReady) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f8e0c8',
          shadowColor: '#f8e0c8',
          borderColor: '#f8e0c8',
        },
        tabBarActiveTintColor: '#543022',
        tabBarInactiveTintColor: '#B58877',
        headerStyle: {
          backgroundColor: '#f8e0c8',
          shadowColor: '#f8e0c8',
          borderColor: '#f8e0c8',
        },
        headerTintColor: '#543022',
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
            <Ionicons
              name="person-circle-outline"
              size={32}
              color="#543022"
              style={{ marginRight: 25 }}
            />
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
