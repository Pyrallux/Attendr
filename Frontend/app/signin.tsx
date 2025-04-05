import { Text, View, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";

export default function SignIn() {
  const { setUser } = useContext(AppContext);
  const [userInput, setUserInput] = useState<string>("");
  const handleSubmit = () => {
    setUser(userInput);
  };
  return (
    <>
      <TextInput
        maxLength={20}
        placeholder="First Name"
        onChangeText={(text) => setUserInput(text)}
      ></TextInput>
      <TextInput
        maxLength={20}
        placeholder="Last Name"
        onChangeText={(text) => setUserInput(text)}
      ></TextInput>
      <TextInput
        maxLength={20}
        placeholder="Username"
        onChangeText={(text) => setUserInput(text)}
      ></TextInput>
      <TextInput
        maxLength={20}
        placeholder="Email"
        onChangeText={(text) => setUserInput(text)}
      ></TextInput>
      <TextInput
        maxLength={20}
        placeholder="Password"
        onChangeText={(text) => setUserInput(text)}
      ></TextInput>
      <Button onPress={handleSubmit} title="submit"></Button>
    </>
  );
}
