import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Splash */}
      <Stack.Screen name="(tabs)" /> {/* Your Home + tabs */}
    </Stack>
  );
}
