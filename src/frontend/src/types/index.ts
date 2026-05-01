// Re-export backend types
export type {
  BusinessProfile,
  BusinessProfileInput,
  Customer,
  CustomerInput,
  Invoice,
  InvoiceInput,
  InvoiceItem,
  Product,
  ProductInput,
  DashboardStats,
  PaginatedResult,
  PaginatedResult_1,
  PaginatedResult_2,
  StockUpdate,
  CustomerId,
  ProductId,
  InvoiceId,
  Timestamp,
} from "@/backend";

export { InvoiceStatus, PaymentStatus, UserRole } from "@/backend";

// UI-specific types
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface QuickAction {
  label: string;
  icon: string;
  path: string;
  color: string;
}

export type AppRoute =
  | "/"
  | "/splash"
  | "/login"
  | "/onboarding"
  | "/dashboard"
  | "/bills"
  | "/bills/new"
  | "/inventory"
  | "/customers"
  | "/reports"
  | "/settings";
