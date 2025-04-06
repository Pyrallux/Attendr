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
  date_time: string;
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
      while (currentDate < userCourses[i].end_date) {
        let day = currentDate.getDay();
        if (day === 0) {
          day = 7;
        }
        // Check if day should not be included
        if (!userCourses[i].days.includes(day)) {
          continue;
        }
        // Add an event on the day
        addEventMutation({
          name: courseData[i].name,
          date_time: format(currentDate, "yyyy-MM-dd HH:mm:ss.SSS"),
          user_id: userId,
        });
      }
    }
    router.navigate("/schedule");
  };

  return (
    <>
      <Button title="Submit" onPress={() => generateEvents()}></Button>
    </>
  );
}
