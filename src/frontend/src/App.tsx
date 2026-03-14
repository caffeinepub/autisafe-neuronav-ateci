import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { DemoMode } from "./components/DemoMode";
import { EmergencyMode } from "./components/EmergencyMode";
import { HomeScreen } from "./components/HomeScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { useSettings } from "./hooks/useSettings";

export type Screen = "home" | "emergency" | "demo" | "settings";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const { settings, saveSettings, isLoading } = useSettings();

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Toaster position="top-center" />
      {screen === "home" && <HomeScreen onNavigate={setScreen} />}
      {screen === "emergency" && (
        <EmergencyMode settings={settings} onExit={() => setScreen("home")} />
      )}
      {screen === "demo" && (
        <DemoMode settings={settings} onBack={() => setScreen("home")} />
      )}
      {screen === "settings" && (
        <SettingsScreen
          settings={settings}
          onSave={saveSettings}
          onBack={() => setScreen("home")}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
