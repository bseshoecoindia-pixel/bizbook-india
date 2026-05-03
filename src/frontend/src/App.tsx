import { AuthLayout, Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import PurchasesPage from "@/pages/Purchases";
import {
  Navigate,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy page imports ────────────────────────────────────────────────────
const SplashPage = lazy(() => import("@/pages/Splash"));
const LoginPage = lazy(() => import("@/pages/Login"));
const OnboardingPage = lazy(() => import("@/pages/Onboarding"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const BillsPage = lazy(() => import("@/pages/Bills"));
const NewBillPage = lazy(() => import("@/pages/NewBill"));
const BillDetailPage = lazy(() => import("@/pages/BillDetail"));
const InventoryPage = lazy(() => import("@/pages/Inventory"));
const NewProductPage = lazy(() => import("@/pages/NewProduct"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const CustomersPage = lazy(() => import("@/pages/Customers"));
const SuppliersPage = lazy(() => import("@/pages/Suppliers"));
const ReportsPage = lazy(() => import("@/pages/Reports"));
const SettingsPage = lazy(() => import("@/pages/Settings"));
const ExpensesPage = lazy(() => import("@/pages/Expenses"));
const AdminPage = lazy(() => import("@/pages/Admin"));

// ─── Page loader fallback ─────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="p-4 space-y-3">
      <Skeleton className="h-8 w-2/3 rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

// ─── Root route ───────────────────────────────────────────────────────────
const rootRoute = createRootRoute();

// ─── Auth layout routes ──────────────────────────────────────────────────
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: AuthLayout,
});

const splashRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/splash",
  component: () => (
    <Wrap>
      <SplashPage />
    </Wrap>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: () => (
    <Wrap>
      <LoginPage />
    </Wrap>
  ),
});

const onboardingRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/onboarding",
  component: () => (
    <Wrap>
      <OnboardingPage />
    </Wrap>
  ),
});

// ─── Main app layout routes ───────────────────────────────────────────────
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Wrap>
      <DashboardPage />
    </Wrap>
  ),
});

const billsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/bills",
  component: () => (
    <Wrap>
      <BillsPage />
    </Wrap>
  ),
});

const newBillRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/bills/new",
  component: () => (
    <Wrap>
      <NewBillPage />
    </Wrap>
  ),
});

const billDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/bills/$id",
  component: () => (
    <Wrap>
      <BillDetailPage />
    </Wrap>
  ),
});

const inventoryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/inventory",
  component: () => (
    <Wrap>
      <InventoryPage />
    </Wrap>
  ),
});

const newProductRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/inventory/new",
  component: () => (
    <Wrap>
      <NewProductPage />
    </Wrap>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/inventory/$id",
  component: () => (
    <Wrap>
      <ProductDetailPage />
    </Wrap>
  ),
});

const customersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/customers",
  component: () => (
    <Wrap>
      <CustomersPage />
    </Wrap>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/reports",
  component: () => (
    <Wrap>
      <ReportsPage />
    </Wrap>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/settings",
  component: () => (
    <Wrap>
      <SettingsPage />
    </Wrap>
  ),
});

const purchasesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/purchases",
  component: () => (
    <Wrap>
      <PurchasesPage />
    </Wrap>
  ),
});
const expensesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/expenses",
  component: () => (
    <Wrap>
      <ExpensesPage />
    </Wrap>
  ),
});
const suppliersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/suppliers",
  component: () => (
    <Wrap>
      <SuppliersPage />
    </Wrap>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/admin",
  component: () => (
    <Wrap>
      <AdminPage />
    </Wrap>
  ),
});

const backupRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/backup",
  component: () => (
    <Wrap>
      <SettingsPage />
    </Wrap>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  authLayoutRoute.addChildren([splashRoute, loginRoute, onboardingRoute]),
  appLayoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    billsRoute,
    newBillRoute,
    billDetailRoute,
    inventoryRoute,
    newProductRoute,
    productDetailRoute,
    customersRoute,
    reportsRoute,
    settingsRoute,
    purchasesRoute,
    expensesRoute,
    suppliersRoute,
    backupRoute,
    adminRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
