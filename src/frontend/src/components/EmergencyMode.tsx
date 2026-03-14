import { useEffect, useRef, useState } from "react";
import type { Settings } from "../backend.d";

interface EmergencyModeProps {
  settings: Settings;
  onExit: () => void;
}

interface StepConfig {
  id: number;
  bg: string;
  textColor: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  vibrationPattern?: number[];
  vibrationInterval?: number;
  audioFreq?: number;
  isBreathe?: boolean;
  isSafeZone?: boolean;
}

// Inline SVG icons
function SeatIcon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      {/* Person seated */}
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
      {/* Seat back */}
      <rect
        x="36"
        y="36"
        width="8"
        height="44"
        rx="4"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="76"
        y="36"
        width="8"
        height="44"
        rx="4"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

function BreathIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      {/* Simple lungs outline */}
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
      <path
        d="M44 30 C44 26.7 46.7 24 50 24 C53.3 24 56 26.7 56 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="120"
      height="120"
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

function DoorIcon() {
  return (
    <svg
      width="110"
      height="120"
      viewBox="0 0 110 120"
      fill="none"
      aria-hidden="true"
    >
      {/* Frame */}
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
      {/* Door open */}
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
      {/* Door knob */}
      <circle cx="56" cy="62" r="5" fill="currentColor" opacity="0.8" />
      {/* Exit arrow */}
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

function CheckIcon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="48" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="60" r="38" fill="currentColor" opacity="0.1" />
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

const steps: StepConfig[] = [
  {
    id: 1,
    bg: "#A8C8E8",
    textColor: "#1a3a52",
    title: "STAY SEATED",
    icon: <SeatIcon />,
    vibrationPattern: [1000, 500, 1000, 500, 1000],
    vibrationInterval: 4000,
    audioFreq: 220,
  },
  {
    id: 2,
    bg: "#EEF2FF",
    textColor: "#2c3061",
    title: "BREATHE",
    icon: <BreathIcon />,
    isBreathe: true,
  },
  {
    id: 3,
    bg: "#A8D8A8",
    textColor: "#1a4a1a",
    title: "FOLLOW",
    subtitle: "Follow guidance from emergency staff",
    icon: <ArrowIcon />,
    vibrationPattern: [200, 100, 200, 100, 200],
    vibrationInterval: 3500,
  },
  {
    id: 4,
    bg: "#F4C890",
    textColor: "#4a2800",
    title: "EXIT VEHICLE",
    icon: <DoorIcon />,
    vibrationPattern: [600, 400],
    vibrationInterval: 1200,
    audioFreq: 330,
  },
  {
    id: 5,
    bg: "#B8E0B8",
    textColor: "#1a4a1a",
    title: "SAFE ZONE",
    subtitle: "You are safe",
    icon: <CheckIcon />,
    isSafeZone: true,
  },
];

function safeVibrate(pattern: number[]) {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Not supported
  }
}

function stopVibrate() {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
  } catch {
    // Not supported
  }
}

function playTone(
  freq: number,
  volume: number,
  audioCtxRef: React.MutableRefObject<AudioContext | null>,
  gainNodeRef: React.MutableRefObject<GainNode | null>,
) {
  try {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
    }
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    gainNodeRef.current = gainNode;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 3.5);
  } catch {
    // Not supported
  }
}

function stopAudio(
  gainNodeRef: React.MutableRefObject<GainNode | null>,
  audioCtxRef: React.MutableRefObject<AudioContext | null>,
) {
  try {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioCtxRef.current.currentTime + 0.3,
      );
    }
  } catch {
    // Not supported
  }
}

