import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useSaveBusinessProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Phone,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

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
  "Other",
];

const CURRENCIES = [
  "INR - Indian Rupee (₹)",
  "USD - US Dollar ($)",
  "EUR - Euro (€)",
];

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi"];

interface FormData {
  businessName: string;
  category: string;
  gstNumber: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  language: string;
  logoPreview: string | null;
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static step count
          key={i}
          className={cn(
            "rounded-full transition-all duration-300",
            i < current
              ? "w-6 h-2 bg-primary"
              : i === current
                ? "w-8 h-2 bg-primary"
                : "w-2 h-2 bg-border",
          )}
        />
      ))}
    </div>
  );
}

const STEP_TITLES = [
  "About Your Business",
  "Contact Details",
  "Preferences & Logo",
];

export default function Onboarding() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: saveProfile, isPending } = useSaveBusinessProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);

  const [form, setForm] = useState<FormData>({
    businessName: "Ramesh Sharma Traders",
    category: "Wholesale / Distributor",
    gstNumber: "09AABFR1234A1Z5",
    address: "14, Chandni Chowk, Old Delhi - 110006",
    phone: "+91 98100 45678",
    email: "ramesh@sharmatraders.com",
    currency: "INR - Indian Rupee (₹)",
    language: "English",
    logoPreview: null,
  });

  const update = (key: keyof FormData, value: string | null) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleLogoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, logoPreview: preview }));
  };

  const handleNext = () => {
    if (step === 0) {
      if (!form.businessName.trim()) {
        toast.error("Business name is required");
        return;
      }
      if (!form.category) {
        toast.error("Please select a business category");
        return;
      }
    }
    if (step === 1) {
      if (!form.address.trim()) {
        toast.error("Address is required");
        return;
      }
      if (!form.phone.trim()) {
        toast.error("Phone number is required");
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
        gstNumber: form.gstNumber || undefined,
        address: form.address,
        phone: form.phone,
        email: form.email,
        currency: form.currency.split(" ")[0],
        language: form.language,
        logoUrl: undefined,
      });
      toast.success("Business profile saved!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="onboarding.page"
    >
      {/* Header */}
      <div className="px-4 pt-12 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Building2 size={16} className="text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-primary">
            BizBook
          </span>
        </div>
        <div className="text-center mb-4">
          <h2 className="font-display font-bold text-xl text-foreground">
            {STEP_TITLES[step]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step {step + 1} of 3
          </p>
        </div>
        <StepDots current={step} total={3} />
      </div>

      {/* Form body */}
      <div className="flex-1 px-4 pb-6 space-y-4 overflow-y-auto">
        {/* ─── Step 0: Business Info ─────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-4 pt-2" data-ocid="onboarding.step1.panel">
            <div className="space-y-1.5">
              <Label htmlFor="bizName" className="text-sm font-semibold">
                Business Name *
              </Label>
              <Input
                id="bizName"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                placeholder="e.g. Ramesh Sharma Traders"
                className="h-12 rounded-2xl border-border bg-card text-base"
                data-ocid="onboarding.business_name.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">
                Business Category *
              </Label>
              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="onboarding.category.select"
              >
                {BUSINESS_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => update("category", cat)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-smooth border",
                      form.category === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/40",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gst" className="text-sm font-semibold">
                GST Number{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="gst"
                value={form.gstNumber}
                onChange={(e) => update("gstNumber", e.target.value)}
                placeholder="e.g. 09AABFR1234A1Z5"
                className="h-12 rounded-2xl border-border bg-card font-mono text-base"
                data-ocid="onboarding.gst_number.input"
              />
              <p className="text-xs text-muted-foreground">
                15-character GSTIN issued by the Government of India
              </p>
            </div>
          </div>
        )}

        {/* ─── Step 1: Contact Details ───────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-4 pt-2" data-ocid="onboarding.step2.panel">
            <div className="space-y-1.5">
              <Label
                htmlFor="address"
                className="text-sm font-semibold flex items-center gap-1.5"
              >
                <MapPin size={14} className="text-primary" />
                Business Address *
              </Label>
              <textarea
                id="address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Shop No., Street, City - PIN Code"
                rows={3}
                className="w-full px-3 py-3 rounded-2xl border border-border bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="onboarding.address.textarea"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-sm font-semibold flex items-center gap-1.5"
              >
                <Phone size={14} className="text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="h-12 rounded-2xl border-border bg-card text-base"
                data-ocid="onboarding.phone.input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold flex items-center gap-1.5"
              >
                <User size={14} className="text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="business@example.com"
                className="h-12 rounded-2xl border-border bg-card text-base"
                data-ocid="onboarding.email.input"
              />
            </div>
          </div>
        )}

        {/* ─── Step 2: Logo + Preferences ───────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4 pt-2" data-ocid="onboarding.step3.panel">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-1.5">
                <Camera size={14} className="text-primary" />
                Business Logo{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <button
                type="button"
                className="w-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/30 py-8 cursor-pointer hover:border-primary/50 transition-smooth"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload business logo"
                data-ocid="onboarding.logo.dropzone"
              >
                {form.logoPreview ? (
                  <>
                    <img
                      src={form.logoPreview}
                      alt="Logo preview"
                      className="w-20 h-20 rounded-2xl object-cover shadow-card"
                    />
                    <p className="text-xs text-primary font-medium">
                      Tap to change logo
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Upload size={24} className="text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        Upload Business Logo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoSelect}
                data-ocid="onboarding.logo.upload_button"
              />
            </div>

            {/* Currency */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Currency</Label>
              <div
                className="flex flex-col gap-2"
                data-ocid="onboarding.currency.select"
              >
                {CURRENCIES.map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => update("currency", cur)}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm font-medium text-left transition-smooth border flex items-center justify-between",
                      form.currency === cur
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border text-foreground hover:border-primary/40",
                    )}
                  >
                    {cur}
                    {form.currency === cur && (
                      <CheckCircle2 size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Language</Label>
              <div
                className="grid grid-cols-2 gap-2"
                data-ocid="onboarding.language.select"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => update("language", lang)}
                    className={cn(
                      "px-3 py-2.5 rounded-xl text-sm font-medium text-center transition-smooth border",
                      form.language === lang
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/40",
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-4 pb-8 pt-4 border-t border-border bg-background">
        {step < 2 ? (
          <Button
            onClick={handleNext}
            className="w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated"
            data-ocid="onboarding.next_button"
          >
            Continue
            <ChevronRight size={18} className="ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            disabled={isPending}
            className="w-full h-12 rounded-2xl font-display font-semibold text-base shadow-elevated"
            data-ocid="onboarding.finish_button"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Setting up...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} />
                Start Using BizBook
              </span>
            )}
          </Button>
        )}
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="w-full mt-3 text-sm text-muted-foreground text-center"
            data-ocid="onboarding.back_button"
          >
            ← Back
          </button>
        )}
        {step === 0 && (
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="w-full mt-3 text-sm text-muted-foreground text-center"
            data-ocid="onboarding.skip_button"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}
