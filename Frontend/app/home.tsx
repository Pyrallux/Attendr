import BottomBar from "@/components/BottomBar/BottomBar";
import { homeStyles } from "./homeStyles";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View style={homeStyles.bg}>
      <View style={homeStyles.container}>
        <View></View>
      </View>
      <BottomBar />
    </View>
  );
}
