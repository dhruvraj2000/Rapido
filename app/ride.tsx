import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function RideScreen() {
  const { pickup, drop } = useLocalSearchParams(); // Get data from previous screen

  const [distance, setDistance] = useState("Calculating...");
  const [duration, setDuration] = useState("...");

  // Fake coordinates for demo (you can improve later with real geocoding)
  const pickupCoords = { latitude: 26.9124, longitude: 75.7873 }; // Example: Udaipur
  const dropCoords = { latitude: 26.89, longitude: 75.81 };

  const routeCoordinates = [
    pickupCoords,
    { latitude: 26.9, longitude: 75.795 },
    dropCoords,
  ];

  // Fake calculation
  useEffect(() => {
    setTimeout(() => {
      setDistance("4.8 km");
      setDuration("12 min");
    }, 800);
  }, []);

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (pickupCoords.latitude + dropCoords.latitude) / 2,
          longitude: (pickupCoords.longitude + dropCoords.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Pickup Marker */}
        <Marker coordinate={pickupCoords} title="Pickup" pinColor="green" />

        {/* Drop Marker */}
        <Marker coordinate={dropCoords} title="Drop" pinColor="red" />

        {/* Route Line */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#000"
          strokeWidth={5}
        />
      </MapView>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Ride Details</Text>

        <View style={styles.row}>
          <Ionicons name="location" size={22} color="green" />
          <Text style={styles.text}>{pickup || "Pickup Location"}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="location" size={22} color="red" />
          <Text style={styles.text}>{drop || "Drop Location"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.info}>
            Distance: <Text style={styles.bold}>{distance}</Text>
          </Text>
          <Text style={styles.info}>
            Time: <Text style={styles.bold}>{duration}</Text>
          </Text>
        </View>

        <Text style={styles.fare}>₹ 85 - 110</Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            Alert.alert("Booking Confirmed!", "Your ride is on the way 🚀")
          }
        >
          <Text style={styles.confirmText}>Confirm Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  text: { marginLeft: 10, fontSize: 16, flex: 1 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  info: { fontSize: 16 },
  bold: { fontWeight: "bold" },
  fare: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: { color: "white", fontWeight: "bold", fontSize: 18 },
  backButton: { marginTop: 15, alignItems: "center" },
  backText: { color: "#666", fontSize: 16 },
});
