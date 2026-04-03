import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Home from "./Home"; // Your main screen

export default function SplashScreen() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHome(true), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (showHome) return <Home />;

  return (
    <View style={styles.container}>
      <Image source={require("./assets/images/icon.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
  },
  logo: { width: 200, height: 200, resizeMode: "contain" },
});
