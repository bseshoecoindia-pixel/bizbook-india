import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, S as ShieldCheck, F as FileText, P as Package, T as TrendingUp } from "./index-DHdUgTPk.js";
import { Z as Zap } from "./zap-D18ybkCi.js";
import { G as Globe } from "./globe-Zo4Au1dn.js";
const FEATURES = [
  {
    icon: FileText,
    label: "GST Invoices",
    desc: "Professional invoice generation with auto-GST",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Package,
    label: "Inventory",
    desc: "Real-time stock tracking & low-stock alerts",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: TrendingUp,
    label: "Reports",
    desc: "Profit & loss, tax reports, customer dues",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];
function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) navigate({ to: "/dashboard" });
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col bg-background",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "36", height: "36", viewBox: "0 0 44 44", fill: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "BizBook" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M10 8h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-1.105 0-2-.895-2-2V10c0-1.105.895-2 2-2z",
                  fill: "white",
                  fillOpacity: "0.85"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M10 26h14c4.418 0 8 3.582 8 8",
                  stroke: "white",
                  strokeWidth: "3",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "13",
                  y: "14",
                  width: "10",
                  height: "2.5",
                  rx: "1.25",
                  fill: "white"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "13",
                  y: "19",
                  width: "7",
                  height: "2.5",
                  rx: "1.25",
                  fill: "white"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-primary", children: "BizBook" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Smart Billing for Indian Businesses" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Welcome Back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sign in to manage your business finances" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs flex flex-col gap-3 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: login,
                disabled: isLoading,
                className: "w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated",
                "data-ocid": "login.internet_identity_button",
                children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                  "Connecting..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
                  "Login with Internet Identity"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => navigate({ to: "/dashboard" }),
                className: "w-full h-12 rounded-2xl font-display font-semibold text-base border-border",
                "data-ocid": "login.guest_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-muted-foreground" }),
                  "Continue as Guest"
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs flex flex-col gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground text-center uppercase tracking-wider", children: "Everything you need" }),
            FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 px-4 py-3 rounded-2xl bg-card shadow-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-xl flex items-center justify-center ${f.bg}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { size: 18, className: f.color })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: f.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: f.desc })
                  ] })
                ]
              },
              f.label
            ))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Secured by Internet Identity — no passwords needed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
            "By continuing, you agree to our",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline cursor-pointer", children: "Terms of Service" }),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline cursor-pointer", children: "Privacy Policy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-3", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            ". Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary font-medium",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Login as default
};
