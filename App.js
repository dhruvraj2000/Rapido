import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={null} // Use default provider (MapLibre / OSM)
        initialRegion={{
          latitude: 26.9124, // Udaipur latitude
          longitude: 75.7873, // Udaipur longitude
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 26.9124, longitude: 75.7873 }}
          title="You are here"
          description="Udaipur"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
