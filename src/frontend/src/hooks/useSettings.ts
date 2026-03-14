import { useCallback, useEffect, useState } from "react";
import type { Settings } from "../backend.d";
import { useActor } from "./useActor";

export const defaultSettings: Settings = {
  vibrationEnabled: true,
  audioEnabled: true,
  audioVolume: BigInt(60),
  vibrationStrength: BigInt(70),
  ndModeEnabled: false,
};

export function useSettings() {
  const { actor, isFetching } = useActor();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    let cancelled = false;
    actor
      .getSettings()
      .then((s) => {
        if (!cancelled) {
          setSettings(s);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  const saveSettings = useCallback(
    async (newSettings: Settings) => {
      setSettings(newSettings);
      if (actor) {
        await actor.updateSettings(newSettings);
      }
    },
    [actor],
  );

  return { settings, saveSettings, isLoading };
}
