import { StyleSheet } from "react-native";

export const addScheduleStyles = StyleSheet.create({
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
    borderColor: "white",
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
    height: 1100,
    width: "100%",
    backgroundColor: "#292929",
    alignItems: "center",
    display: "flex",
    borderTopLeftRadius: 44,
    borderTopRightRadius: 44,
    flexDirection: "column",
    gap: 20,
    paddingBottom: 100,
    paddingTop: 40,
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
  checkText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Jersey10",
  },
});
