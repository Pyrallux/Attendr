import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#4b4b4b",
  },
  content: {
    paddingTop: 200,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b4b4b",
  },
  bg: {
    flex: 1,
    backgroundColor: "#292929",
  },
  nameText: {
    color: "white",
    fontSize: 32,
    fontFamily: "Jersey10",
  },
  usernameText: {
    color: "gray",
    fontSize: 16,
    fontFamily: "Jersey10",
  },
});
