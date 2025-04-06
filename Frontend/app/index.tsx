import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "../styles/homeStyles";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AppContext } from "./_layout";
import { Redirect } from "expo-router";
import GoogleMap from "@/components/GoogleMap";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const { userId } = useContext(AppContext);

  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={homeStyles.bg}>
        <View style={homeStyles.bg}>
          <LinearGradient
            colors={["#0f9679", "#292929"]}
            start={[1, 0]}
            end={[0, 0]}
            locations={[0, 1]}
            style={{ flex: 1 }}
          >
            <View style={homeStyles.view}>
              <View style={homeStyles.box}>
                <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
                  Time till next class:{" "}
                </Text>
                <Text style={homeStyles.timeText}>00:00 </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        <GoogleMap></GoogleMap>
        <BottomBar></BottomBar>
      </View>
    </>
  );
}
