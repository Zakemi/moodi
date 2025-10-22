import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Diary',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Statistics',
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="bar-chart" color={color} />,
                }}
            />
        </Tabs>
    )
}