import { StyleSheet } from "react-native";

export const groupsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    // paddingTop: 700,
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
    height: "100%",
    width: "100%",
    backgroundColor: "#292929",
  },
  box: {
    flexDirection: "row",
    height: 128,
    width: 375,
    gap: 25,
    backgroundColor: "#4b4b4b",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 44,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingTop: 600,
  },

  timeText: {
    color: "white",
    fontSize: 32,
    fontFamily: "Jersey10",
  },
});