export function EmergencyMode({ settings, onExit }: EmergencyModeProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const vibIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const ndMode = settings.ndModeEnabled;
  const vibEnabled = settings.vibrationEnabled && !ndMode;
  const audioEnabled = settings.audioEnabled && !ndMode;
  const audioVol = (Number(settings.audioVolume) / 100) * 0.2;

  useEffect(() => {
    // Clear previous
    if (vibIntervalRef.current) clearInterval(vibIntervalRef.current);
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    stopVibrate();
    stopAudio(gainNodeRef, audioCtxRef);

    if (step.isSafeZone) {
      stopVibrate();
      return;
    }

    // Setup vibration
    if (vibEnabled && step.vibrationPattern && step.vibrationInterval) {
      safeVibrate(step.vibrationPattern);
      vibIntervalRef.current = setInterval(() => {
        safeVibrate(step.vibrationPattern!);
      }, step.vibrationInterval);
    }

    // Setup audio
    if (audioEnabled && step.audioFreq) {
      playTone(step.audioFreq, audioVol, audioCtxRef, gainNodeRef);
      audioIntervalRef.current = setInterval(() => {
        playTone(step.audioFreq!, audioVol, audioCtxRef, gainNodeRef);
      }, 5000);
    }

    return () => {
      if (vibIntervalRef.current) clearInterval(vibIntervalRef.current);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      stopVibrate();
    };
  }, [step, vibEnabled, audioEnabled, audioVol]);

  function handleNext() {
    if (isLastStep) {
      onExit();
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  return (
    <div
      className="app-shell flex flex-col"
      style={{ backgroundColor: step.bg, color: step.textColor }}
      data-ocid={`emergency.step.${step.id}`}
    >
      {/* Top bar: progress dots + exit */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex gap-2.5">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === stepIndex ? "28px" : "10px",
                height: "10px",
                backgroundColor:
                  i === stepIndex ? step.textColor : `${step.textColor}44`,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          data-ocid="emergency.close_button"
          onClick={onExit}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{ backgroundColor: `${step.textColor}18` }}
          aria-label="Exit emergency mode"
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
              stroke={step.textColor}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 animate-step-entry">
        {/* Breathing circle layer for step 2 */}
        {step.isBreathe && (
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="absolute rounded-full animate-breathe"
              style={{
                width: "240px",
                height: "240px",
                backgroundColor: "#B4C8E8",
                opacity: 0.5,
              }}
            />
            <div className="relative z-10" style={{ color: step.textColor }}>
              <BreathIcon />
            </div>
          </div>
        )}

        {/* Safe zone gentle pulse background */}
        {step.isSafeZone && (
          <div className="relative flex items-center justify-center mb-8">
            <div
              className="absolute rounded-full animate-safe-pulse"
              style={{
                width: "260px",
                height: "260px",
                backgroundColor: "#88C888",
                opacity: 0.35,
              }}
            />
            <div className="relative z-10" style={{ color: step.textColor }}>
              <CheckIcon />
            </div>
          </div>
        )}

        {/* Normal icon */}
        {!step.isBreathe && !step.isSafeZone && (
          <div className="mb-8" style={{ color: step.textColor }}>
            {step.icon}
          </div>
        )}

        {/* Title */}
        <h2
          className="text-5xl font-black tracking-widest text-center mb-3 leading-tight"
          style={{ color: step.textColor }}
        >
          {step.title}
        </h2>

        {/* Subtitle */}
        {step.subtitle && (
          <p
            className="text-base font-medium text-center opacity-70 mt-1 max-w-[260px] leading-relaxed"
            style={{ color: step.textColor }}
          >
            {step.subtitle}
          </p>
        )}

        {/* Breathe instruction */}
        {step.isBreathe && (
          <p
            className="text-base font-medium text-center opacity-60 mt-2"
            style={{ color: step.textColor }}
          >
            Breathe in slowly... breathe out
          </p>
        )}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-10">
        <button
          type="button"
          data-ocid="emergency.next_button"
          onClick={handleNext}
          className="w-full rounded-2xl font-black text-2xl tracking-wide transition-all duration-200 active:scale-95 shadow-soft-lg"
          style={{
            minHeight: "68px",
            backgroundColor: `${step.textColor}18`,
            color: step.textColor,
            border: `2.5px solid ${step.textColor}44`,
          }}
          aria-label={isLastStep ? "Done, return home" : "Next step"}
        >
          {isLastStep ? "DONE ✓" : "NEXT →"}
        </button>
      </div>
    </div>
  );
}
