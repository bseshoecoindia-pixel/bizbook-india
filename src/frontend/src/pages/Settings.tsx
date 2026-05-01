import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useBusinessProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building2,
  ChevronRight,
  CloudUpload,
  Database,
  Download,
  Globe,
  IndianRupee,
  Lock,
  LogOut,
  Moon,
  Receipt,
  Settings as SettingsIcon,
  Shield,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Section header ────────────────────────────────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  color = "text-primary",
}: {
  icon: React.ElementType;
  title: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-2 px-1">
      <Icon size={14} className={color} />
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
    </div>
  );
}

// ─── Settings row (nav item with arrow) ───────────────────────────────────
interface SettingsRowProps {
  icon: React.ElementType;
  label: string;
  desc?: string;
  iconColor?: string;
  iconBg?: string;
  ocid: string;
  isLast?: boolean;
  onClick?: () => void;
}

function SettingsRow({
  icon: Icon,
  label,
  desc,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted",
  ocid,
  isLast,
  onClick,
}: SettingsRowProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3.5 hover:bg-muted/40 transition-smooth",
        !isLast && "border-b border-border/50",
      )}
      onClick={onClick ?? (() => toast.info("Coming soon!"))}
      data-ocid={ocid}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
          iconBg,
        )}
      >
        <Icon size={15} className={iconColor} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </div>
      <ChevronRight size={16} className="text-muted-foreground" />
    </button>
  );
}

// ─── Settings row with toggle ──────────────────────────────────────────────
interface ToggleRowProps {
  icon: React.ElementType;
  label: string;
  desc?: string;
  iconColor?: string;
  iconBg?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
  isLast?: boolean;
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
  isLast,
}: ToggleRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3.5",
        !isLast && "border-b border-border/50",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
          iconBg,
        )}
      >
        <Icon size={15} className={iconColor} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} data-ocid={ocid} />
    </div>
  );
}

export default function Settings() {
  const { data: profile } = useBusinessProfile();
  const { logout, isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleDarkMode = (v: boolean) => {
    setDarkMode(v);
    document.documentElement.classList.toggle("dark", v);
  };

  return (
    <div className="flex flex-col gap-0 pb-4" data-ocid="settings.page">
      {/* Page header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/50 bg-card">
        <h2 className="font-display font-bold text-lg text-foreground">
          Settings
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your business & app preferences
        </p>
      </div>

      {/* Business profile summary card */}
      {profile && (
        <div className="px-4 pt-4">
          <Card className="p-4 shadow-card rounded-2xl border-0 bg-gradient-to-br from-primary/5 via-card to-card mb-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-base text-foreground truncate">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {profile.category}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">GST: </span>
                <span className="font-medium text-foreground font-mono text-[11px]">
                  {profile.gstNumber ?? "Not set"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Currency: </span>
                <span className="font-medium text-foreground">
                  {profile.currency}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="px-4 pt-4 space-y-4">
        {/* ── Business Settings ──────────────────────────────────────── */}
        <div>
          <SectionHeader icon={Building2} title="Business Settings" />
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            <SettingsRow
              icon={Building2}
              label="Edit Business Profile"
              desc="Name, address, phone, email"
              iconColor="text-primary"
              iconBg="bg-primary/10"
              ocid="settings.edit_profile_button"
            />
            <SettingsRow
              icon={Upload}
              label="Change Logo"
              desc="Upload a new business logo"
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              ocid="settings.change_logo_button"
            />
            <SettingsRow
              icon={Receipt}
              label="GST & Tax Settings"
              desc="Configure rates, CGST/SGST/IGST"
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50"
              ocid="settings.gst_button"
            />
            <SettingsRow
              icon={SettingsIcon}
              label="Invoice Template"
              desc="Customize invoice design"
              iconColor="text-purple-600"
              iconBg="bg-purple-50"
              ocid="settings.invoice_template_button"
              isLast
            />
          </Card>
        </div>

        {/* ── App Settings ───────────────────────────────────────────── */}
        <div>
          <SectionHeader icon={SettingsIcon} title="App Settings" />
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            <ToggleRow
              icon={Moon}
              label="Dark Mode"
              desc="Switch to dark theme"
              iconColor="text-indigo-600"
              iconBg="bg-indigo-50"
              checked={darkMode}
              onChange={handleDarkMode}
              ocid="settings.dark_mode_toggle"
            />
            <ToggleRow
              icon={Bell}
              label="Notifications"
              desc="Due reminders & payment alerts"
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
              checked={notifications}
              onChange={setNotifications}
              ocid="settings.notifications_toggle"
            />
            <SettingsRow
              icon={Globe}
              label="Language"
              desc={profile?.language ?? "English"}
              iconColor="text-teal-600"
              iconBg="bg-teal-50"
              ocid="settings.language_button"
            />
            <SettingsRow
              icon={IndianRupee}
              label="Currency"
              desc={profile?.currency ?? "INR"}
              iconColor="text-green-600"
              iconBg="bg-green-50"
              ocid="settings.currency_button"
              isLast
            />
          </Card>
        </div>

        {/* ── Data & Backup ──────────────────────────────────────────── */}
        <div>
          <SectionHeader icon={CloudUpload} title="Data & Backup" />
          <Card className="shadow-card rounded-2xl border-0 bg-card overflow-hidden">
            <ToggleRow
              icon={CloudUpload}
              label="Auto Cloud Backup"
              desc="Sync to Internet Computer"
              iconColor="text-primary"
              iconBg="bg-primary/10"
              checked={autoSync}
              onChange={setAutoSync}
              ocid="settings.auto_sync_toggle"
            />
            <SettingsRow
              icon={Database}
              label="Cloud Backup"
              desc="Backup all your data now"
              iconColor="text-blue-600"
              iconBg="bg-blue-50"
              ocid="settings.backup_button"
            />
            <SettingsRow
              icon={Download}
              label="Export Data"
              desc="Download all data as CSV / PDF"
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50"
              ocid="settings.export_button"
            />
            <SettingsRow
              icon={Shield}
              label="Privacy & Security"
              desc="Encryption & access control"
              iconColor="text-purple-600"
              iconBg="bg-purple-50"
              ocid="settings.security_button"
              isLast
            />
          </Card>
        </div>

        {/* ── Account ────────────────────────────────────────────────── */}
        {isAuthenticated && (
          <div>
            <SectionHeader
              icon={Lock}
              title="Account"
              color="text-destructive"
            />
            <button
              type="button"
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-destructive hover:bg-destructive/5 transition-smooth border border-destructive/20 bg-card"
              onClick={logout}
              data-ocid="settings.logout_button"
            >
              <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <LogOut size={15} className="text-destructive" />
              </div>
              <span className="font-semibold text-sm">Sign Out</span>
            </button>
          </div>
        )}

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
