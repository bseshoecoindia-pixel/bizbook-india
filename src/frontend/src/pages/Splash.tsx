import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Splash() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [dotIdx, setDotIdx] = useState(0);

  // Animated loading dots cycle
  useEffect(() => {
    const id = setInterval(() => setDotIdx((d) => (d + 1) % 3), 380);
    return () => clearInterval(id);
  }, []);

  // Auto-redirect after 2 s
  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      navigate({ to: isAuthenticated ? "/dashboard" : "/login" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background px-8"
      data-ocid="splash.page"
    >
      {/* Logo + wordmark */}
      <div className="flex flex-col items-center gap-5 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-elevated">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <title>BizBook Logo</title>
            <path
              d="M10 8h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-1.105 0-2-.895-2-2V10c0-1.105.895-2 2-2z"
              fill="white"
              fillOpacity="0.85"
            />
            <path
              d="M10 26h14c4.418 0 8 3.582 8 8"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect
              x="13"
              y="14"
              width="10"
              height="2.5"
              rx="1.25"
              fill="white"
            />
            <rect x="13" y="19" width="7" height="2.5" rx="1.25" fill="white" />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="font-display font-bold text-4xl text-primary tracking-tight">
            BizBook
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Smart Billing for Indian Businesses
          </p>
        </div>
      </div>

      {/* Feature chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-16">
        {["GST Ready", "Inventory", "Invoicing", "Reports"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Animated dots */}
      <div className="flex gap-2 items-center" data-ocid="splash.loading_state">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                dotIdx === i
                  ? "oklch(var(--primary))"
                  : "oklch(var(--muted-foreground) / 0.25)",
              transform: dotIdx === i ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        Loading{".".repeat(dotIdx + 1)}
      </p>
    </div>
  );
}
