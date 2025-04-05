import BottomBar from "@/components/BottomBar/BottomBar";
import { profileStyles } from "./profileStyles";
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function Profile() {
  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <View style={profileStyles.flex}>
      <View style={profileStyles.bg}>
        <View style={profileStyles.container}>
          <View style={profileStyles.content}>
            <Image
              source={require("../assets/images/placeHolderIcon.png")}
            ></Image>
            <Text style={profileStyles.nameText}> Name</Text>;
            <Text style={profileStyles.usernameText}> @username</Text>
          </View>
          <View style={[profileStyles.view, { paddingTop: 400 }]}>
            <View style={profileStyles.box}>
              <Text>STATSFASOIDJOIASJDsidOSA</Text>
            </View>
          </View>
        </View>
        <BottomBar />
      </View>
    </View>
  );
}
