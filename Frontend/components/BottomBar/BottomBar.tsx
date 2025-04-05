import { Text, View, Image } from "react-native";
import { styles } from "./BottomBarStyles";

export default function BottomBar() {
  return (
    <View style={styles.view}>
      <Image source={require("../../assets/images/favicon.png")}></Image>
      <Image source={require("../../assets/images/favicon.png")}></Image>
      <Image source={require("../../assets/images/favicon.png")}></Image>
      <Image source={require("../../assets/images/favicon.png")}></Image>
    </View>
  );
}
