import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide top header if you don't want it
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="index" // This is your Home screen
        options={{
          title: "Smash", // ← Change this (this shows on tab + header)
          tabBarLabel: "Smash", // ← This controls the bottom tab text
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Add more tabs here later if needed, e.g. Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
