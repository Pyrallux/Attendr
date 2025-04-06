import { addEvent, deleteEvent, getCourses, getEvents } from "@/api/api";
import BottomBar from "@/components/BottomBar/BottomBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { scheduleStyles } from "../styles/scheduleStyles";
import { AppContext } from "../app/_layout";
import { format } from "date-fns";

interface Course {
  id: number;
  name: string;
  time: string;
  start_date: Date;
  end_date: Date;
  user_id: number;
  days: number[];
  days_attended: number;
  days_missed: number;
  latitude: number;
  longitude: number;
}

interface Event {
  id?: number;
  name: string;
  datetime: string;
  user_id: number;
}

export default function EventGenButton() {
  const { userId } = useContext(AppContext);
  const router = useRouter();
  const [courseListNames, setCourseListNames] = useState<string[]>([]);
  const [courseListIds, setCourseListIds] = useState<string[]>([]);

  const { mutateAsync: getCoursesMutation } = useMutation({
    mutationKey: ["getCourseList"],
    mutationFn: () => getCourses(),
  });

  const { mutateAsync: getEventsMutation } = useMutation({
    mutationKey: ["getEventList"],
    mutationFn: () => getEvents(),
  });
  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: (id: number) => deleteEvent(id),
  });
  const { mutate: addEventMutation } = useMutation({
    mutationFn: (e: Event) => addEvent(e),
  });

  const generateEvents = async () => {
    // Delete Old Events
    let eventData = await getEventsMutation();
    let userEvents = eventData.filter((e: Event) => e.user_id === userId);
    for (let i = 0; i < userEvents.length; i++) {
      deleteEventMutation(userEvents[i].id);
    }

    let courseData = await getCoursesMutation();
    let userCourses = courseData.filter((c: Course) => c.user_id === userId);
    for (let i = 0; i < userCourses.length; i++) {
      // Generate all events between start and end date
      let currentDate = new Date(userCourses[i].start_date);
      console.log(currentDate, userCourses[i].end_date);
      while (currentDate < new Date(userCourses[i].end_date)) {
        let day = currentDate.getDay();
        if (day === 0) {
          day = 7;
        }
        console.log(userCourses[i].days.includes(day));
        // Check if day should not be included
        if (!userCourses[i].days.includes(day)) {
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }
        currentDate.setDate(currentDate.getDate() + 1);
        // Add an event on the day
        addEventMutation({
          name: courseData[i].name,
          datetime: format(currentDate, "yyyy-MM-dd HH:mm:ss.SSS"),
          user_id: userId,
        });
      }
    }
    router.navigate("/schedule");
  };

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setTimeout(() => setIsPressed(false), 75);
  };

  return (
    <>
      <TouchableOpacity
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => {
          setIsPressed(false);
        }}
        onPress={() => {
          generateEvents();
          handlePress();
          setIsPressed(true);
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
            Generate Events
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}
