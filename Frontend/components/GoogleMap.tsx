import { useEffect, useState } from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";

export default function GoogleMap() {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    getUserLocation(); //call the location function
  }, []);

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log("User location:", location.coords);

    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  return (
    <MapView
      style={styles.mapView}
      provider={PROVIDER_DEFAULT}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
}

const styles = StyleSheet.create({
  mapView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 100,
    width: "100%",
    height: "50%",
  },
});
