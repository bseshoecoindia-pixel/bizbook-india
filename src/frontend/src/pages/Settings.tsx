import type { BusinessProfileInput } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import {
  useBusinessProfile,
  useSaveBusinessProfile,
  useUpdateBusinessProfile,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Building2,
  ChevronDown,
  Circle,
  Globe,
  IndianRupee,
  LogOut,
  Palette,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Section header ────────────────────────────────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  accent = false,
}: {
  icon: React.ElementType;
  title: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-2 px-1">
      <Icon
        size={14}
        className={accent ? "text-destructive" : "text-primary"}
      />
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
    </div>
  );
}

// ─── Form field ────────────────────────────────────────────────────────────
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

// ─── Read-only info row ────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
          iconBg,
        )}
      >
        <Icon size={15} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

export default function Settings() {
  const { data: profile, isLoading: profileLoading } = useBusinessProfile();
  const { logout, isAuthenticated, principal } = useAuth();
  const saveMutation = useSaveBusinessProfile();
  const updateMutation = useUpdateBusinessProfile();

  // ── Theme ──────────────────────────────────────────────────────────────
  type ThemeKey = "light" | "dark" | "sepia" | "high-contrast";
  const THEME_CLASSES: ThemeKey[] = ["light", "dark", "sepia", "high-contrast"];

  const [theme, setTheme] = useState<ThemeKey>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("bizbook-theme") as ThemeKey | null;
    return saved && THEME_CLASSES.includes(saved) ? saved : "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove(...THEME_CLASSES);
    if (theme !== "light") html.classList.add(theme);
    localStorage.setItem("bizbook-theme", theme);
  }, [theme]);

  // ── Language ───────────────────────────────────────────────────────────
  const [language, setLanguage] = useState(
    () => profile?.language ?? "English",
  );

  useEffect(() => {
    if (profile?.language) setLanguage(profile.language);
  }, [profile?.language]);

  // ── Business profile form ──────────────────────────────────────────────
  const [form, setForm] = useState<{
    name: string;
    category: string;
    gstNumber: string;
    address: string;
    phone: string;
    email: string;
  }>({
    name: "",
    category: "",
    gstNumber: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        category: profile.category,
        gstNumber: profile.gstNumber ?? "",
        address: profile.address,
        phone: profile.phone,
        email: profile.email,
      });
    }
  }, [profile]);

  const setField =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSaveProfile = async () => {
    if (!form.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    const input: BusinessProfileInput = {
      name: form.name.trim(),
      category: form.category.trim(),
      gstNumber: form.gstNumber.trim() || undefined,
      address: form.address.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      currency: "INR",
      language,
    };
    try {
      if (profile) {
        await updateMutation.mutateAsync(input);
      } else {
        await saveMutation.mutateAsync(input);
      }
      toast.success("Business profile saved!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const isSaving = saveMutation.isPending || updateMutation.isPending;

  return (
    <div className="flex flex-col gap-0 pb-6" data-ocid="settings.page">
      {/* Page header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/50 bg-card">
        <h2 className="font-display font-bold text-lg text-foreground">
          Settings
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your business &amp; app preferences
        </p>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* ── Section 1: Business Profile ────────────────────────────────── */}
        <div>
          <SectionHeader icon={Building2} title="Business Profile" />
          <Card
            className="shadow-card rounded-2xl border-0 bg-card overflow-hidden p-4 space-y-4"
            data-ocid="settings.business_profile_card"
          >
            {profileLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 rounded-lg bg-muted" />
                ))}
              </div>
            ) : (
              !profile && (
                <div
                  className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200/60 mb-2"
                  data-ocid="settings.profile_empty_state"
                >
                  <Building2 size={14} className="text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700">
                    Business profile not set up yet. Fill in the details below
                    to get started.
                  </p>
                </div>
              )
            )}

            <FormField label="Business Name" required>
              <Input
                value={form.name}
                onChange={setField("name")}
                placeholder="e.g. Sharma Kirana Store"
                className="rounded-xl bg-input/50"
                data-ocid="settings.business_name_input"
              />
            </FormField>

            <FormField label="Business Category">
              <Input
                value={form.category}
                onChange={setField("category")}
                placeholder="e.g. Grocery, Retail, Wholesale"
                className="rounded-xl bg-input/50"
                data-ocid="settings.business_category_input"
              />
            </FormField>

            <FormField label="GST Number (optional)">
              <Input
                value={form.gstNumber}
                onChange={setField("gstNumber")}
                placeholder="e.g. 27AABCU9603R1ZX"
                className="rounded-xl bg-input/50 font-mono text-sm"
                maxLength={15}
                data-ocid="settings.gst_number_input"
              />
            </FormField>

            <FormField label="Phone">
              <Input
                value={form.phone}
                onChange={setField("phone")}
                placeholder="+91 98765 43210"
                className="rounded-xl bg-input/50"
                data-ocid="settings.phone_input"
              />
            </FormField>

            <FormField label="Email">
              <Input
                type="email"
                value={form.email}
                onChange={setField("email")}
                placeholder="business@email.com"
                className="rounded-xl bg-input/50"
                data-ocid="settings.email_input"
              />
            </FormField>

            <FormField label="Address">
              <Input
                value={form.address}
                onChange={setField("address")}
                placeholder="Street, City, State - PIN"
                className="rounded-xl bg-input/50"
                data-ocid="settings.address_input"
              />
            </FormField>

            <Button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSaving || !form.name.trim()}
              className="w-full rounded-xl font-semibold"
              data-ocid="settings.save_profile_button"
            >
              {isSaving
                ? "Saving…"
                : profile
                  ? "Update Profile"
                  : "Save Profile"}
            </Button>
          </Card>
        </div>

        {/* ── Section 2: App Settings ────────────────────────────────────── */}
        <div>
          <SectionHeader icon={Globe} title="App Settings" />
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            {/* Theme selector */}
            <div className="px-4 py-4 border-b border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                  <Palette size={15} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    App Theme
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Choose your display style
                  </p>
                </div>
              </div>
              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="settings.theme_selector"
              >
                {[
                  {
                    key: "light" as const,
                    label: "Light",
                    desc: "Clean & bright",
                    bg: "#f5f5fb",
                    fg: "#1a1a2e",
                    accent: "#16a085",
                  },
                  {
                    key: "dark" as const,
                    label: "Dark",
                    desc: "Easy on eyes",
                    bg: "#181820",
                    fg: "#e8e8ef",
                    accent: "#5bc8a8",
                  },
                  {
                    key: "sepia" as const,
                    label: "Sepia",
                    desc: "Warm & cozy",
                    bg: "#f5efe4",
                    fg: "#3b2c1a",
                    accent: "#7ab8a8",
                  },
                  {
                    key: "high-contrast" as const,
                    label: "High Contrast",
                    desc: "Maximum clarity",
                    bg: "#0f0f0f",
                    fg: "#fafafa",
                    accent: "#e8c22a",
                  },
                ].map(({ key, label, desc, bg, fg, accent }) => {
                  const active = theme === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTheme(key)}
                      data-ocid={`settings.theme_option_${key}`}
                      className={cn(
                        "relative flex flex-col items-start p-3 rounded-2xl border-2 transition-smooth text-left",
                        active
                          ? "border-primary bg-primary/5 shadow-card"
                          : "border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50",
                      )}
                    >
                      {/* Preview swatch */}
                      <div
                        className="w-full h-10 rounded-xl mb-2.5 flex items-center justify-center gap-1.5 overflow-hidden"
                        style={{ backgroundColor: bg }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <div
                          className="h-2 rounded-full flex-1 max-w-[40px] opacity-60"
                          style={{ backgroundColor: fg }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-foreground leading-tight">
                        {label}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {desc}
                      </p>
                      {active && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Circle
                            size={8}
                            className="text-primary-foreground fill-primary-foreground"
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Globe size={15} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Language</p>
                <p className="text-xs text-muted-foreground">
                  Display language
                </p>
              </div>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none text-sm font-medium text-foreground bg-muted/50 border border-border/50 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                  data-ocid="settings.language_select"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>
            </div>

            {/* Currency — read only */}
            <InfoRow
              icon={IndianRupee}
              label="Currency"
              value="INR — Indian Rupee (locked)"
              iconColor="text-green-600"
              iconBg="bg-green-500/10"
            />
          </Card>
        </div>

        {/* ── Section 3: Account ─────────────────────────────────────────── */}
        <div>
          <SectionHeader icon={Shield} title="Account" accent />
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            {/* Identity info */}
            {principal && (
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/50">
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <User size={15} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Internet Identity
                  </p>
                  <p
                    className="text-xs font-mono text-foreground truncate"
                    title={principal}
                  >
                    {principal.slice(0, 12)}…{principal.slice(-6)}
                  </p>
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <button
                type="button"
                className="flex items-center gap-3 w-full px-4 py-3.5 text-destructive hover:bg-destructive/5 transition-smooth"
                onClick={logout}
                data-ocid="settings.logout_button"
              >
                <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <LogOut size={15} className="text-destructive" />
                </div>
                <span className="font-semibold text-sm">Sign Out</span>
              </button>
            ) : (
              <div className="px-4 py-3.5">
                <p className="text-sm text-muted-foreground">Not signed in.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground py-2">
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
