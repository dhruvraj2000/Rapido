import { LinearGradient } from "expo-linear-gradient";
import { router, type Href } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  return (
    <LinearGradient colors={["#FFB347", "#FFCC33"]} style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>Smash Your Ride 🚀</Text>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login" as Href)}
      >
        <LinearGradient
          colors={["#FF8C00", "#FFD700"]}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Optional footer */}
      <Text style={styles.footerText}>Fast, Safe & Fun Rides!</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    backgroundColor: "#fff",
    borderRadius: 150,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  tagline: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 15,
    width: "70%",
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  footerText: {
    color: "#fff",
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    opacity: 0.9,
  },
});
