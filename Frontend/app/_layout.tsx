import { Stack } from "expo-router";
import { useState, createContext } from "react";

export const AppContext = createContext<{
  user: string;
  setUser: (newValue: string) => void;
}>({
  user: "",
  setUser: () => undefined,
});

export default function RootLayout() {
  const [user, setUser] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Stack />
    </AppContext.Provider>
  );
}
