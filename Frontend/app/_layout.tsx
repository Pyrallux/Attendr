import { Stack } from "expo-router";
import { useState, createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppContext = createContext<{
  user: string;
  setUser: (newValue: string) => void;
}>({
  user: "",
  setUser: () => undefined,
});

const client = new QueryClient();

export default function RootLayout() {
  const [user, setUser] = useState<string>("");

  return (
    <QueryClientProvider client={client}>
      <AppContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Stack />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
