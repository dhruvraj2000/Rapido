import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  return (
    <LinearGradient colors={["#FFD700", "#FFB347"]} style={styles.container}>
      <Text style={styles.title}>Smash... 🏍️</Text>

      <View style={styles.card}>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="location-sharp"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <TextInput placeholder="Enter Pickup Location" style={styles.input} />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#555"
            style={styles.icon}
          />
          <TextInput placeholder="Enter Drop Location" style={styles.input} />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Find Ride</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#000",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
