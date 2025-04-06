import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  box: {
    flexDirection: "row",
    height: 64,
    width: 375,
    gap: 25,
    backgroundColor: "#4b4b4b",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    borderRadius: 44,
    position: "absolute",
    top: -200,
  },
});
