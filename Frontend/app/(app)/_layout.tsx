import { Redirect, Stack } from "expo-router";
import { AppContext } from "../_layout";
import { useContext } from "react";
import BottomBar from "@/components/BottomBar/BottomBar";

export default function AppLayout() {
  const { userId } = useContext(AppContext);
  if (userId === -1) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/signin" />;
  } else
    return (
      <>
        <Stack />
        <BottomBar />
      </>
    );
}
