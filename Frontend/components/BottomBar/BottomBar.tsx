import { Text, View, Image } from "react-native";
import { styles } from "./BottomBarStyles";

export default function BottomBar() {
  return (
    <View style={styles.view}>
      <View style={styles.box}>
        <Image source={require("../../assets/images/bigGroups.png")}></Image>
        <Image source={require("../../assets/images/bigHOME.png")}></Image>
        <Image source={require("../../assets/images/bigNotif.png")}></Image>
        <Image source={require("../../assets/images/bigProfile.png")}></Image>
      </View>
    </View>
  );
}
