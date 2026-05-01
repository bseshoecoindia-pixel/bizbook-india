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
export type Timestamp = bigint;
export interface PaginatedResult_1 {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Invoice>;
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
export type StockUpdateId = bigint;
export interface PaginatedResult_2 {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Customer>;
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
    items: Array<InvoiceItem>;
    subtotal: bigint;
}
export interface DashboardStats {
    todaySales: bigint;
    monthlySales: bigint;
    lowStockCount: bigint;
    inventoryValue: bigint;
    outstandingPayments: bigint;
    totalCustomers: bigint;
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
export type CustomerId = bigint;
export interface PaginatedResult {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    items: Array<Product>;
}
export type InvoiceId = bigint;
export type ProductId = bigint;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCustomer(input: CustomerInput): Promise<Customer>;
    createInvoice(input: InvoiceInput): Promise<Invoice>;
    createProduct(input: ProductInput): Promise<Product>;
    deleteBusinessProfile(): Promise<boolean>;
    deleteCustomer(id: CustomerId): Promise<boolean>;
    deleteInvoice(id: InvoiceId): Promise<boolean>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getBusinessProfile(): Promise<BusinessProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomer(id: CustomerId): Promise<Customer | null>;
    getDashboardStats(): Promise<DashboardStats>;
    getInvoice(id: InvoiceId): Promise<Invoice | null>;
    getInvoicesByCustomer(customerId: CustomerId): Promise<Array<Invoice>>;
    getInvoicesByStatus(status: InvoiceStatus): Promise<Array<Invoice>>;
    getLowStockProducts(): Promise<Array<Product>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getStockHistory(id: ProductId): Promise<Array<StockUpdate>>;
    initSeedData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listCustomers(page: bigint, pageSize: bigint): Promise<PaginatedResult_2>;
    listInvoices(page: bigint, pageSize: bigint): Promise<PaginatedResult_1>;
    listProducts(page: bigint, pageSize: bigint): Promise<PaginatedResult>;
    saveBusinessProfile(input: BusinessProfileInput): Promise<BusinessProfile>;
    updateBusinessProfile(input: BusinessProfileInput): Promise<BusinessProfile | null>;
    updateCustomer(id: CustomerId, input: CustomerInput): Promise<Customer | null>;
    updateInvoice(id: InvoiceId, input: InvoiceInput): Promise<Invoice | null>;
    updateInvoicePaymentStatus(id: InvoiceId, paymentStatus: PaymentStatus): Promise<Invoice | null>;
    updateProduct(id: ProductId, input: ProductInput): Promise<Product | null>;
    updateProductStock(id: ProductId, newQty: bigint, reason: string): Promise<StockUpdate | null>;
}
