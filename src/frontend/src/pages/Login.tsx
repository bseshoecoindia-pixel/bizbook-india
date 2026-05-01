import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  Globe,
  Package,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: FileText,
    label: "GST Invoices",
    desc: "Professional invoice generation with auto-GST",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Package,
    label: "Inventory",
    desc: "Real-time stock tracking & low-stock alerts",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    label: "Reports",
    desc: "Profit & loss, tax reports, customer dues",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/dashboard" });
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="login.page"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
              <title>BizBook</title>
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
              <rect
                x="13"
                y="19"
                width="7"
                height="2.5"
                rx="1.25"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-3xl text-primary">
              BizBook
            </h1>
            <p className="text-xs text-muted-foreground">
              Smart Billing for Indian Businesses
            </p>
          </div>
        </div>

        {/* Welcome heading */}
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl text-foreground">
            Welcome Back
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to manage your business finances
          </p>
        </div>

        {/* Auth buttons */}
        <div className="w-full max-w-xs flex flex-col gap-3 mb-10">
          <Button
            onClick={login}
            disabled={isLoading}
            className="w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated"
            data-ocid="login.internet_identity_button"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} />
                Login with Internet Identity
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate({ to: "/dashboard" })}
            className="w-full h-12 rounded-2xl font-display font-semibold text-base border-border"
            data-ocid="login.guest_button"
          >
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-muted-foreground" />
              Continue as Guest
            </span>
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="w-full max-w-xs flex flex-col gap-3 mb-8">
          <p className="text-xs font-medium text-muted-foreground text-center uppercase tracking-wider">
            Everything you need
          </p>
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-card shadow-card"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${f.bg}`}
              >
                <f.icon size={18} className={f.color} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {f.label}
                </p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Globe size={12} className="text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">
            Secured by Internet Identity — no passwords needed
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground">
          By continuing, you agree to our{" "}
          <span className="text-primary underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-primary underline cursor-pointer">
            Privacy Policy
          </span>
        </p>
        <p className="text-[11px] text-muted-foreground mt-3">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
