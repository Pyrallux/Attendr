import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "../styles/signinStyles";
import { useMutation } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  points?: number;
  streak?: number;
  password: string;
}

interface Login {
  username: string;
  password: string;
}

export default function SignIn() {
  const { setUser, setUserId } = useContext(AppContext);
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter();

  const { mutateAsync: getUsersMutation } = useMutation({
    mutationKey: ["SignInGetUsers"],
    mutationFn: () => getUsers(),
  });

  const schema = yup.object().shape({
    username: yup.string().max(20).required("*Username is Required"),
    password: yup.string().required("*Password is Required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: Login) => {
    setLoginError("");
    let users: User[] = await getUsersMutation();
    let logins: Login[] = [];
    for (let i = 0; i < users.length; i++) {
      logins.push({ username: users[i].username, password: users[i].password });
    }

    let matchingLogin: Login[] = logins.filter(
      (l: Login) => l.username === formData.username
    );

    if (!matchingLogin.length) {
      setLoginError("*Invalid Username or Password");
      return;
    }
    if (matchingLogin[0].password !== formData.password) {
      setLoginError("*Invalid Username or Password");
      return;
    }

    setUser(formData.username);
    setUserId(
      users.filter((u: User) => u.username === formData.username)[0].id
    );
    router.replace("/");
  };

  const [fontsLoaded] = useFonts({
    Jersey10: require("../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setTimeout(() => setIsPressed(false), 75);
  };

  return (
    <>
      <View style={signinStyles.bg}>
        <View style={[signinStyles.logo, { flexDirection: "row" }]}>
          <Text style={[signinStyles.logoText, { fontFamily: "Jersey10" }]}>
            Attendr
          </Text>
          <Image
            style={{ marginTop: 50, marginLeft: 5 }}
            source={require("./../assets/images/LOGO.png")}
          ></Image>
        </View>
        <View style={signinStyles.content}>
          <View style={signinStyles.box}>
            <Text style={[signinStyles.header, { fontFamily: "Jersey10" }]}>
              Sign In
            </Text>

            <Text style={signinStyles.text}>Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={signinStyles.border}
                  placeholder="doejohn2004"
                  placeholderTextColor="gray"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.username && (
              <Text style={[signinStyles.text, { color: "red" }]}>
                {errors.username.message}
              </Text>
            )}

            <Text style={signinStyles.text}>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={signinStyles.border}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={[signinStyles.text, { color: "red" }]}>
                {errors.password.message}
              </Text>
            )}

            <TouchableOpacity
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => {
                setIsPressed(false);
              }}
              onPress={() => {
                handleSubmit(onSubmit)();
                handlePress();
                setIsPressed(true);
              }}
              style={{ marginTop: 20 }}
            >
              <ImageBackground
                source={
                  isPressed
                    ? require("./../assets/images/submitButton2.png")
                    : require("./../assets/images/submitButton.png")
                }
                style={{
                  width: 200,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Jersey10",
                    transform: [{ translateY: isPressed ? 10 : -5 }],
                  }}
                >
                  Submit
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text style={[signinStyles.text, { color: "red" }]}>
              {loginError}
            </Text>
            <Text
              onPress={() => router.navigate("/signup")}
              style={signinStyles.text}
            >
              Don't have an account? Click here to sign up.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
