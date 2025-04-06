import { Stack } from "expo-router";
import { useState, createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomBar from "@/components/BottomBar/BottomBar";

export const AppContext = createContext<{
  user: string;
  setUser: (newValue: string) => void;
  userId: number;
  setUserId: (newValue: number) => void;
  activeGroupId: number;
  setActiveGroupId: (newValue: number) => void;
}>({
  user: "",
  setUser: () => undefined,
  userId: -1,
  setUserId: () => undefined,
  activeGroupId: -1,
  setActiveGroupId: () => undefined,
});

const client = new QueryClient();

export default function RootLayout() {
  const [user, setUser] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);
  const [activeGroupId, setActiveGroupId] = useState<number>(-1);

  return (
    <>
      <QueryClientProvider client={client}>
        <AppContext.Provider
          value={{
            user,
            setUser,
            userId,
            setUserId,
            activeGroupId,
            setActiveGroupId,
          }}
        >
          <Stack
            screenOptions={{
              // Hide the header for this route
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="schedule" />
            <Stack.Screen name="groups" />
            <Stack.Screen name="groupleaderboard" />
            <Stack.Screen name="addgroup" />
            <Stack.Screen name="editgroup" />
          </Stack>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  );
}
