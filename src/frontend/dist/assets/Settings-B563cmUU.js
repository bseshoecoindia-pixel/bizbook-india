import { c as createLucideIcon, r as reactExports, H as useComposedRefs, J as useControllableState, j as jsxRuntimeExports, D as Primitive, E as composeEventHandlers, G as createContextScope, d as cn, am as useBusinessProfile, u as useAuth, o as Receipt, an as Settings$1, ao as Bell, ap as CloudUpload, aq as LogOut, e as ue } from "./index-BOl89Uzk.js";
import { C as Card } from "./card-CX7VVhkd.js";
import { a as usePrevious, u as useSize } from "./index-CzzZAx8a.js";
import { B as Building2 } from "./building-2-B5k5tGKa.js";
import { U as Upload } from "./upload-JiSkRgD-.js";
import { G as Globe } from "./globe-Ba4hfg_0.js";
import { I as IndianRupee } from "./indian-rupee-B7FCt2Py.js";
import { D as Download } from "./download-DICvaxtc.js";
import { C as ChevronRight } from "./chevron-right-0zun3EdD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
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
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function SectionHeader({
  icon: Icon,
  title,
  color = "text-primary"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 px-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: title })
  ] });
}
function SettingsRow({
  icon: Icon,
  label,
  desc,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
  ocid,
  isLast,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: cn(
        "flex items-center gap-3 w-full px-4 py-3.5 hover:bg-muted/40 transition-smooth",
        !isLast && "border-b border-border/50"
      ),
      onClick: onClick ?? (() => ue.info("Coming soon!")),
      "data-ocid": ocid,
      children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "text-muted-foreground" })
      ]
    }
  );
}
function ToggleRow({
  icon: Icon,
  label,
  desc,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
  checked,
  onChange,
  ocid,
  isLast
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3 px-4 py-3.5",
        !isLast && "border-b border-border/50"
      ),
      children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
          desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked, onCheckedChange: onChange, "data-ocid": ocid })
      ]
    }
  );
}
function Settings() {
  const { data: profile } = useBusinessProfile();
  const { logout, isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = reactExports.useState(false);
  const [notifications, setNotifications] = reactExports.useState(true);
  const [autoSync, setAutoSync] = reactExports.useState(true);
  const handleDarkMode = (v) => {
    setDarkMode(v);
    document.documentElement.classList.toggle("dark", v);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0 pb-4", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/50 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Manage your business & app preferences" })
    ] }),
    profile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 shadow-card rounded-2xl border-0 bg-gradient-to-br from-primary/5 via-card to-card mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 22, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground truncate", children: profile.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: profile.category })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono text-[11px]", children: profile.gstNumber ?? "Not set" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Currency: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: profile.currency })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Building2, title: "Business Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Building2,
              label: "Edit Business Profile",
              desc: "Name, address, phone, email",
              iconColor: "text-primary",
              iconBg: "bg-primary/10",
              ocid: "settings.edit_profile_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Upload,
              label: "Change Logo",
              desc: "Upload a new business logo",
              iconColor: "text-blue-600",
              iconBg: "bg-blue-50",
              ocid: "settings.change_logo_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Receipt,
              label: "GST & Tax Settings",
              desc: "Configure rates, CGST/SGST/IGST",
              iconColor: "text-emerald-600",
              iconBg: "bg-emerald-50",
              ocid: "settings.gst_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Settings$1,
              label: "Invoice Template",
              desc: "Customize invoice design",
              iconColor: "text-purple-600",
              iconBg: "bg-purple-50",
              ocid: "settings.invoice_template_button",
              isLast: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Settings$1, title: "App Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              icon: Moon,
              label: "Dark Mode",
              desc: "Switch to dark theme",
              iconColor: "text-indigo-600",
              iconBg: "bg-indigo-50",
              checked: darkMode,
              onChange: handleDarkMode,
              ocid: "settings.dark_mode_toggle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              icon: Bell,
              label: "Notifications",
              desc: "Due reminders & payment alerts",
              iconColor: "text-amber-600",
              iconBg: "bg-amber-50",
              checked: notifications,
              onChange: setNotifications,
              ocid: "settings.notifications_toggle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Globe,
              label: "Language",
              desc: (profile == null ? void 0 : profile.language) ?? "English",
              iconColor: "text-teal-600",
              iconBg: "bg-teal-50",
              ocid: "settings.language_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: IndianRupee,
              label: "Currency",
              desc: (profile == null ? void 0 : profile.currency) ?? "INR",
              iconColor: "text-green-600",
              iconBg: "bg-green-50",
              ocid: "settings.currency_button",
              isLast: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: CloudUpload, title: "Data & Backup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card rounded-2xl border-0 bg-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleRow,
            {
              icon: CloudUpload,
              label: "Auto Cloud Backup",
              desc: "Sync to Internet Computer",
              iconColor: "text-primary",
              iconBg: "bg-primary/10",
              checked: autoSync,
              onChange: setAutoSync,
              ocid: "settings.auto_sync_toggle"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Database,
              label: "Cloud Backup",
              desc: "Backup all your data now",
              iconColor: "text-blue-600",
              iconBg: "bg-blue-50",
              ocid: "settings.backup_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Download,
              label: "Export Data",
              desc: "Download all data as CSV / PDF",
              iconColor: "text-emerald-600",
              iconBg: "bg-emerald-50",
              ocid: "settings.export_button"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingsRow,
            {
              icon: Shield,
              label: "Privacy & Security",
              desc: "Encryption & access control",
              iconColor: "text-purple-600",
              iconBg: "bg-purple-50",
              ocid: "settings.security_button",
              isLast: true
            }
          )
        ] })
      ] }),
      isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            icon: Lock,
            title: "Account",
            color: "text-destructive"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-destructive hover:bg-destructive/5 transition-smooth border border-destructive/20 bg-card",
            onClick: logout,
            "data-ocid": "settings.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15, className: "text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "Sign Out" })
            ]
          }
        )
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
