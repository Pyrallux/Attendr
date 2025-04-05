import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4b4b4b",
    paddingTop: 0,

    borderBlockColor: "black",
  },
  bg: {
    flex: 1,
    backgroundColor: "#4b4b4b",
  },
  border: {
    borderBlockColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 12,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  header: {
    color: "white",
    fontSize: 32,
  },
  box: {
    height: 750,
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
    fontSize: 32,
    paddingTop: 80,
    fontFamily: "",
  },
});
