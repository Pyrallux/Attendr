import BottomBar from "@/components/BottomBar/BottomBar";
import { profileStyles } from "./profileStyles";
import { Text, View, Image } from "react-native";

export default function Profile() {
  return (
    <View style={profileStyles.bg}>
      <View style={profileStyles.container}>
        <View style={profileStyles.content}>
          <Image
            source={require("../assets/images/placeHolderIcon.png")}
          ></Image>
          <Text style={profileStyles.nameText}> Name</Text>
          <Text style={profileStyles.usernameText}> @username</Text>
        </View>
      </View>
      <BottomBar />
    </View>
  );
}
