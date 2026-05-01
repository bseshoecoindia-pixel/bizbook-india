import { Button } from "@/components/ui/button";
import { useBusinessProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Bell, Menu, Search, TrendingUp } from "lucide-react";

interface HeaderProps {
  onMenuOpen?: () => void;
}

export function Header({ onMenuOpen }: HeaderProps) {
  const { data: profile } = useBusinessProfile();
  const businessName = profile?.name ?? "BizBook India";

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: hamburger + logo + business name */}
        <div className="flex items-center gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            onClick={onMenuOpen}
            aria-label="Open menu"
            data-ocid="header.menu_button"
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <TrendingUp size={14} className="text-primary-foreground" />
            </div>
            <span
              className={cn(
                "font-display font-semibold text-base truncate",
                "text-primary",
              )}
              data-ocid="header.business_name"
            >
              {businessName}
            </span>
          </div>
        </div>

        {/* Right: action icons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground relative"
            aria-label="Search"
            data-ocid="header.search_button"
          >
            <Search size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
            data-ocid="header.notifications_button"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </Button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm ml-1 transition-smooth hover:bg-primary/20"
            aria-label="Profile"
            data-ocid="header.profile_button"
          >
            {businessName.charAt(0).toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
