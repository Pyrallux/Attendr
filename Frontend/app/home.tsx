import BottomBar from "@/components/BottomBar/BottomBar";
import { Text, View } from "react-native";

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
        <Text>Edit app/index.tsx to edit this penis.</Text>
      </View>
      <BottomBar />
    </>
  );
}
