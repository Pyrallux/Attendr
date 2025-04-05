import { Text, View, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "./signinStyles";

export default function SignUp() {
  const { setUser } = useContext(AppContext);
  const [userInput, setUserInput] = useState<string>("");
  const handleSubmit = () => {
    setUser(userInput);
  };
  return (
    <>
      <View style={signinStyles.bg}>
        <View style={signinStyles.logo}>
          <Text style={signinStyles.logoText}>Attendr</Text>
        </View>
        <View style={signinStyles.content}>
          <View style={signinStyles.box}>
            <Text style={signinStyles.header}>Sign Up</Text>
            <TextInput
              style={signinStyles.border}
              maxLength={20}
              placeholder="First Name"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>
            <TextInput
              style={signinStyles.border}
              maxLength={20}
              placeholder="Last Name"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>
            <TextInput
              style={signinStyles.border}
              maxLength={20}
              placeholder="Username"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>
            <TextInput
              style={signinStyles.border}
              maxLength={20}
              placeholder="Email"
              onChangeText={(text) => setUserInput(text)}
            ></TextInput>
            <TextInput
              style={signinStyles.border}
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
