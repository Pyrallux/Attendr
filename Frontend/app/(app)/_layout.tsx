import { Redirect, Stack } from "expo-router";
import { AppContext } from "../_layout";
import { useContext } from "react";

export default function AppLayout() {
  const { user } = useContext(AppContext);
  if (user === "") {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Stack />; // <Redirect href="/signin" />;
  }
  return <Stack />;
}
