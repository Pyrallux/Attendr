import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signinStyles } from "./signinStyles";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

interface User {
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
  const { setUser } = useContext(AppContext);
  const [loginError, setLoginError] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: getUsersMutation, data: userData } = useMutation({
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
    setValue,
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
  };

  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <>
      <View style={signinStyles.bg}>
        <View style={signinStyles.logo}>
          <Text style={[signinStyles.logoText, { fontFamily: "Jersey10" }]}>
            Attendr
          </Text>
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
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
              style={{ marginTop: 20 }}
            >
              <ImageBackground
                source={require("./../assets/images/submitButton.png")} // replace with your actual path
                style={{
                  width: 200,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                imageStyle={{ borderRadius: 10 }} // optional rounded corners
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Jersey10",
                    paddingBottom: 10,
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
