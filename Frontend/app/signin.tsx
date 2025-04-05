import { Text, View, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signupStyles } from "./signupStyles";

export default function SignUp() {
  const { setUser } = useContext(AppContext);
  const [userInput, setUserInput] = useState<string>("");
  const handleSubmit = () => {
    setUser(userInput);
  };
  return (
    <>
      <View style={signupStyles.bg}>
        <View style={signupStyles.logo}>
          <Text style={signupStyles.logoText}>Attendr</Text>
        </View>
        <View style={signupStyles.content}>
          <View style={signupStyles.box}>
            <Text style={signupStyles.header}>Sign In</Text>

            <TextInput
              style={signupStyles.border}
              maxLength={20}
              placeholder="Username"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>

            <TextInput
              style={signupStyles.border}
              maxLength={20}
              placeholder="Password"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>
            <Button onPress={handleSubmit} title="submit"></Button>
          </View>
        </View>
      </View>
    </>
  );
}
