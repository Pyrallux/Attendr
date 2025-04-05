import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "./homeStyles";
import { Text, View, StyleSheet} from "react-native";
import { useFonts } from "expo-font";
import * as Location from 'expo-location';
import { useEffect} from "react";
import React from 'react'
import MapView from 'react-native-maps'

export default function Home() {
  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  useEffect(() => {
    getUserLocation(); //call the location function
  }, []);

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }
  
    const location = await Location.getCurrentPositionAsync({});
    console.log('User location:', location.coords);
    return location.coords; // contains latitude and longitude
  };

  // const GoogleMap = () => {
  //   return (
  //     <MapView
  //       style={styles.mapView}/>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   mapView: {
  //     flex: 1
  //   }
  // })

  return (
    <>
      <View style={homeStyles.bg}>
        <View style={homeStyles.bg}>

          <View style={homeStyles.view}>
            <View style={homeStyles.box}>
              <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
                Time till next class:{" "}
              </Text>
              <Text style={homeStyles.timeText}>00:00 </Text>
            </View>
          </View>
          {/* <View style={homeStyles.container}></View> */}
        </View>
        <BottomBar />
      </View>
    </>
  );
}
