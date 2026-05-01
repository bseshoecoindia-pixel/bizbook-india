import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";

interface NavTab {
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
}

const NAV_TABS: NavTab[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
    ocid: "bottom_nav.dashboard_tab",
  },
  {
    label: "Bills",
    path: "/bills",
    icon: <FileText size={20} />,
    ocid: "bottom_nav.bills_tab",
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: <Package size={20} />,
    ocid: "bottom_nav.inventory_tab",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <Users size={20} />,
    ocid: "bottom_nav.customers_tab",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <BarChart3 size={20} />,
    ocid: "bottom_nav.reports_tab",
  },
];

// Tabs: 2 left | FAB slot (center) | 3 right — always 6 columns
const LEFT_TABS = NAV_TABS.slice(0, 2);
const RIGHT_TABS = NAV_TABS.slice(2); // Inventory, Customers, Reports

function NavTabLink({ tab }: { tab: NavTab }) {
  return (
    <Link
      to={tab.path}
      className="relative flex flex-col items-center justify-center gap-0.5 w-full h-full transition-smooth"
      activeProps={{ className: "text-primary" }}
      inactiveProps={{ className: "text-muted-foreground" }}
      data-ocid={tab.ocid}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <span className={cn("transition-smooth", isActive && "text-primary")}>
            {tab.icon}
          </span>
          <span
            className={cn(
              "text-[10px] font-medium leading-none",
              isActive && "text-primary",
            )}
          >
            {tab.label}
          </span>
          {isActive && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-primary" />
          )}
        </>
      )}
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-elevated safe-area-pb"
      aria-label="Main navigation"
      data-ocid="bottom_nav"
    >
      {/* 6-column grid: col 1-2 = left tabs, col 3 = FAB slot, col 4-6 = right tabs */}
      <div className="max-w-[480px] mx-auto grid grid-cols-6 items-stretch h-16">
        {LEFT_TABS.map((tab) => (
          <div key={tab.path} className="flex items-stretch">
            <NavTabLink tab={tab} />
          </div>
        ))}

        {/* Center FAB slot — empty, FAB floats above this */}
        <div className="pointer-events-none" aria-hidden="true" />

        {RIGHT_TABS.map((tab) => (
          <div key={tab.path} className="flex items-stretch">
            <NavTabLink tab={tab} />
          </div>
        ))}
      </div>
    </nav>
  );
}
