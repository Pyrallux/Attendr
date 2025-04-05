import BottomBar from "@/components/BottomBar/BottomBar";
import { Text, View } from "react-native";

export default function Groups() {
  // Use Virtualized List
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>This is a group.</Text>
        <Text>This is a group.</Text>
        <Text>This is a group.</Text>
        <Text>This is a group.</Text>
        <Text>This is a group.</Text>
        <Text>This is a group.</Text>
      </View>
      <BottomBar />
    </>
  );
}
