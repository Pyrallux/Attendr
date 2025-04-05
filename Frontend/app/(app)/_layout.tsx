import { Redirect, Stack } from "expo-router";
import { AppContext } from "../_layout";
import { useContext } from "react";
import BottomBar from "@/components/BottomBar/BottomBar";

export default function AppLayout() {
  const { user } = useContext(AppContext);
  if (user === "") {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signin" />;
  }
  return (
    <Stack>
      <BottomBar />
    </Stack>
  );
}
