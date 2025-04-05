import BottomBar from "@/components/BottomBar/BottomBar";
import { groupsStyles } from "./groupsStyles";
import { Text, View } from "react-native";

export default function Groups() {
  // Use Virtualized List

  return (
    <>
      <View style={groupsStyles.bg}>
        <View style={groupsStyles.bg}>
          <View style={groupsStyles.container}>
            <View style={groupsStyles.content}></View>
          </View>
        </View>
        <BottomBar />
      </View>
    </>
  );
}
