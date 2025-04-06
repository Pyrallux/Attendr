import { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet } from "react-native";
import { AppContext } from "@/app/_layout";

export default function GoogleMap() {
  const { isAtEvent } = useContext(AppContext);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [markerPlaced, setMarkerPlaced] = useState<boolean>(false);
  const [markerLat, setMarkerLat] = useState<number>(-1);
  const [markerLong, setMarkerLong] = useState<number>(-1);

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

  const handleMarkerPress = (latitude: number, longitude: number) => {
    setMarkerPlaced(true);
    setMarkerLong(longitude);
    setMarkerLat(latitude);

    console.log(latitude, longitude);
  };

  return (
    <MapView
      style={styles.mapView}
      provider={PROVIDER_DEFAULT}
      showsUserLocation={true}
      onPress={(location) =>
        handleMarkerPress(
          location.nativeEvent.coordinate.latitude,
          location.nativeEvent.coordinate.longitude
        )
      }
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {markerPlaced && (
        <Marker coordinate={{ latitude: markerLat, longitude: markerLong }} />
      )}
    </MapView>
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
