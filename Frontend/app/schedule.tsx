import { getCourses } from "@/api/api";
import BottomBar from "@/components/BottomBar/BottomBar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { scheduleStyles } from "../styles/scheduleStyles";

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

export default function Schedule() {
  const router = useRouter();
  const [courseListNames, setCourseListNames] = useState<string[]>([]);
  const [courseListIds, setCourseListIds] = useState<string[]>([]);

  const { data: courseData } = useQuery({
    queryKey: ["getCourseList"],
    queryFn: () => getCourses(),
  });

  useEffect(() => {
    if (courseData) {
      setCourseListNames([...courseData.map((c: Course) => c.name)]);
      setCourseListIds([...courseData.map((c: Course) => c.id)]);
    }
  }, [courseData]);

  const handleClickCourse = (id: number) => {
    // TODO got to edit course page
  };

  const handleAddCourse = () => {
    // TODO got to add course page
    router.navigate("/addcourse");
  };

  return (
    <>
      <View style={scheduleStyles.bg}>
        <View style={scheduleStyles.bg}>
          <ScrollView>
            <View
              style={{
                marginTop: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {courseData ? (
                courseListNames.map((s: string, id) => (
                  <View key={id}>
                    <TouchableOpacity
                      onPress={() => {
                        handleClickCourse(id);
                      }}
                    >
                      <ImageBackground
                        source={require("../assets/images/groupBG.png")} // replace with your actual path
                        style={{
                          width: 200,
                          height: 80,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        imageStyle={{ borderRadius: 10 }} // optional rounded corners
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 20,
                            fontFamily: "Jersey10",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {s}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={scheduleStyles.timeText}>Loading...</Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  handleAddCourse();
                }}
              >
                <ImageBackground
                  source={require("../assets/images/groupsBorderAdd.png")} // replace with your actual path
                  style={{
                    width: 200,
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  imageStyle={{ borderRadius: 10 }} // optional rounded corners
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: "Jersey10",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 35,
                    }}
                  >
                    Add New Class
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <BottomBar></BottomBar>
      </View>
    </>
  );
}
