import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Settings } from "../backend.d";

interface SettingsScreenProps {
  settings: Settings;
  onSave: (settings: Settings) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
}

export function SettingsScreen({
  settings,
  onSave,
  onBack,
  isLoading,
}: SettingsScreenProps) {
  const [vibrationEnabled, setVibrationEnabled] = useState(
    settings.vibrationEnabled,
  );
  const [audioEnabled, setAudioEnabled] = useState(settings.audioEnabled);
  const [vibrationStrength, setVibrationStrength] = useState(
    Number(settings.vibrationStrength),
  );
  const [audioVolume, setAudioVolume] = useState(Number(settings.audioVolume));
  const [ndModeEnabled, setNdModeEnabled] = useState(settings.ndModeEnabled);
  const [isSaving, setIsSaving] = useState(false);

  // Sync when settings load from backend
  useEffect(() => {
    setVibrationEnabled(settings.vibrationEnabled);
    setAudioEnabled(settings.audioEnabled);
    setVibrationStrength(Number(settings.vibrationStrength));
    setAudioVolume(Number(settings.audioVolume));
    setNdModeEnabled(settings.ndModeEnabled);
  }, [settings]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await onSave({
        vibrationEnabled,
        audioEnabled,
        vibrationStrength: BigInt(vibrationStrength),
        audioVolume: BigInt(audioVolume),
        ndModeEnabled,
      });
      toast.success("Settings saved");
    } catch {
      toast.error("Could not save settings");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="app-shell bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-8 pb-6">
        <button
          type="button"
          onClick={onBack}
          className="w-11 h-11 rounded-2xl flex items-center justify-center bg-muted transition-all active:scale-90"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13 4 L7 10 L13 16"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-black text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Personalise your experience
          </p>
        </div>
      </header>

      {isLoading ? (
        <div
          className="flex-1 flex items-center justify-center"
          data-ocid="settings.loading_state"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
            <p className="text-sm text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      ) : (
        <main className="flex-1 flex flex-col gap-3 px-5 pb-8 overflow-auto">
          {/* ND Sensory-Safe Mode — featured first as most important */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Label className="text-base font-bold text-foreground block mb-1">
                  ND Sensory-Safe Mode
                </Label>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reduces all animations and audio to absolute minimum
                </p>
              </div>
              <Switch
                data-ocid="settings.nd_mode_toggle"
                checked={ndModeEnabled}
                onCheckedChange={setNdModeEnabled}
                aria-label="Toggle ND sensory-safe mode"
              />
            </div>
            {ndModeEnabled && (
              <div className="mt-3 px-3 py-2 rounded-xl bg-secondary/20 text-sm text-secondary-foreground font-medium">
                ✓ Sensory-safe mode active — minimal stimulation
              </div>
            )}
          </div>

          {/* Vibration section */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 4 C4 6 4 14 6 16"
                      stroke="oklch(0.68 0.1 230)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 6 C7 8 7 12 8 14"
                      stroke="oklch(0.68 0.1 230)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 4 C14 6 14 14 12 16"
                      stroke="oklch(0.68 0.1 230)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 6 C15 8 15 12 14 14"
                      stroke="oklch(0.68 0.1 230)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <rect
                      x="9"
                      y="7"
                      width="2"
                      height="6"
                      rx="1"
                      fill="oklch(0.68 0.1 230)"
                    />
                  </svg>
                </div>
                <Label className="text-base font-bold text-foreground">
                  Vibration Guidance
                </Label>
              </div>
              <Switch
                data-ocid="settings.vibration_toggle"
                checked={vibrationEnabled}
                onCheckedChange={setVibrationEnabled}
                disabled={ndModeEnabled}
                aria-label="Toggle vibration guidance"
              />
            </div>

            {vibrationEnabled && !ndModeEnabled && (
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-muted-foreground">
                    Vibration Strength
                  </Label>
                  <span className="text-sm font-bold text-foreground">
                    {vibrationStrength}%
                  </span>
                </div>
                <Slider
                  data-ocid="settings.vibration_input"
                  min={0}
                  max={100}
                  step={5}
                  value={[vibrationStrength]}
                  onValueChange={([v]) => setVibrationStrength(v)}
                  aria-label="Vibration strength"
                />
              </div>
            )}
          </div>

          {/* Audio section */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 8 L4 12 L7 12 L11 15 L11 5 L7 8 Z"
                      fill="oklch(0.72 0.09 145)"
                    />
                    <path
                      d="M14 7 C15.5 8.5 15.5 11.5 14 13"
                      stroke="oklch(0.72 0.09 145)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M16 5 C18.5 7.5 18.5 12.5 16 15"
                      stroke="oklch(0.72 0.09 145)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <Label className="text-base font-bold text-foreground">
                  Audio Guidance
                </Label>
              </div>
              <Switch
                data-ocid="settings.audio_toggle"
                checked={audioEnabled}
                onCheckedChange={setAudioEnabled}
                disabled={ndModeEnabled}
                aria-label="Toggle audio guidance"
              />
            </div>

            {audioEnabled && !ndModeEnabled && (
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-muted-foreground">
                    Audio Volume
                  </Label>
                  <span className="text-sm font-bold text-foreground">
                    {audioVolume}%
                  </span>
                </div>
                <Slider
                  data-ocid="settings.audio_input"
                  min={0}
                  max={100}
                  step={5}
                  value={[audioVolume]}
                  onValueChange={([v]) => setAudioVolume(v)}
                  aria-label="Audio volume"
                />
              </div>
            )}
          </div>

          {/* Info card */}
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Settings are saved to your personal profile and applied across all
              emergency signals
            </p>
          </div>
        </main>
      )}

      {/* Save button */}
      <div className="px-5 pb-10">
        <button
          type="button"
          data-ocid="settings.save_button"
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="w-full rounded-2xl font-black text-xl tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-60"
          style={{
            minHeight: "64px",
            backgroundColor: "#A8C8E8",
            color: "#1a3a52",
          }}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Footer */}
      <footer className="pb-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with{" "}
          <span aria-hidden="true">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
