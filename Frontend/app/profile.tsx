import BottomBar from "@/components/BottomBar/BottomBar";
import { profileStyles } from "../styles/profileStyles";
import { Text, View, Image, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { useMutation } from "@tanstack/react-query";
import { getUserDetail } from "@/api/api";
import { Link, Redirect } from "expo-router";

export default function Profile() {
  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });
  const { user, userId } = useContext(AppContext);
  const [firstName, setFirstName] = useState<string>("Loading...");

  const { mutateAsync: getUserDetailMutation } = useMutation({
    mutationKey: ["SignInGetUserDetail"],
    mutationFn: (id: number) => getUserDetail(id),
    onSuccess: (data) => {
      setFirstName(data.first_name);
    },
  });

  useEffect(() => {
    getUserDetailMutation(userId);
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={profileStyles.flex}>
        <View style={profileStyles.bg}>
          <View style={profileStyles.container}>
            <View style={profileStyles.content}>
              <Image
                source={require("../assets/images/placeHolderIcon.png")}
              ></Image>
              <Text style={profileStyles.nameText}>{firstName}</Text>
              <Text style={profileStyles.usernameText}>@{user}</Text>
            </View>
            <View style={[profileStyles.view, { paddingTop: 400 }]}>
              <View style={profileStyles.box}>
                <Link href="/schedule">Setup Schedule</Link>
              </View>
            </View>
          </View>
        </View>
      </View>
      <BottomBar></BottomBar>
    </>
  );
}
