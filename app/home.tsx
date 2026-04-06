import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";

export default function Home() {
  const [startLocation, setStartLocation] = useState<any>(null);
  const [endLocation, setEndLocation] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 26.9124,
    longitude: 75.7873,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  // ✅ FIX 2: Reusable function — called on mount & on 🎯 button press
  const fetchCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Enable location to use the app");
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setStartLocation({ description: "Current Location", location: coords });
      setMapRegion({ ...coords, latitudeDelta: 0.1, longitudeDelta: 0.1 });
    } catch (error) {
      Alert.alert(
        "Location Error",
        "Could not get current location. You can still enter it manually.",
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  // ✅ FIX 1: Normalize both { latitude, longitude } and { lat, lng } formats
  const getLatLng = (location: any) => {
    const lat = location?.latitude ?? location?.lat;
    const lng = location?.longitude ?? location?.lng;
    return { lat, lng };
  };

  // ✅ FIX 1: Use getLatLng() so distance works for both location sources
  const calculateDistance = () => {
    if (!startLocation?.location || !endLocation?.location) {
      Alert.alert("Error", "Please select both start and end locations");
      return;
    }

    const toRad = (value: number) => (value * Math.PI) / 180;

    const { lat: lat1, lng: lon1 } = getLatLng(startLocation.location);
    const { lat: lat2, lng: lon2 } = getLatLng(endLocation.location);

    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
      Alert.alert("Error", "Invalid coordinates. Please reselect locations.");
      return;
    }

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    setDistance(d);
  };

  const startCoords = startLocation?.location
    ? getLatLng(startLocation.location)
    : null;
  const endCoords = endLocation?.location
    ? getLatLng(endLocation.location)
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 Smash</Text>

      {/* Start Location */}
      <GooglePlacesAutocomplete
        placeholder="Enter Start Location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (!details?.geometry?.location) {
            Alert.alert(
              "Error",
              "Please select a location from the dropdown suggestions",
            );
            return;
          }
          setStartLocation({
            description: data.description,
            location: details.geometry.location, // { lat, lng }
          });
        }}
        query={{
          key: "AIzaSyDtlv4tFeVxD3NOrcOYJdCJgzvLyED4_g0",
          language: "en",
        }}
        styles={{
          container: { flex: 0, width: "100%", marginBottom: 10 },
          textInput: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
          },
        }}
      />

      {/* End Location */}
      <GooglePlacesAutocomplete
        placeholder="Enter End Location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (!details?.geometry?.location) {
            Alert.alert(
              "Error",
              "Please select a location from the dropdown suggestions",
            );
            return;
          }
          setEndLocation({
            description: data.description,
            location: details.geometry.location, // { lat, lng }
          });
        }}
        query={{
          key: "YOUR_GOOGLE_API_KEY",
          language: "en",
        }}
        styles={{
          container: { flex: 0, width: "100%", marginBottom: 10 },
          textInput: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
          },
        }}
      />

      {/* Calculate Distance Button */}
      <TouchableOpacity style={styles.button} onPress={calculateDistance}>
        <Text style={styles.buttonText}>Calculate Distance</Text>
      </TouchableOpacity>

      {/* Show distance */}
      {distance !== null && (
        <Text style={styles.distance}>Distance: {distance.toFixed(2)} km</Text>
      )}

      {/* ✅ FIX 2: Map wrapped in relative View for floating button */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} provider="google" region={mapRegion}>
          {/* ✅ FIX 1: Use normalized startCoords */}
          {startCoords?.lat != null && (
            <Marker
              coordinate={{
                latitude: startCoords.lat,
                longitude: startCoords.lng,
              }}
              title="Start"
              description={startLocation.description}
              pinColor="green"
            />
          )}
          {/* ✅ FIX 1: Use normalized endCoords */}
          {endCoords?.lat != null && (
            <Marker
              coordinate={{
                latitude: endCoords.lat,
                longitude: endCoords.lng,
              }}
              title="End"
              description={endLocation.description}
              pinColor="red"
            />
          )}
        </MapView>

        {/* ✅ FIX 2: Rapido-style floating current location button */}
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={fetchCurrentLocation}
          disabled={loadingLocation}
        >
          <Text style={styles.locationBtnIcon}>
            {loadingLocation ? "⏳" : "🎯"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

  // ✅ FIX 2: Wrapper needed for absolute positioning of the button
  mapContainer: {
    flex: 1,
    marginTop: 10,
    position: "relative",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width - 20,
  },

  // ✅ FIX 2: Floating button styles
  locationBtn: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  locationBtnIcon: {
    fontSize: 22,
  },

  button: {
    backgroundColor: "#c7642b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  distance: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
});
