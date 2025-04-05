import BottomBar from "@/components/BottomBar/BottomBar";
import { profileStyles } from "./profileStyles";
import { Text, View, Image } from "react-native";

import { useFonts } from "expo-font";

export default function Profile() {
  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <>
      <View style={profileStyles.bg}>
        <View style={profileStyles.bg}>
          <View style={profileStyles.container}>
            <View style={profileStyles.content}>
              <Image
                source={require("../assets/images/placeHolderIcon.png")}
              ></Image>
              <Text style={profileStyles.nameText}> Name</Text>
              <Text style={profileStyles.usernameText}> @username</Text>
            </View>
          </View>
        </View>
        <BottomBar />
      </View>
    </>
  );
}
