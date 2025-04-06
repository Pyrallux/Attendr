import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "../styles/homeStyles";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AppContext } from "./_layout";
import { Redirect } from "expo-router";
import GoogleMap from "@/components/GoogleMap";

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
      <GoogleMap></GoogleMap>
      <View style={homeStyles.view}>
        <View style={homeStyles.box}>
          <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
            Time till next class:{" "}
          </Text>
          <Text style={homeStyles.timeText}>00:00 </Text>
        </View>
      </View>

      <BottomBar></BottomBar>
    </>
  );
}
