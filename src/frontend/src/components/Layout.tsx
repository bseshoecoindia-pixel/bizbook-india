import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { Header } from "@/components/Header";
import { SideDrawer } from "@/components/SideDrawer";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile-first: max 480px centered */}
      <div className="w-full max-w-[480px] mx-auto flex flex-col min-h-screen relative bg-background shadow-[0_0_40px_0_rgba(0,0,0,0.08)]">
        <Header onMenuOpen={() => setDrawerOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-20">
          <Outlet />
        </main>

        <BottomNav />
        <FAB />
      </div>

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

// Auth-free layout for login/onboarding screens
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-[480px] mx-auto flex flex-col min-h-screen bg-background shadow-[0_0_40px_0_rgba(0,0,0,0.08)]">
        <Outlet />
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
