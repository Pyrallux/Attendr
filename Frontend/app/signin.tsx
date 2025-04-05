import { Text, View, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signupStyles } from "./signupStyles";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";

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

  return (
    <>
      <View style={signupStyles.bg}>
        <View style={signupStyles.logo}>
          <Text style={signupStyles.logoText}>Attendr</Text>
        </View>
        <View style={signupStyles.content}>
          <View style={signupStyles.box}>
            <Text style={signupStyles.header}>Sign Up</Text>

            <Text>First Name</Text>

            <Text>Username</Text>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={signupStyles.border}
                  placeholder="doejohn2004"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.username && (
              <Text style={{ color: "red" }}>{errors.username.message}</Text>
            )}

            <Text>Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={signupStyles.border}
                  secureTextEntry={true}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}

            <Button onPress={handleSubmit(onSubmit)} title="submit"></Button>
            <Text style={{ color: "red" }}>{loginError}</Text>
            <Text onPress={() => router.navigate("/signup")}>
              Don't have an account? Click here to sign up.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
