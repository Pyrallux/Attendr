import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { useContext, useState } from "react";
import { AppContext } from "./_layout";
import { signupStyles } from "./signupStyles";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, getUsers } from "@/api/api";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  points?: number;
  streak?: number;
  password: string;
}
interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  points?: number;
  streak?: number;
  password: string;
}

export default function SignUp() {
  const { setUser } = useContext(AppContext);
  const [uniqueUserError, setUniqueUserError] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: getUsersMutation, data: userData } = useMutation({
    mutationKey: ["SignUpGetUsers"],
    mutationFn: () => getUsers(),
  });

  const { mutateAsync: addUserMutation } = useMutation({
    mutationKey: ["SignUpAddUser"],
    mutationFn: (user: User) => addUser(user),
  });

  const schema = yup.object().shape({
    firstName: yup.string().max(40).required("*First Name is Required"),
    lastName: yup.string().max(40).required("*Last Name is Required"),
    username: yup.string().max(20).required("*Username is Required"),
    email: yup
      .string()
      .email("*Invalid Email Provided")
      .required("*Email Name is Required"),
    password: yup
      .string()
      .min(5, "*Password must contain and least five characters")
      .required("*Password is Required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),
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

  const onSubmit = async (formData: FormData) => {
    setUniqueUserError("");
    let users: User[] = await getUsersMutation();
    let usernames: string[] = users?.map((u: User) => u.username);
    let emails: string[] = users?.map((u: User) => u.email);
    if (
      usernames.includes(formData.username) ||
      emails.includes(formData.email)
    ) {
      setUniqueUserError(
        "*An account with this username or email already exists"
      );
      return;
    }

    // TODO: Verify unique username
    let data: User = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    await addUserMutation(data);
    setUser(data.username);
    // TODO addUserutation.mutate(data);
  };

  const [fontsLoaded] = useFonts({
    Jersey10: require("./../assets/fonts/Jersey10-Regular.ttf"),
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={signupStyles.bg}>
          <View style={[signupStyles.logo, { flexDirection: "row" }]}>
            <Text style={signupStyles.logoText}>Attendr</Text>
            <Image
              style={{ marginTop: 50, marginLeft: 5 }}
              source={require("./../assets/images/LOGO.png")}
            ></Image>
          </View>
          <View style={signupStyles.content}>
            <View style={[signupStyles.box]}>
              <Text style={signupStyles.header}>Sign Up</Text>

              <Text style={signupStyles.text}>First Name</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={signupStyles.border}
                    placeholder="John"
                    placeholderTextColor="gray"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.firstName && (
                <Text style={[signupStyles.text, { color: "red" }]}>
                  {errors.firstName.message}
                </Text>
              )}

              <Text style={signupStyles.text}>Last Name</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={signupStyles.border}
                    placeholder="Doe"
                    placeholderTextColor="gray"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.lastName && (
                <Text
                  style={[signupStyles.text, { color: "red", marginTop: 5 }]}
                >
                  {errors.lastName.message}
                </Text>
              )}

              <Text style={signupStyles.text}>Username</Text>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={signupStyles.border}
                    placeholder="doejohn2004"
                    placeholderTextColor="gray"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.username && (
                <Text style={[signupStyles.text, { color: "red" }]}>
                  {errors.username.message}
                </Text>
              )}

              <Text style={signupStyles.text}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={signupStyles.border}
                    placeholder="john.doe@example.com"
                    placeholderTextColor="gray"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text style={[signupStyles.text, { color: "red" }]}>
                  {errors.email.message}
                </Text>
              )}

              <Text style={signupStyles.text}>Password</Text>
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
                <Text style={[signupStyles.text, { color: "red" }]}>
                  {errors.password.message}
                </Text>
              )}

              <Text style={signupStyles.text}>Confirm Password</Text>
              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={signupStyles.border}
                    secureTextEntry={true}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.passwordConfirmation && (
                <Text style={[signupStyles.text, { color: "red" }]}>
                  {errors.passwordConfirmation.message}
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
              <Text style={[signupStyles.text, { color: "red" }]}>
                {uniqueUserError}
              </Text>
              <Text
                onPress={() => router.navigate("/signin")}
                style={signupStyles.text}
              >
                Already have an account? Click here to sign in.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
