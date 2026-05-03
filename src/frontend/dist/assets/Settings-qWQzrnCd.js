import { c as createLucideIcon, ai as useBusinessProfile, u as useAuth, b as useSaveBusinessProfile, aj as useUpdateBusinessProfile, r as reactExports, j as jsxRuntimeExports, t as Card, I as Input, B as Button, d as cn, ak as LogOut, e as ue, L as Label } from "./index-DHdUgTPk.js";
import { B as Building2 } from "./building-2-BqodSw9k.js";
import { G as Globe } from "./globe-Zo4Au1dn.js";
import { C as ChevronDown } from "./chevron-down-CZ7Jrx8h.js";
import { I as IndianRupee } from "./indian-rupee-BSLgJRl2.js";
import { U as User } from "./user-BarcmlEY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function SectionHeader({
  icon: Icon,
  title,
  accent = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 px-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Icon,
      {
        size: 14,
        className: accent ? "text-destructive" : "text-primary"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: title })
  ] });
}
function FormField({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    children
  ] });
}
function InfoRow({
  icon: Icon,
  label,
  value,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
          iconBg
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: iconColor })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value })
    ] })
  ] });
}
function Settings() {
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const { logout, isAuthenticated, principal } = useAuth();
  const saveMutation = useSaveBusinessProfile();
  const updateMutation = useUpdateBusinessProfile();
  const THEME_CLASSES = ["light", "dark", "sepia", "high-contrast"];
  const [theme, setTheme] = reactExports.useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("bizbook-theme");
    return saved && THEME_CLASSES.includes(saved) ? saved : "light";
  });
  reactExports.useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(...THEME_CLASSES);
    if (theme !== "light") html.classList.add(theme);
    localStorage.setItem("bizbook-theme", theme);
  }, [theme]);
  const [language, setLanguage] = reactExports.useState(
    () => (profile == null ? void 0 : profile.language) ?? "English"
  );
  reactExports.useEffect(() => {
    if (profile == null ? void 0 : profile.language) setLanguage(profile.language);
  }, [profile == null ? void 0 : profile.language]);
  const [form, setForm] = reactExports.useState({
    name: "",
    category: "",
    gstNumber: "",
    address: "",
    phone: "",
    email: ""
  });
  reactExports.useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        category: profile.category,
        gstNumber: profile.gstNumber ?? "",
        address: profile.address,
        phone: profile.phone,
        email: profile.email
      });
    }
  }, [profile]);
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const handleSaveProfile = async () => {
    if (!form.name.trim()) {
      ue.error("Business name is required");
      return;
    }
    const input = {
      name: form.name.trim(),
      category: form.category.trim(),
      gstNumber: form.gstNumber.trim() || void 0,
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      currency: "INR",
      language
    };
    try {
      if (profile) {
        await updateMutation.mutateAsync(input);
      } else {
        await saveMutation.mutateAsync(input);
      }
      ue.success("Business profile saved!");
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  };
  const isSaving = saveMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-6", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage your business & app preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Building2, title: "Business Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden p-4 space-y-4",
            "data-ocid": "settings.business_profile_card",
            children: [
              profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 animate-pulse", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-lg bg-muted" }, i)) }) : !profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200/60 mb-2",
                  "data-ocid": "settings.profile_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 14, className: "text-amber-600 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "Business profile not set up yet. Fill in the details below to get started." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Business Name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.name,
                  onChange: setField("name"),
                  placeholder: "e.g. Sharma Kirana Store",
                  className: "rounded-xl bg-input/50",
                  "data-ocid": "settings.business_name_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Business Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.category,
                  onChange: setField("category"),
                  placeholder: "e.g. Grocery, Retail, Wholesale",
                  className: "rounded-xl bg-input/50",
                  "data-ocid": "settings.business_category_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "GST Number (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.gstNumber,
                  onChange: setField("gstNumber"),
                  placeholder: "e.g. 27AABCU9603R1ZX",
                  className: "rounded-xl bg-input/50 font-mono text-sm",
                  maxLength: 15,
                  "data-ocid": "settings.gst_number_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.phone,
                  onChange: setField("phone"),
                  placeholder: "+91 98765 43210",
                  className: "rounded-xl bg-input/50",
                  "data-ocid": "settings.phone_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  value: form.email,
                  onChange: setField("email"),
                  placeholder: "business@email.com",
                  className: "rounded-xl bg-input/50",
                  "data-ocid": "settings.email_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: form.address,
                  onChange: setField("address"),
                  placeholder: "Street, City, State - PIN",
                  className: "rounded-xl bg-input/50",
                  "data-ocid": "settings.address_input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleSaveProfile,
                  disabled: isSaving || !form.name.trim(),
                  className: "w-full rounded-xl font-semibold",
                  "data-ocid": "settings.save_profile_button",
                  children: isSaving ? "Saving…" : profile ? "Update Profile" : "Save Profile"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Globe, title: "App Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { size: 15, className: "text-violet-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "App Theme" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Choose your display style" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "grid grid-cols-2 gap-2",
                "data-ocid": "settings.theme_selector",
                children: [
                  {
                    key: "light",
                    label: "Light",
                    desc: "Clean & bright",
                    bg: "#f5f5fb",
                    fg: "#1a1a2e",
                    accent: "#16a085"
                  },
                  {
                    key: "dark",
                    label: "Dark",
                    desc: "Easy on eyes",
                    bg: "#181820",
                    fg: "#e8e8ef",
                    accent: "#5bc8a8"
                  },
                  {
                    key: "sepia",
                    label: "Sepia",
                    desc: "Warm & cozy",
                    bg: "#f5efe4",
                    fg: "#3b2c1a",
                    accent: "#7ab8a8"
                  },
                  {
                    key: "high-contrast",
                    label: "High Contrast",
                    desc: "Maximum clarity",
                    bg: "#0f0f0f",
                    fg: "#fafafa",
                    accent: "#e8c22a"
                  }
                ].map(({ key, label, desc, bg, fg, accent }) => {
                  const active = theme === key;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setTheme(key),
                      "data-ocid": `settings.theme_option_${key}`,
                      className: cn(
                        "relative flex flex-col items-start p-3 rounded-2xl border-2 transition-smooth text-left",
                        active ? "border-primary bg-primary/5 shadow-card" : "border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "w-full h-10 rounded-xl mb-2.5 flex items-center justify-center gap-1.5 overflow-hidden",
                            style: { backgroundColor: bg },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-3 h-3 rounded-full",
                                  style: { backgroundColor: accent }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "h-2 rounded-full flex-1 max-w-[40px] opacity-60",
                                  style: { backgroundColor: fg }
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight", children: label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight mt-0.5", children: desc }),
                        active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Circle,
                          {
                            size: 8,
                            className: "text-primary-foreground fill-primary-foreground"
                          }
                        ) })
                      ]
                    },
                    key
                  );
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 15, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Language" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Display language" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: language,
                  onChange: (e) => setLanguage(e.target.value),
                  className: "appearance-none text-sm font-medium text-foreground bg-muted/50 border border-border/50 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                  "data-ocid": "settings.language_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "English", children: "English" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Hindi", children: "हिन्दी (Hindi)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 13,
                  className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InfoRow,
            {
              icon: IndianRupee,
              label: "Currency",
              value: "INR — Indian Rupee (locked)",
              iconColor: "text-green-600",
              iconBg: "bg-green-500/10"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Shield, title: "Account", accent: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
          principal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Internet Identity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs font-mono text-foreground truncate",
                  title: principal,
                  children: [
                    principal.slice(0, 12),
                    "…",
                    principal.slice(-6)
                  ]
                }
              )
            ] })
          ] }),
          isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "flex items-center gap-3 w-full px-4 py-3.5 text-destructive hover:bg-destructive/5 transition-smooth",
              onClick: logout,
              "data-ocid": "settings.logout_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15, className: "text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "Sign Out" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Not signed in." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground py-2", children: [
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
  ] });
}
export {
  Settings as default
};
