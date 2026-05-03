import { c as createLucideIcon, u as useAuth, a as useNavigate, b as useSaveBusinessProfile, r as reactExports, j as jsxRuntimeExports, L as Label, I as Input, d as cn, B as Button, e as ue } from "./index-DHdUgTPk.js";
import { B as Building2 } from "./building-2-BqodSw9k.js";
import { M as MapPin } from "./map-pin-B7DxU77B.js";
import { P as Phone } from "./phone-BHLCko35.js";
import { U as User } from "./user-BarcmlEY.js";
import { C as Camera } from "./camera-DOAGrYmw.js";
import { C as CircleCheck } from "./circle-check-DOLw6yw2.js";
import { C as ChevronRight } from "./chevron-right-C1O50DUP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const BUSINESS_CATEGORIES = [
  "Retail Shop",
  "Wholesale / Distributor",
  "Restaurant / Food",
  "Electronics",
  "Clothing & Textiles",
  "Pharmacy / Medical",
  "Hardware & Construction",
  "Stationery",
  "Service Business",
  "Other"
];
const CURRENCIES = [
  "INR - Indian Rupee (₹)",
  "USD - US Dollar ($)",
  "EUR - Euro (€)"
];
const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi"];
function StepDots({ current, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2", children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "rounded-full transition-all duration-300",
        i < current ? "w-6 h-2 bg-primary" : i === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-border"
      )
    },
    i
  )) });
}
const STEP_TITLES = [
  "About Your Business",
  "Contact Details",
  "Preferences & Logo"
];
function Onboarding() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: saveProfile, isPending } = useSaveBusinessProfile();
  const fileInputRef = reactExports.useRef(null);
  const [step, setStep] = reactExports.useState(0);
  const [form, setForm] = reactExports.useState({
    businessName: "Ramesh Sharma Traders",
    category: "Wholesale / Distributor",
    gstNumber: "09AABFR1234A1Z5",
    address: "14, Chandni Chowk, Old Delhi - 110006",
    phone: "+91 98100 45678",
    email: "ramesh@sharmatraders.com",
    currency: "INR - Indian Rupee (₹)",
    language: "English",
    logoPreview: null
  });
  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };
  const handleLogoSelect = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, logoPreview: preview }));
  };
  const handleNext = () => {
    if (step === 0) {
      if (!form.businessName.trim()) {
        ue.error("Business name is required");
        return;
      }
      if (!form.category) {
        ue.error("Please select a business category");
        return;
      }
    }
    if (step === 1) {
      if (!form.address.trim()) {
        ue.error("Address is required");
        return;
      }
      if (!form.phone.trim()) {
        ue.error("Phone number is required");
        return;
      }
    }
    setStep((s) => s + 1);
  };
  const handleFinish = async () => {
    if (!isAuthenticated) {
      navigate({ to: "/dashboard" });
      return;
    }
    try {
      await saveProfile({
        name: form.businessName,
        category: form.category,
        gstNumber: form.gstNumber || void 0,
        address: form.address,
        phone: form.phone,
        email: form.email,
        currency: form.currency.split(" ")[0],
        language: form.language,
        logoUrl: void 0
      });
      ue.success("Business profile saved!");
      navigate({ to: "/dashboard" });
    } catch {
      ue.error("Failed to save. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col bg-background",
      "data-ocid": "onboarding.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-12 pb-6 bg-gradient-to-b from-primary/5 to-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 16, className: "text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-primary", children: "BizBook" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: STEP_TITLES[step] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              "Step ",
              step + 1,
              " of 3"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepDots, { current: step, total: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 pb-6 space-y-4 overflow-y-auto", children: [
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", "data-ocid": "onboarding.step1.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bizName", className: "text-sm font-semibold", children: "Business Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bizName",
                  value: form.businessName,
                  onChange: (e) => update("businessName", e.target.value),
                  placeholder: "e.g. Ramesh Sharma Traders",
                  className: "h-12 rounded-2xl border-border bg-card text-base",
                  "data-ocid": "onboarding.business_name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Business Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-2 gap-2",
                  "data-ocid": "onboarding.category.select",
                  children: BUSINESS_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => update("category", cat),
                      className: cn(
                        "px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-smooth border",
                        form.category === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"
                      ),
                      children: cat
                    },
                    cat
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gst", className: "text-sm font-semibold", children: [
                "GST Number",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "gst",
                  value: form.gstNumber,
                  onChange: (e) => update("gstNumber", e.target.value),
                  placeholder: "e.g. 09AABFR1234A1Z5",
                  className: "h-12 rounded-2xl border-border bg-card font-mono text-base",
                  "data-ocid": "onboarding.gst_number.input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "15-character GSTIN issued by the Government of India" })
            ] })
          ] }),
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", "data-ocid": "onboarding.step2.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "address",
                  className: "text-sm font-semibold flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary" }),
                    "Business Address *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "address",
                  value: form.address,
                  onChange: (e) => update("address", e.target.value),
                  placeholder: "Shop No., Street, City - PIN Code",
                  rows: 3,
                  className: "w-full px-3 py-3 rounded-2xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "onboarding.address.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "phone",
                  className: "text-sm font-semibold flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-primary" }),
                    "Phone Number *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "phone",
                  type: "tel",
                  value: form.phone,
                  onChange: (e) => update("phone", e.target.value),
                  placeholder: "+91 98765 43210",
                  className: "h-12 rounded-2xl border-border bg-card text-base",
                  "data-ocid": "onboarding.phone.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "email",
                  className: "text-sm font-semibold flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, className: "text-primary" }),
                    "Email Address"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  value: form.email,
                  onChange: (e) => update("email", e.target.value),
                  placeholder: "business@example.com",
                  className: "h-12 rounded-2xl border-border bg-card text-base",
                  "data-ocid": "onboarding.email.input"
                }
              )
            ] })
          ] }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", "data-ocid": "onboarding.step3.panel", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14, className: "text-primary" }),
                "Business Logo",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-8 cursor-pointer hover:border-primary/50 transition-smooth",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  "aria-label": "Upload business logo",
                  "data-ocid": "onboarding.logo.dropzone",
                  children: form.logoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: form.logoPreview,
                        alt: "Logo preview",
                        className: "w-20 h-20 rounded-2xl object-cover shadow-card"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-medium", children: "Tap to change logo" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 24, className: "text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Upload Business Logo" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PNG, JPG up to 5MB" })
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleLogoSelect,
                  "data-ocid": "onboarding.logo.upload_button"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Currency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-2",
                  "data-ocid": "onboarding.currency.select",
                  children: CURRENCIES.map((cur) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => update("currency", cur),
                      className: cn(
                        "px-4 py-3 rounded-2xl text-sm font-medium text-left transition-smooth border flex items-center justify-between",
                        form.currency === cur ? "bg-primary/10 border-primary text-primary" : "bg-card border-border text-foreground hover:border-primary/40"
                      ),
                      children: [
                        cur,
                        form.currency === cur && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 16, className: "text-primary" })
                      ]
                    },
                    cur
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Language" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid grid-cols-2 gap-2",
                  "data-ocid": "onboarding.language.select",
                  children: LANGUAGES.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => update("language", lang),
                      className: cn(
                        "px-3 py-2.5 rounded-xl text-sm font-medium text-center transition-smooth border",
                        form.language === lang ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"
                      ),
                      children: lang
                    },
                    lang
                  ))
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8 pt-4 border-t border-border bg-background", children: [
          step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleNext,
              className: "w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated",
              "data-ocid": "onboarding.next_button",
              children: [
                "Continue",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "ml-1" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleFinish,
              disabled: isPending,
              className: "w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated",
              "data-ocid": "onboarding.finish_button",
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                "Setting up..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18 }),
                "Start Using BizBook"
              ] })
            }
          ),
          step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStep((s) => s - 1),
              className: "w-full mt-3 text-sm text-muted-foreground text-center",
              "data-ocid": "onboarding.back_button",
              children: "← Back"
            }
          ),
          step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/dashboard" }),
              className: "w-full mt-3 text-sm text-muted-foreground text-center",
              "data-ocid": "onboarding.skip_button",
              children: "Skip for now"
            }
          )
        ] })
      ]
    }
  );
}
export {
  Onboarding as default
};
