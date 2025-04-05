import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "./signinStyles";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addGroup,
  deleteGroup,
  getGroupDetail,
  getUsers,
  updateGroup,
} from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

interface Group {
  id: number;
  name: string;
  members: number[];
  admin: string;
}

interface FormData {
  name: string;
}

export default function EditGroup() {
  const router = useRouter();
  const { activeGroupId } = useContext(AppContext);
  const queryClient = useQueryClient();

  const { mutateAsync: getGroupDetailMutation, data: groupData } = useMutation({
    mutationKey: ["SignInGetUsers"],
    mutationFn: (id: number) => getGroupDetail(id),
    onSuccess: (data: Group) => {
      setValue("name", data.name);
    },
  });

  useEffect(() => {
    getGroupDetailMutation(activeGroupId);
  }, []);

  const { mutateAsync: updateGroupMutation } = useMutation({
    mutationFn: (group: Group) => updateGroup(group),
  });

  const { mutateAsync: deleteGroupMutation } = useMutation({
    mutationFn: (id: number) => deleteGroup(id),
  });

  const schema = yup.object().shape({
    name: yup.string().max(20).required("*Name is Required"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormData) => {
    if (groupData) {
      groupData.name = formData.name;
      await updateGroupMutation(groupData);
      queryClient.invalidateQueries(["groupList"]);
      router.navigate("/groups");
    }
  };

  const handleDeleteGroup = async () => {
    await deleteGroupMutation(activeGroupId);
    queryClient.invalidateQueries(["groupList"]);
    router.navigate("/groups");
  };

  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
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
              Edit Group
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
            <TouchableOpacity
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
              style={{ marginTop: 20 }}
            >
              <ImageBackground
                source={require("./../assets/images/submitButton.png")} // replace with your actual path
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
                  Save
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Button title="Delete Group" onPress={handleDeleteGroup} />
          </View>
        </View>
      </View>
    </>
  );
}
