import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DHdUgTPk.js";
function Splash() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [dotIdx, setDotIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setDotIdx((d) => (d + 1) % 3), 380);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(() => {
      navigate({ to: isAuthenticated ? "/dashboard" : "/login" });
    }, 2e3);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col items-center justify-center bg-background px-8",
      "data-ocid": "splash.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "44", height: "44", viewBox: "0 0 44 44", fill: "none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "BizBook Logo" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "13", y: "19", width: "7", height: "2.5", rx: "1.25", fill: "white" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl text-primary tracking-tight", children: "BizBook" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Smart Billing for Indian Businesses" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mb-16", children: ["GST Ready", "Inventory", "Invoicing", "Reports"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium",
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 items-center", "data-ocid": "splash.loading_state", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full transition-all duration-300",
            style: {
              backgroundColor: dotIdx === i ? "oklch(var(--primary))" : "oklch(var(--muted-foreground) / 0.25)",
              transform: dotIdx === i ? "scale(1.5)" : "scale(1)"
            }
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
          "Loading",
          ".".repeat(dotIdx + 1)
        ] })
      ]
    }
  );
}
export {
  Splash as default
};
