import { getCourses } from "@/api/api";
import BottomBar from "@/components/BottomBar/BottomBar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

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
      <ScrollView style={{ paddingTop: 100 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {courseData ? (
            courseListNames.map((s: string, id) => (
              <View key={id}>
                <Button title={s} onPress={() => handleClickCourse(id)} />
              </View>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
          <Button title="+ Add New Course" onPress={() => handleAddCourse()} />
        </View>
      </ScrollView>
      <BottomBar />
    </>
  );
}
