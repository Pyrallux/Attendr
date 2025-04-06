import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "../styles/homeStyles";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AppContext } from "./_layout";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DistanceMap from "@/components/DistanceMap";
import { getCourses, getEvents } from "@/api/api";
import { useMutation } from "@tanstack/react-query";

interface Event {
  id?: number;
  name: string;
  datetime: string;
  user_id: number;
}

export default function Home() {
  const { userId, isAtEvent } = useContext(AppContext);
  const [latitude, setLatitude] = useState(-1);
  const [longitude, setLongitude] = useState(-1);
  const [sortedEvents, setSortedEvents] = useState<Event[]>([]);

  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  const { mutateAsync: getCoursesMutation } = useMutation({
    mutationKey: ["getCourseList"],
    mutationFn: () => getCourses(),
    onSuccess: (data) => {
      let course = data.filter((c: any) => sortedEvents[0].name === c.name);
      setLatitude(course[0].latitude);
      setLongitude(course[0].longitude);
    },
  });

  const { mutateAsync: getEventsMutation } = useMutation({
    mutationKey: ["getEventList"],
    mutationFn: () => getEvents(),
    onSuccess: (data) => {
      let user_events: any = data.filter((e: any) => e.user_id === userId);
      let sorted_events: any = user_events.sort((a: any, b: any) => {
        if (new Date(a.datetime) < new Date(b.datetime)) {
          return -1;
        }
        if (new Date(a.datetime) > new Date(b.datetime)) {
          return 1;
        }
        setSortedEvents([...sorted_events]);
        getCoursesMutation();
      });
    },
  });

  useEffect(() => {
    getEventsMutation();
  }, []);

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

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setTimeout(() => setIsPressed(false), 75);
  };
  // TODO remove set lat and long values
  return (
    <>
      <Button title="Check In"></Button>
      <View style={homeStyles.bg}>
        <LinearGradient
          colors={["#0f9679", "#292929"]}
          start={[1, 0]}
          end={[0, 0]}
          locations={[0, 1]}
          style={{ flex: 1 }}
        >
          <View style={homeStyles.bg}>
            {isAtEvent && (
              <TouchableOpacity
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => {
                  setIsPressed(false);
                }}
                onPress={() => {
                  handleCheckIn();
                }}
                style={{ marginTop: 20 }}
              >
                <ImageBackground
                  source={
                    isPressed
                      ? require("./../assets/images/submitButton2.png")
                      : require("./../assets/images/submitButton.png")
                  }
                  style={{
                    width: 200,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  imageStyle={{ borderRadius: 10 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: "Jersey10",
                      transform: [{ translateY: isPressed ? 10 : -5 }],
                    }}
                  >
                    Submit
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>
          <DistanceMap eventLat={latitude} eventLong={longitude}></DistanceMap>
          <BottomBar></BottomBar>
        </LinearGradient>
      </View>
    </>
  );
}
