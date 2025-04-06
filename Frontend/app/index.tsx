import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "../styles/homeStyles";
import { Text, View, StyleSheet, Button } from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AppContext } from "./_layout";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DistanceMap from "@/components/DistanceMap";

export default function Home() {
  const { userId, isAtEvent } = useContext(AppContext);

  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  // TODO Get the top class from the stack
  const handleCheckIn = () => {
    // TODO remove event from event list and increment days_attended on
  };

  if (!fontsLoaded) {
    return undefined;
  }
  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }

  // TODO remove set lat and long values
  return (
    <>
      <View style={homeStyles.bg}>
        <LinearGradient
          colors={["#0f9679", "#292929"]}
          start={[1, 0]}
          end={[0, 0]}
          locations={[0, 1]}
          style={{ flex: 1 }}
        >
          <View style={homeStyles.bg}>
            <View style={homeStyles.view}>
              <View style={homeStyles.box}>
                <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
                  Time till next class:{" "}
                </Text>
                <Text style={homeStyles.timeText}>00:00 </Text>
              </View>
            </View>

            <View style={homeStyles.view}>
              <View style={homeStyles.box}>
                <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
                  Time till next class:{" "}
                </Text>
                <Text style={homeStyles.timeText}>00:00 </Text>
              </View>
            </View>
            {isAtEvent && (
              <Button title="Check In" onPress={handleCheckIn}></Button>
            )}
          </View>
          <DistanceMap eventLat={10} eventLong={20}></DistanceMap>
          <BottomBar></BottomBar>
        </LinearGradient>
      </View>
    </>
  );
}
