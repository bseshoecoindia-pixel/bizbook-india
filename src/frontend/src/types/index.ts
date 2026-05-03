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
  Supplier,
  SupplierInput,
  DashboardStats,
  PaginatedResult,
  PaginatedResult_1,
  PaginatedResult_2,
  StockUpdate,
  CustomerId,
  ProductId,
  InvoiceId,
  SupplierId,
  Timestamp,
  Expense,
  ExpenseInput,
  ExpenseId,
  Purchase,
  PurchaseInput,
  PurchaseId,
} from "@/backend";

export {
  InvoiceStatus,
  PaymentStatus,
  UserRole,
  ExpenseCategory,
  PurchaseStatus,
} from "@/backend";

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
  | "/suppliers"
  | "/reports"
  | "/settings"
  | "/expenses"
  | "/purchases";
