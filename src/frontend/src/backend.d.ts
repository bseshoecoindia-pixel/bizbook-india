import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvoiceInput {
    customerName: string;
    status: InvoiceStatus;
    total: bigint;
    paymentStatus: PaymentStatus;
    customerPhone: string;
    cgst: bigint;
    sgst: bigint;
    dueDate?: Timestamp;
    notes?: string;
    discount: bigint;
    customerId?: CustomerId;
    items: Array<InvoiceItem>;
    subtotal: bigint;
}
export type Timestamp = bigint;
export interface PaginatedResult_1 {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Invoice>;
}
export interface PurchaseInput {
    status: PurchaseStatus;
    supplierName: string;
    date: Timestamp;
    description?: string;
    amount: bigint;
    supplierId?: SupplierId;
}
export type StockUpdateId = bigint;
export interface PaginatedResult_2 {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Customer>;
}
export interface UserInfo {
    principal: Principal;
    createdAt: Timestamp;
    role: UserRole;
    isActive: boolean;
    email: string;
}
export interface CustomerInput {
    gstNumber?: string;
    name: string;
    email?: string;
    address?: string;
    phone: string;
}
export type BusinessId = Principal;
export interface StockUpdate {
    changedAt: Timestamp;
    productId: ProductId;
    productName: string;
    newQty: bigint;
    updateId: StockUpdateId;
    previousQty: bigint;
    changeReason: string;
}
export interface PaginatedResult {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Product>;
}
export type SupplierId = bigint;
export interface Purchase {
    id: PurchaseId;
    status: PurchaseStatus;
    supplierName: string;
    date: Timestamp;
    createdAt: Timestamp;
    description?: string;
    amount: bigint;
    supplierId?: SupplierId;
}
export interface ExpenseInput {
    receiptUrl?: string;
    date: Timestamp;
    description: string;
    notes?: string;
    category: ExpenseCategory;
    amount: bigint;
}
export interface ProductInput {
    sku: string;
    purchasePrice: bigint;
    taxPercent: bigint;
    supplierName?: string;
    name: string;
    unit: string;
    sellingPrice: bigint;
    imageUrl?: string;
    barcode?: string;
    quantity: bigint;
    category: string;
}
export interface InvoiceItem {
    taxPercent: bigint;
    lineTotal: bigint;
    productId?: ProductId;
    productName: string;
    discount: bigint;
    quantity: bigint;
    unitPrice: bigint;
}
export interface BusinessProfileInput {
    gstNumber?: string;
    name: string;
    email: string;
    language: string;
    logoUrl?: string;
    currency: string;
    address: string;
    category: string;
    phone: string;
}
export interface Invoice {
    customerName: string;
    status: InvoiceStatus;
    total: bigint;
    paymentStatus: PaymentStatus;
    customerPhone: string;
    cgst: bigint;
    createdAt: Timestamp;
    sgst: bigint;
    dueDate?: Timestamp;
    invoiceId: InvoiceId;
    updatedAt: Timestamp;
    invoiceNumber: string;
    notes?: string;
    discount: bigint;
    customerId?: CustomerId;
    emailSent: boolean;
    items: Array<InvoiceItem>;
    subtotal: bigint;
}
export interface Expense {
    id: ExpenseId;
    receiptUrl?: string;
    date: Timestamp;
    createdAt: Timestamp;
    description: string;
    updatedAt: Timestamp;
    notes?: string;
    category: ExpenseCategory;
    amount: bigint;
}
export interface DashboardStats {
    todaySales: bigint;
    monthlySales: bigint;
    lowStockCount: bigint;
    inventoryValue: bigint;
    outstandingPayments: bigint;
    totalCustomers: bigint;
}
export interface SupplierInput {
    gstNumber?: string;
    name: string;
    email?: string;
    address?: string;
    notes?: string;
    paymentTerms?: string;
    phone: string;
}
export interface Customer {
    gstNumber?: string;
    name: string;
    createdAt: Timestamp;
    email?: string;
    address?: string;
    customerId: CustomerId;
    phone: string;
    pendingAmount: bigint;
    totalPurchaseAmount: bigint;
}
export interface AdminStats {
    activeUsers: bigint;
    supplierCount: bigint;
    expenseCount: bigint;
    invoiceCount: bigint;
    currentMonthRevenue: bigint;
    topMonthRevenue: bigint;
    totalExpenses: bigint;
    netPL: bigint;
    totalUsers: bigint;
    customerCount: bigint;
    totalRevenue: bigint;
}
export type CustomerId = bigint;
export type ExpenseId = bigint;
export type PurchaseId = bigint;
export type InvoiceId = bigint;
export type ProductId = bigint;
export interface Supplier {
    id: SupplierId;
    gstNumber?: string;
    name: string;
    createdAt: Timestamp;
    email?: string;
    totalPurchases: bigint;
    updatedAt: Timestamp;
    address?: string;
    notes?: string;
    paymentTerms?: string;
    phone: string;
    pendingAmount: bigint;
}
export interface BusinessProfile {
    businessId: BusinessId;
    gstNumber?: string;
    name: string;
    email: string;
    language: string;
    logoUrl?: string;
    currency: string;
    address: string;
    category: string;
    phone: string;
}
export interface Product {
    sku: string;
    purchasePrice: bigint;
    taxPercent: bigint;
    supplierName?: string;
    name: string;
    createdAt: Timestamp;
    unit: string;
    sellingPrice: bigint;
    productId: ProductId;
    imageUrl?: string;
    barcode?: string;
    quantity: bigint;
    category: string;
}
export enum ExpenseCategory {
    other = "other",
    marketing = "marketing",
    rent = "rent",
    transport = "transport",
    utilities = "utilities",
    office = "office",
    rawMaterials = "rawMaterials",
    salaries = "salaries"
}
export enum InvoiceStatus {
    Paid = "Paid",
    Sent = "Sent",
    Draft = "Draft"
}
export enum PaymentStatus {
    Paid = "Paid",
    Unpaid = "Unpaid",
    Partial_ = "Partial"
}
export enum PurchaseStatus {
    cancelled = "cancelled",
    ordered = "ordered",
    received = "received"
}
export enum UserRole {
    accountant = "accountant",
    owner = "owner",
    staff = "staff"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    createCustomer(input: CustomerInput): Promise<Customer>;
    createExpense(input: ExpenseInput): Promise<Expense>;
    createInvoice(input: InvoiceInput): Promise<Invoice>;
    createProduct(input: ProductInput): Promise<Product>;
    createPurchase(input: PurchaseInput): Promise<Purchase>;
    createSupplier(input: SupplierInput): Promise<Supplier>;
    deleteBusinessProfile(): Promise<boolean>;
    deleteCustomer(id: CustomerId): Promise<boolean>;
    deleteExpense(id: ExpenseId): Promise<boolean>;
    deleteInvoice(id: InvoiceId): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    deletePurchase(id: PurchaseId): Promise<boolean>;
    deleteSupplier(id: SupplierId): Promise<boolean>;
    getAdminStats(): Promise<AdminStats>;
    getBusinessProfile(): Promise<BusinessProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCustomer(id: CustomerId): Promise<Customer | null>;
    getDashboardStats(): Promise<DashboardStats>;
    getExpense(id: ExpenseId): Promise<Expense | null>;
    getInvoice(id: InvoiceId): Promise<Invoice | null>;
    getInvoicesByCustomer(customerId: CustomerId): Promise<Array<Invoice>>;
    getInvoicesByStatus(status: InvoiceStatus): Promise<Array<Invoice>>;
    getLowStockProducts(): Promise<Array<Product>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getPurchase(id: PurchaseId): Promise<Purchase | null>;
    getStockHistory(id: ProductId): Promise<Array<StockUpdate>>;
    getSupplier(id: SupplierId): Promise<Supplier | null>;
    getTotalExpenses(): Promise<bigint>;
    getUserByPrincipal(p: Principal): Promise<UserInfo | null>;
    initSeedData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listCustomers(page: bigint, pageSize: bigint): Promise<PaginatedResult_2>;
    listExpenses(): Promise<Array<Expense>>;
    listExpensesByCategory(category: ExpenseCategory): Promise<Array<Expense>>;
    listInvoices(page: bigint, pageSize: bigint): Promise<PaginatedResult_1>;
    listProducts(page: bigint, pageSize: bigint): Promise<PaginatedResult>;
    listPurchases(): Promise<Array<Purchase>>;
    listPurchasesByStatus(status: PurchaseStatus): Promise<Array<Purchase>>;
    listPurchasesBySupplier(supplierId: SupplierId): Promise<Array<Purchase>>;
    listSuppliers(): Promise<Array<Supplier>>;
    listUsers(): Promise<Array<UserInfo>>;
    recordSupplierPayment(id: SupplierId, amount: bigint): Promise<boolean>;
    recordSupplierPurchase(id: SupplierId, amount: bigint): Promise<boolean>;
    saveBusinessProfile(input: BusinessProfileInput): Promise<BusinessProfile>;
    sendInvoiceEmail(invoiceId: InvoiceId): Promise<boolean>;
    updateBusinessProfile(input: BusinessProfileInput): Promise<BusinessProfile | null>;
    updateCustomer(id: CustomerId, input: CustomerInput): Promise<Customer | null>;
    updateExpense(id: ExpenseId, input: ExpenseInput): Promise<Expense | null>;
    updateInvoice(id: InvoiceId, input: InvoiceInput): Promise<Invoice | null>;
    updateInvoicePaymentStatus(id: InvoiceId, paymentStatus: PaymentStatus): Promise<Invoice | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
    updateProductStock(id: ProductId, newQty: bigint, reason: string): Promise<StockUpdate | null>;
    updatePurchase(id: PurchaseId, input: PurchaseInput): Promise<Purchase | null>;
    updateSupplier(id: SupplierId, input: SupplierInput): Promise<Supplier | null>;
    updateUserRole(p: Principal, role: UserRole): Promise<UserInfo | null>;
}
