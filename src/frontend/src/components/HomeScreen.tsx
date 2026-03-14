import type { Screen } from "../App";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <main className="app-shell bg-background">
      {/* Header area */}
      <div className="flex flex-col items-center pt-16 pb-10 px-6">
        {/* Logo mark */}
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-soft">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            aria-hidden="true"
          >
            {/* Shield / safe emblem */}
            <path
              d="M22 4 L38 10 L38 22 C38 31 30 38 22 41 C14 38 6 31 6 22 L6 10 Z"
              fill="oklch(0.68 0.1 230 / 0.18)"
              stroke="oklch(0.68 0.1 230)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M15 22 L20 27 L29 18"
              stroke="oklch(0.68 0.1 230)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-black tracking-tight text-foreground leading-none mb-1">
          ATECI
        </h1>
        <p className="text-xs font-medium text-muted-foreground mb-3">
          by Dr. Sandip P. Dhurat
        </p>
        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-[260px]">
          Autistic Traveller Emergency Communication Interface
        </p>

        {/* NeuroNAV badge */}
        <div className="mt-4 px-4 py-1.5 rounded-full border border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">
            NeuroNAV · Autisafe
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 px-6 pb-8 flex-1">
        <button
          type="button"
          data-ocid="home.primary_button"
          onClick={() => onNavigate("emergency")}
          className="touch-target w-full rounded-2xl font-bold text-xl tracking-wide transition-all duration-200 active:scale-95 shadow-soft-lg"
          style={{ backgroundColor: "#A8C8E8", color: "#1a3a52" }}
          aria-label="Start Emergency Mode"
        >
          <span className="flex items-center justify-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="12" fill="rgba(26,58,82,0.12)" />
              <path
                d="M14 8 L14 16 M14 19 L14 20"
                stroke="#1a3a52"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Start Emergency Mode
          </span>
        </button>

        <button
          type="button"
          data-ocid="home.secondary_button"
          onClick={() => onNavigate("demo")}
          className="touch-target w-full rounded-2xl font-bold text-xl tracking-wide transition-all duration-200 active:scale-95 shadow-soft"
          style={{ backgroundColor: "#A8D8A8", color: "#1a4a1a" }}
          aria-label="Demo Mode"
        >
          <span className="flex items-center justify-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="12" fill="rgba(26,74,26,0.12)" />
              <path d="M11 9 L20 14 L11 19 Z" fill="#1a4a1a" />
            </svg>
            Demo Mode
          </span>
        </button>

        <button
          type="button"
          data-ocid="home.settings_button"
          onClick={() => onNavigate("settings")}
          className="touch-target w-full rounded-2xl font-bold text-xl tracking-wide transition-all duration-200 active:scale-95 shadow-soft bg-muted text-foreground"
          aria-label="Settings"
        >
          <span className="flex items-center justify-center gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="14" cy="14" r="12" fill="rgba(0,0,0,0.06)" />
              <circle
                cx="14"
                cy="14"
                r="3.5"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M14 7 L14 9 M14 19 L14 21 M7 14 L9 14 M19 14 L21 14 M9.2 9.2 L10.6 10.6 M17.4 17.4 L18.8 18.8 M9.2 18.8 L10.6 17.4 M17.4 10.6 L18.8 9.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Settings
          </span>
        </button>
      </div>

      {/* Footer */}
      <footer className="pb-8 text-center">
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
    </main>
  );
}
