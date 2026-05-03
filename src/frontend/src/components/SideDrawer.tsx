import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useBusinessProfile } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  CloudUpload,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  Settings,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

interface DrawerItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  ocid: string;
}

const DRAWER_ITEMS: DrawerItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
    ocid: "drawer.dashboard_link",
  },
  {
    label: "Sales / Bills",
    path: "/bills",
    icon: <Receipt size={18} />,
    ocid: "drawer.sales_link",
  },
  {
    label: "Purchases",
    path: "/purchases",
    icon: <ShoppingCart size={18} />,
    ocid: "drawer.purchases_link",
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: <DollarSign size={18} />,
    ocid: "drawer.expenses_link",
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: <Package size={18} />,
    ocid: "drawer.inventory_link",
  },
  {
    label: "Customers",
    path: "/customers",
    icon: <Users size={18} />,
    ocid: "drawer.customers_link",
  },
  {
    label: "Suppliers",
    path: "/suppliers",
    icon: <Truck size={18} />,
    ocid: "drawer.suppliers_link",
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <BarChart3 size={18} />,
    ocid: "drawer.reports_link",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <Settings size={18} />,
    ocid: "drawer.settings_link",
  },
  {
    label: "Backup & Restore",
    path: "/backup",
    icon: <CloudUpload size={18} />,
    ocid: "drawer.backup_link",
  },
  {
    label: "Admin Panel",
    path: "/admin",
    icon: <ShieldCheck size={18} />,
    ocid: "drawer.admin_link",
  },
];

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { logout, isAuthenticated } = useAuth();
  const { data: profile } = useBusinessProfile();
  const businessName = profile?.name ?? "BizBook India";
  const businessCategory = profile?.category ?? "Retail Business";

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="left"
        className="w-72 p-0 flex flex-col"
        data-ocid="drawer.sheet"
      >
        <SheetHeader className="p-0">
          {/* Business identity block */}
          <div className="bg-primary px-5 pt-10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 border border-primary-foreground/30 flex items-center justify-center">
                <TrendingUp size={20} className="text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-primary-foreground text-base truncate">
                  {businessName}
                </p>
                <p className="text-primary-foreground/70 text-xs truncate">
                  {businessCategory}
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        {/* Nav items */}
        <nav
          className="flex-1 overflow-y-auto py-3"
          aria-label="Drawer navigation"
        >
          {DRAWER_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-smooth",
                "text-foreground hover:bg-muted hover:text-primary",
              )}
              activeProps={{
                className:
                  "text-primary bg-primary/5 border-r-2 border-primary",
              }}
              data-ocid={item.ocid}
            >
              <span className="text-muted-foreground">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <Separator />

        {/* Logout */}
        <div className="p-3">
          <button
            type="button"
            className={cn(
              "flex items-center gap-3 w-full px-5 py-3 rounded-lg text-sm font-medium",
              "text-destructive hover:bg-destructive/10 transition-smooth",
            )}
            onClick={() => {
              if (isAuthenticated) logout();
              onClose();
            }}
            data-ocid="drawer.logout_button"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
