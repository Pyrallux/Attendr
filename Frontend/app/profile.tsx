import BottomBar from "@/components/BottomBar/BottomBar";
import { Text, View, Image } from "react-native";

export default function Home() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/images/favicon.png")}></Image>
        <Text>Edit app/index.tsx to edit this penis.</Text>
      </View>
      <BottomBar />
    </>
  );
}
