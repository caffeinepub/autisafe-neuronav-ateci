import { useEffect, useRef, useState } from "react";
import type { Settings } from "../backend.d";

interface DemoModeProps {
  settings: Settings;
  onBack: () => void;
}

interface DemoSignal {
  id: string;
  label: string;
  bg: string;
  textColor: string;
  title: string;
  vibrationPattern?: number[];
  audioFreq?: number;
  ocid: string;
  icon: React.ReactNode;
}

function SeatIconSmall() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="22" r="14" fill="currentColor" opacity="0.85" />
      <rect
        x="44"
        y="40"
        width="32"
        height="36"
        rx="10"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M44 68 L32 90 L40 90 L50 72"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M76 68 L88 90 L80 90 L70 72"
        fill="currentColor"
        opacity="0.75"
      />
      <rect
        x="30"
        y="76"
        width="60"
        height="10"
        rx="5"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

function BreathIconSmall() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 30 L50 55"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M50 55 C50 55 28 58 24 72 C20 86 32 94 40 90 C48 86 50 76 50 70"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M50 55 C50 55 72 58 76 72 C80 86 68 94 60 90 C52 86 50 76 50 70"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

function ArrowIconSmall() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 60 L90 60"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M68 36 L94 60 L68 84"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoorIconSmall() {
  return (
    <svg
      width="52"
      height="56"
      viewBox="0 0 110 120"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="15"
        y="10"
        width="80"
        height="100"
        rx="6"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M15 10 L15 110 L65 100 L65 20 Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M15 10 L15 110 L65 100 L65 20 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="56" cy="62" r="5" fill="currentColor" opacity="0.8" />
      <path
        d="M72 55 L90 55 M83 46 L90 55 L83 64"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIconSmall() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="48" fill="currentColor" opacity="0.15" />
      <path
        d="M34 62 L52 80 L86 44"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const signals: DemoSignal[] = [
  {
    id: "stay",
    label: "Stay Seated Signal",
    bg: "#A8C8E8",
    textColor: "#1a3a52",
    title: "STAY SEATED",
    vibrationPattern: [1000, 500, 1000, 500, 1000],
    audioFreq: 220,
    ocid: "demo.stay_button",
    icon: <SeatIconSmall />,
  },
  {
    id: "breathe",
    label: "Breathe / Calm Mode",
    bg: "#EEF2FF",
    textColor: "#2c3061",
    title: "BREATHE",
    ocid: "demo.breathe_button",
    icon: <BreathIconSmall />,
  },
  {
    id: "follow",
    label: "Follow Direction",
    bg: "#A8D8A8",
    textColor: "#1a4a1a",
    title: "FOLLOW",
    vibrationPattern: [200, 100, 200, 100, 200],
    ocid: "demo.follow_button",
    icon: <ArrowIconSmall />,
  },
  {
    id: "exit",
    label: "Exit Signal",
    bg: "#F4C890",
    textColor: "#4a2800",
    title: "EXIT VEHICLE",
    vibrationPattern: [600, 400, 600, 400],
    audioFreq: 330,
    ocid: "demo.exit_button",
    icon: <DoorIconSmall />,
  },
  {
    id: "safezone",
    label: "Safe Zone Signal",
    bg: "#B8E0B8",
    textColor: "#1a4a1a",
    title: "SAFE ZONE",
    ocid: "demo.safezone_button",
    icon: <CheckIconSmall />,
  },
];

function safeVibrate(pattern: number[]) {
  try {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    // ignore
  }
}

function stopVibrate() {
  try {
    if ("vibrate" in navigator) navigator.vibrate(0);
  } catch {
    // ignore
  }
}

function playTone(
  freq: number,
  vol: number,
  ctxRef: React.MutableRefObject<AudioContext | null>,
) {
  try {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.3);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 3);
  } catch {
    // ignore
  }
}

export function DemoMode({ settings, onBack }: DemoModeProps) {
  const [activeSignal, setActiveSignal] = useState<DemoSignal | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const ndMode = settings.ndModeEnabled;
  const vibEnabled = settings.vibrationEnabled && !ndMode;
  const audioEnabled = settings.audioEnabled && !ndMode;
  const audioVol = (Number(settings.audioVolume) / 100) * 0.15;

  function showSignal(signal: DemoSignal) {
    setActiveSignal(signal);
    if (vibEnabled && signal.vibrationPattern) {
      safeVibrate(signal.vibrationPattern);
    }
    if (audioEnabled && signal.audioFreq) {
      playTone(signal.audioFreq, audioVol, audioCtxRef);
    }
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => {
      dismissSignal();
    }, 5000);
  }

  function dismissSignal() {
    setActiveSignal(null);
    stopVibrate();
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
  }

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      stopVibrate();
    };
  }, []);

  return (
    <div className="app-shell bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 pt-8 pb-5">
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
          <h1 className="text-2xl font-black text-foreground">Demo Mode</h1>
          <p className="text-sm text-muted-foreground">
            Test each signal safely
          </p>
        </div>
      </header>

      {/* Signal buttons */}
      <main className="flex-1 flex flex-col gap-3 px-5 pb-8 overflow-auto">
        {signals.map((signal) => (
          <button
            type="button"
            key={signal.id}
            data-ocid={signal.ocid}
            onClick={() => showSignal(signal)}
            className="w-full rounded-2xl font-bold text-lg flex items-center gap-4 px-5 transition-all duration-150 active:scale-95 shadow-soft"
            style={{
              minHeight: "72px",
              backgroundColor: signal.bg,
              color: signal.textColor,
            }}
            aria-label={`Preview ${signal.label}`}
          >
            <span style={{ color: signal.textColor }}>{signal.icon}</span>
            <span>{signal.label}</span>
          </button>
        ))}

        <div className="mt-3 p-4 rounded-2xl bg-muted">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Each signal plays for 5 seconds, then auto-dismisses
          </p>
        </div>
      </main>

      {/* Full-screen overlay */}
      {activeSignal && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center z-50 animate-step-entry"
          style={{
            backgroundColor: activeSignal.bg,
            maxWidth: "430px",
            margin: "0 auto",
          }}
        >
          {/* Auto-dismiss progress bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: `${activeSignal.textColor}22` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                backgroundColor: activeSignal.textColor,
                animation: "progressBar 5s linear forwards",
                width: "100%",
              }}
            />
          </div>

          {/* Close button */}
          <button
            type="button"
            data-ocid="demo.close_button"
            onClick={dismissSignal}
            className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{ backgroundColor: `${activeSignal.textColor}18` }}
            aria-label="Close preview"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4 L14 14 M14 4 L4 14"
                stroke={activeSignal.textColor}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Icon */}
          <div
            className="mb-8 scale-[2]"
            style={{ color: activeSignal.textColor }}
          >
            {activeSignal.icon}
          </div>

          <h2
            className="text-5xl font-black tracking-widest text-center"
            style={{ color: activeSignal.textColor }}
          >
            {activeSignal.title}
          </h2>

          <p
            className="mt-4 text-sm font-medium opacity-60"
            style={{ color: activeSignal.textColor }}
          >
            Auto-dismisses in 5 seconds
          </p>
        </div>
      )}

      <style>{`
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
