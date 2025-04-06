import { Pressable, View, Image } from "react-native";
import { styles } from "./BottomBarStyles";
import { useRouter } from "expo-router";

export default function BottomBar() {
  const router = useRouter();

  return (
    <View style={styles.view}>
      <View style={styles.box}>
        <Pressable onPress={() => router.navigate("/groups")}>
          <Image source={require("../../assets/images/BWgroupNEW.png")}></Image>
        </Pressable>
        <Pressable onPress={() => router.navigate("/")}>
          <Image source={require("../../assets/images/bigHOMENEW.png")}></Image>
        </Pressable>
        <Pressable onPress={() => router.navigate("/profile")}>
          <Image
            source={require("../../assets/images/bigProfileNEW.png")}
          ></Image>
        </Pressable>
      </View>
    </View>
  );
}
