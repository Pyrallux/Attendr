import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#46e56f",
    paddingTop: 0,

    borderBlockColor: "black",
  },
  bg: {
    flex: 1,
    backgroundColor: "#46e56f",
  },
  border: {
    borderColor: "0f9679",
    borderWidth: 2,
    color: "white",
    fontSize: 24,
    fontFamily: "Jersey10",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontFamily: "Jersey10",
  },
  header: {
    color: "white",
    fontSize: 48,
    fontFamily: "Jersey10",
  },
  box: {
    height: 800,
    width: "100%",
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 44,
    flexDirection: "column",
    gap: 20,
    paddingBottom: 200,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontSize: 64,
    paddingTop: 80,
    fontFamily: "Jersey10",
  },
});
