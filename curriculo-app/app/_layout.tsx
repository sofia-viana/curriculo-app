import { Stack } from "expo-router";
import { CurriculoProvider } from "../lib/CurriculoContext";

export default function RootLayout() {
  return (
    <CurriculoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CurriculoProvider>
  );
}