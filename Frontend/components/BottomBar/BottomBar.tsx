import { Pressable, View, Image } from "react-native";
import { styles } from "./BottomBarStyles";
import { useRouter } from "expo-router";

export default function BottomBar() {
  const router = useRouter();

  return (
    <View style={styles.view}>
      <View style={styles.box}>
        <Pressable onPress={() => router.navigate("/groups")}>
          <Image source={require("../../assets/images/bigGroups.png")}></Image>
        </Pressable>
        <Pressable onPress={() => router.navigate("/")}>
          <Image source={require("../../assets/images/bigHOME.png")}></Image>
        </Pressable>
        <Pressable onPress={() => router.navigate("/profile")}>
          <Image source={require("../../assets/images/bigProfile.png")}></Image>
        </Pressable>
      </View>
    </View>
  );
}
