import BottomBar from "@/components/BottomBar/BottomBar";
import { profileStyles } from "../styles/profileStyles";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { useMutation } from "@tanstack/react-query";
import { getUserDetail } from "@/api/api";
import { Link, Redirect } from "expo-router";
import { useRouter } from "expo-router";

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

  const router = useRouter();

  return (
    <>
      <View style={[profileStyles.bg, { flex: 1, height: " 100%" }]}>
        <View style={[profileStyles.bg, { flex: 1, height: " 100%" }]}>
          <View
            style={[
              profileStyles.box,
              {
                height: 200,
                gap: 0,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Image
              style={{ marginTop: 225 }}
              source={require("../assets/images/placeHolderIcon.png")}
            ></Image>
            <Text style={profileStyles.nameText}>{firstName}</Text>
            <Text style={profileStyles.usernameText}>@{user}</Text>
          </View>

          <View
            style={[
              {
                marginTop: 100,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Link href="/schedule" asChild>
              <TouchableOpacity
                onPress={() => {
                  router.push("/schedule");
                }}
                style={{ marginTop: 15, marginRight: 15 }}
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
                    Setup Schedule
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <BottomBar></BottomBar>
      </View>
    </>
  );
}

{
  /* <View style={[profileStyles.bg, { flex: 1, height: " 100%" }]}>
<View style={[profileStyles.view, { paddingTop: 423 }]}>
  <View style={profileStyles.box}>
    <Image
      source={require("../assets/images/placeHolderIcon.png")}
    ></Image>
    <Text style={profileStyles.nameText}>{firstName}</Text>
    <Text style={profileStyles.usernameText}></Text>
  </View>
  <View style={{ paddingTop: 100 }}>
    <View style={[profileStyles.box, { height: 200 }]}>
      <Link href="/schedule">Setup Schedule</Link>
    </View>
  </View>
</View>
</View> */
}
