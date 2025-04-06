import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "../styles/signinStyles";
import { addScheduleStyles } from "../styles/addScheduleStyles";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addCourse, addGroup, getUsers } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import BottomBar from "@/components/BottomBar/BottomBar";
import CheckBox from "expo-checkbox";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import SelectionMap from "../components/SelectionMap";
import { format } from "date-fns";
import generateEvents from "../components/eventgenbutton";
import EventGenButton from "../components/eventgenbutton";

interface Course {
  id?: number;
  name: string;
  time: string;
  start_date: string;
  end_date: string;
  user_id: number;
  days: number[];
  days_attended: number;
  days_missed: number;
  latitude: number;
  longitude: number;
}

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [dayList, setDayList] = useState<number[]>([]);
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);
  const [courseLat, setCourseLat] = useState<number>(0);
  const [courseLong, setCourseLong] = useState<number>(0);
  const router = useRouter();
  const { user, userId } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { mutateAsync: addCourseMutation } = useMutation({
    mutationKey: ["SignInGetUsers"],
    mutationFn: (course: Course) => addCourse(course),
  });

  // const schema = yup.object().shape({
  //   name: yup.string().max(20).required("*Name is Required"),
  //   time: yup.string().required("*Time input is required"),
  //   days: yup.array().of(yup.number().max(7)).min(1).required(),
  //   start_date: yup.date().min(new Date()).required("*Start date is required"),
  //   end_date: yup.date().required("*End date is required"),
  // });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: any) => {
    let newCourse: Course = {
      name: courseName,
      time: format(time, "HH:mm:ss"),
      start_date: format(startDate, "yyyy-MM-dd"),
      end_date: format(endDate, "yyyy-MM-dd"),
      user_id: userId,
      days: dayList,
      days_attended: 0,
      days_missed: 0,
      latitude: courseLat,
      longitude: courseLong,
    };
    await addCourseMutation(newCourse);
    queryClient.invalidateQueries(["getCourseList"]);
    router.navigate("/schedule");
  };

  const handleName = (text: string) => {
    if (text) {
      setCourseName(text);
    }
  };

  const handleStartDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEditTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    console.log(selectedTime);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleClickCheck = (id: number) => {
    let day_list: number[] = dayList;
    if (day_list.includes(id)) {
      day_list.splice(day_list.indexOf(id), 1);
    } else {
      day_list.push(id);
    }

    setDayList([...day_list]);
  };

  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <>
      <ScrollView>
        <View style={signinStyles.bg}>
          <View style={signinStyles.logo}>
            <Text style={[signinStyles.logoText, { fontFamily: "Jersey10" }]}>
              Attendr
            </Text>
          </View>
          <View style={signinStyles.content}>
            <View style={addScheduleStyles.box}>
              <Text style={[signinStyles.header, { fontFamily: "Jersey10" }]}>
                Enter a New Course
              </Text>

              <Text>Name</Text>
              <Controller
                control={control}
                name="start_date"
                render={({ field: { onChange, value } }) => (
                  <TextInput value={courseName} onChangeText={handleName} />
                )}
              />

              <Text>Start Date</Text>
              <Controller
                control={control}
                name="start_date"
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    onChange={handleStartDate}
                  />
                )}
              />

              <Text>End Date</Text>
              <Controller
                control={control}
                name="end_date"
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    onChange={handleEndDate}
                  />
                )}
              />

              <Text>Time</Text>
              <Controller
                control={control}
                name="time"
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    onChange={handleEditTime}
                  />
                )}
              />

              <Text>Recurrence Schedule:</Text>
              <Controller
                control={control}
                name="days"
                render={({ field: { onChange, value } }) => (
                  <>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Monday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(1)}
                          value={dayList.includes(1)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Tuesday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(2)}
                          value={dayList.includes(2)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Wednesday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(3)}
                          value={dayList.includes(3)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Thursday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(4)}
                          value={dayList.includes(4)}
                        />
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Friday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(5)}
                          value={dayList.includes(5)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Saturday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(6)}
                          value={dayList.includes(6)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={[addScheduleStyles.checkText]}>
                          Sunday
                        </Text>
                        <CheckBox
                          onValueChange={() => handleClickCheck(7)}
                          value={dayList.includes(7)}
                        />
                      </View>
                    </View>
                  </>
                )}
              />

              <Button
                title="Location Picker"
                onPress={() => setShowLocationPicker(!showLocationPicker)}
              ></Button>
              {showLocationPicker && (
                <SelectionMap
                  onFindLat={setCourseLat}
                  onFindLong={setCourseLong}
                ></SelectionMap>
              )}

              <TouchableOpacity
                onPress={() => {
                  handleSubmit(onSubmit)();
                }}
                style={{ marginTop: 20 }}
              >
                <ImageBackground
                  source={require("../assets/images/submitButton.png")} // replace with your actual path
                  style={{
                    width: 200,
                    height: 60,
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
                      paddingBottom: 10,
                    }}
                  >
                    Submit
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
