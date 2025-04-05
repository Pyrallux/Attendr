import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "./homeStyles";
import { Text, View } from "react-native";

import { useFonts } from "expo-font";

export default function Home() {
  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <>
      <View style={homeStyles.bg}>
        <View style={homeStyles.bg}>
          <View style={homeStyles.view}>
            <View style={homeStyles.box}>
              <Text style={[homeStyles.timeText, { fontFamily: "Jersey10" }]}>
                Time till next class:{" "}
              </Text>
              <Text style={homeStyles.timeText}>00:00 </Text>
            </View>
          </View>
          {/* <View style={homeStyles.container}></View> */}
        </View>
        <BottomBar />
      </View>
    </>
  );
}
