import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "../styles/signinStyles";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addGroup, getUsers } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import BottomBar from "@/components/BottomBar/BottomBar";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Group {
  id?: number;
  name: string;
  members: number[];
  admin: string;
}

interface FormData {
  name: string;
}

export default function AddCourse() {
  const [dayList, setDayList] = useState<number[]>([]);
  const router = useRouter();
  const { user, userId } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { mutateAsync: addGroupMutation } = useMutation({
    mutationKey: ["SignInGetUsers"],
    mutationFn: (group: Group) => addGroup(group),
  });

  const schema = yup.object().shape({
    name: yup.string().max(20).required("*Name is Required"),
    time: yup.string().required("*Time input is required"),
    days: yup.array().of(yup.number().max(7)).min(1),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    let newGroup: Group = {
      name: formData.name,
      members: [userId],
      admin: user,
    };
    await addGroupMutation(newGroup);
    queryClient.invalidateQueries(["groupList"]);
    router.navigate("/groups");
  };

  const handleEditTime = (time: string) => {
    // do something
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
      <View style={signinStyles.bg}>
        <View style={signinStyles.logo}>
          <Text style={[signinStyles.logoText, { fontFamily: "Jersey10" }]}>
            Attendr
          </Text>
        </View>
        <View style={signinStyles.content}>
          <View style={signinStyles.box}>
            <Text style={[signinStyles.header, { fontFamily: "Jersey10" }]}>
              Enter a New Course
            </Text>

            <Text style={signinStyles.text}>Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={signinStyles.border}
                  placeholderTextColor="gray"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text style={[signinStyles.text, { color: "red" }]}>
                {errors.name.message}
              </Text>
            )}
            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  onChange={() => handleEditTime}
                />
              )}
            />
            {errors.time && (
              <Text style={[signinStyles.text, { color: "red" }]}>
                {errors.time.message}
              </Text>
            )}
            <Controller
              control={control}
              name="days"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text>Monday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(1)}
                    value={dayList.includes(1)}
                  />
                  <Text>Tuesday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(2)}
                    value={dayList.includes(2)}
                  />
                  <Text>Wednesday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(3)}
                    value={dayList.includes(3)}
                  />
                  <Text>Thursday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(4)}
                    value={dayList.includes(4)}
                  />
                  <Text>Friday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(5)}
                    value={dayList.includes(5)}
                  />
                  <Text>Saturday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(6)}
                    value={dayList.includes(6)}
                  />
                  <Text>Sunday</Text>
                  <CheckBox
                    onValueChange={() => handleClickCheck(7)}
                    value={dayList.includes(7)}
                  />
                </>
              )}
            />

            {errors.time && (
              <Text style={[signinStyles.text, { color: "red" }]}>
                {errors.time.message}
              </Text>
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
    </>
  );
}
