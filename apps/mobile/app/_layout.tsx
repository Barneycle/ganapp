import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import './global.css';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#f9fafb", // bg-gray-50
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb", // border-gray-200
        },
        tabBarActiveTintColor: "#2563eb", // text-blue-600
        tabBarInactiveTintColor: "#9ca3af", // text-gray-400
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />



    </Tabs>
  );
}
