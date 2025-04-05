import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#4b4b4b",
  },
  content: {
    paddingTop: 240,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b4b4b",
  },
  bg: {
    flex: 1,
    backgroundColor: "#292929",
    height: "100%",
    width: "100%",
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
  view: {
    paddingTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  box: {
    height: 128,
    flexDirection: "column",
    width: 375,
    gap: 25,
    backgroundColor: "#4b4b4b",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 44,
  },
  flex: {
    flex: 1,
    display: "flex",
  },
});
