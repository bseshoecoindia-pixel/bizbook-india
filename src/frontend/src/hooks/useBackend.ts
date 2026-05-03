import {
  InvoiceStatus,
  PaymentStatus,
  PurchaseStatus,
  type UserInfo,
  type UserRole,
  createActor,
} from "@/backend";
import type {
  AdminStats,
  Customer,
  DashboardStats,
  Expense,
  ExpenseCategory,
  ExpenseInput,
  Invoice,
  Product,
  Purchase,
  PurchaseId,
  PurchaseInput,
  Supplier,
  SupplierId,
  SupplierInput,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Placeholder data for unauthenticated/dev views ───────────────────────

const PLACEHOLDER_STATS: DashboardStats = {
  todaySales: BigInt(2845000), // ₹28,450.00
  monthlySales: BigInt(45210000), // ₹4,52,100.00
  outstandingPayments: BigInt(11567000), // ₹1,15,670.00
  inventoryValue: BigInt(89340000), // ₹8,93,400.00
  totalCustomers: BigInt(142),
  lowStockCount: BigInt(7),
};

const PLACEHOLDER_INVOICES: Invoice[] = [
  {
    invoiceId: BigInt(1),
    invoiceNumber: "INV-2024-001",
    customerName: "Ravi Shankar Traders",
    customerPhone: "+91 98765 43210",
    status: InvoiceStatus.Sent,
    paymentStatus: PaymentStatus.Unpaid,
    subtotal: BigInt(1200000),
    discount: BigInt(0),
    cgst: BigInt(108000),
    sgst: BigInt(108000),
    total: BigInt(1416000),
    items: [],
    emailSent: false,
    createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    invoiceId: BigInt(2),
    invoiceNumber: "INV-2024-002",
    customerName: "Meena General Store",
    customerPhone: "+91 87654 32109",
    status: InvoiceStatus.Paid,
    paymentStatus: PaymentStatus.Paid,
    subtotal: BigInt(540000),
    discount: BigInt(27000),
    cgst: BigInt(45630),
    sgst: BigInt(45630),
    total: BigInt(603260),
    items: [],
    emailSent: true,
    createdAt: BigInt(Date.now() - 2 * 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    invoiceId: BigInt(3),
    invoiceNumber: "INV-2024-003",
    customerName: "Suresh Kumar & Sons",
    customerPhone: "+91 76543 21098",
    status: InvoiceStatus.Draft,
    paymentStatus: PaymentStatus.Unpaid,
    subtotal: BigInt(320000),
    discount: BigInt(0),
    cgst: BigInt(28800),
    sgst: BigInt(28800),
    total: BigInt(377600),
    items: [],
    emailSent: false,
    createdAt: BigInt(Date.now() - 3 * 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    productId: BigInt(1),
    name: "Basmati Rice Premium (5kg)",
    sku: "GRN-001",
    category: "Groceries",
    purchasePrice: BigInt(42000),
    sellingPrice: BigInt(55000),
    quantity: BigInt(45),
    unit: "Bag",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(2),
    name: "Tata Salt (1kg)",
    sku: "GRN-002",
    category: "Groceries",
    purchasePrice: BigInt(1800),
    sellingPrice: BigInt(2200),
    quantity: BigInt(3),
    unit: "Pcs",
    taxPercent: BigInt(5),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    productId: BigInt(3),
    name: "Surf Excel Detergent (1kg)",
    sku: "HH-001",
    category: "Household",
    purchasePrice: BigInt(9500),
    sellingPrice: BigInt(12000),
    quantity: BigInt(28),
    unit: "Pcs",
    taxPercent: BigInt(18),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

const PLACEHOLDER_CUSTOMERS: Customer[] = [
  {
    customerId: BigInt(1),
    name: "Ravi Shankar Traders",
    phone: "+91 98765 43210",
    email: "ravi@shankartraders.com",
    address: "12, MG Road, Bengaluru - 560001",
    totalPurchaseAmount: BigInt(45600000),
    pendingAmount: BigInt(1416000),
    createdAt: BigInt(Date.now() - 90 * 86400000) * BigInt(1000000),
  },
  {
    customerId: BigInt(2),
    name: "Meena General Store",
    phone: "+91 87654 32109",
    address: "45, Anna Nagar, Chennai - 600040",
    totalPurchaseAmount: BigInt(23400000),
    pendingAmount: BigInt(0),
    createdAt: BigInt(Date.now() - 60 * 86400000) * BigInt(1000000),
  },
  {
    customerId: BigInt(3),
    name: "Suresh Kumar & Sons",
    phone: "+91 76543 21098",
    email: "suresh@sktraders.in",
    address: "78, Connaught Place, New Delhi - 110001",
    gstNumber: "07AABCU9603R1ZX",
    totalPurchaseAmount: BigInt(67800000),
    pendingAmount: BigInt(377600),
    createdAt: BigInt(Date.now() - 120 * 86400000) * BigInt(1000000),
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) return PLACEHOLDER_STATS;
      return actor.getDashboardStats();
    },
    enabled: !isFetching,
    placeholderData: PLACEHOLDER_STATS,
  });
}

export function useInvoices(page = BigInt(1), pageSize = BigInt(20)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["invoices", page.toString(), pageSize.toString()],
    queryFn: async () => {
      if (!actor)
        return {
          items: PLACEHOLDER_INVOICES,
          total: BigInt(3),
          page,
          pageSize,
        };
      return actor.listInvoices(page, pageSize);
    },
    enabled: !isFetching,
  });
}

export function useInvoice(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["invoice", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getInvoice(id);
    },
    enabled: !isFetching && id !== null,
  });
}

export function useProducts(page = BigInt(1), pageSize = BigInt(20)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", page.toString(), pageSize.toString()],
    queryFn: async () => {
      if (!actor)
        return {
          items: PLACEHOLDER_PRODUCTS,
          total: BigInt(3),
          page,
          pageSize,
        };
      return actor.listProducts(page, pageSize);
    },
    enabled: !isFetching,
  });
}

export function useProduct(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getProduct(id);
    },
    enabled: !isFetching && id !== null,
  });
}

export function useCustomers(page = BigInt(1), pageSize = BigInt(20)) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["customers", page.toString(), pageSize.toString()],
    queryFn: async () => {
      if (!actor)
        return {
          items: PLACEHOLDER_CUSTOMERS,
          total: BigInt(3),
          page,
          pageSize,
        };
      return actor.listCustomers(page, pageSize);
    },
    enabled: !isFetching,
  });
}

export function useCustomer(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["customer", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCustomer(id);
    },
    enabled: !isFetching && id !== null,
  });
}

export function useBusinessProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["businessProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBusinessProfile();
    },
    enabled: !isFetching,
  });
}

export function useLowStockProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["lowStockProducts"],
    queryFn: async () => {
      if (!actor)
        return PLACEHOLDER_PRODUCTS.filter((p) => p.quantity <= BigInt(5));
      return actor.getLowStockProducts();
    },
    enabled: !isFetching,
  });
}

export function useCreateInvoice() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["createInvoice"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.createInvoice(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useCreateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["createProduct"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useCreateCustomer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["createCustomer"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCustomer(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useSaveBusinessProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["saveBusinessProfile"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveBusinessProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
  });
}

export function useUpdateBusinessProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["updateBusinessProfile"]>[0],
    ) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBusinessProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
    },
  });
}

export function useUpdateInvoicePaymentStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      paymentStatus,
    }: {
      id: bigint;
      paymentStatus: PaymentStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateInvoicePaymentStatus(id, paymentStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteInvoice() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteInvoice(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProductStock() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      newQty,
      reason,
    }: {
      id: bigint;
      newQty: bigint;
      reason: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProductStock(id, newQty, reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["lowStockProducts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

const PLACEHOLDER_SUPPLIERS: Supplier[] = [
  {
    id: BigInt(1),
    name: "Sharma Enterprises",
    phone: "9820145678",
    email: "sharma@example.com",
    address: "Mumbai, Maharashtra",
    gstNumber: "27AABCS1234A1Z5",
    paymentTerms: "Net 30",
    notes: undefined,
    totalPurchases: BigInt(25000000),
    pendingAmount: BigInt(5000000),
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(2),
    name: "Kumar Textiles",
    phone: "9911223344",
    email: "kumar@kumartextiles.in",
    address: "Chandni Chowk, New Delhi - 110006",
    gstNumber: "07AAACK9876B1Z3",
    paymentTerms: "Net 15",
    notes: undefined,
    totalPurchases: BigInt(18500000),
    pendingAmount: BigInt(2300000),
    createdAt: BigInt(Date.now() - 45 * 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
  {
    id: BigInt(3),
    name: "Patel Distributors",
    phone: "9898765432",
    email: "contact@pateldist.com",
    address: "Raipur, Ahmedabad - 380022",
    gstNumber: "24AABCP5432D1Z8",
    paymentTerms: "Net 45",
    notes: undefined,
    totalPurchases: BigInt(32000000),
    pendingAmount: BigInt(0),
    createdAt: BigInt(Date.now() - 90 * 86400000) * BigInt(1000000),
    updatedAt: BigInt(Date.now()) * BigInt(1000000),
  },
];

// ─── Supplier hooks ────────────────────────────────────────────────────────

export function useSuppliers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      if (!actor) return PLACEHOLDER_SUPPLIERS;
      return actor.listSuppliers();
    },
    enabled: !isFetching,
  });
}

export function useSupplier(id: SupplierId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Supplier | null>({
    queryKey: ["supplier", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getSupplier(id);
    },
    enabled: !isFetching && id !== null,
  });
}

export function useCreateSupplier() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SupplierInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createSupplier(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useUpdateSupplier() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: SupplierId; input: SupplierInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSupplier(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useDeleteSupplier() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: SupplierId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSupplier(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });
}

export function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdminStats | null>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminStats();
    },
    enabled: !isFetching,
    staleTime: 0,
  });
}

export function useListUsers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserInfo[]>({
    queryKey: ["listUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !isFetching,
  });
}

export function useUpdateUserRole() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      principal,
      role,
    }: { principal: UserInfo["principal"]; role: UserRole }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateUserRole(principal, role);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
}

// ─── Expense Hooks ──────────────────────────────────────────────────────────

export function useExpenses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listExpenses();
    },
    enabled: !isFetching,
  });
}

export function useExpensesByCategory(category: ExpenseCategory) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Expense[]>({
    queryKey: ["expenses", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listExpensesByCategory(category);
    },
    enabled: !isFetching,
  });
}

export function useTotalExpenses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["totalExpenses"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalExpenses();
    },
    enabled: !isFetching,
  });
}

export function useCreateExpense() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ExpenseInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createExpense(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenses"] });
    },
  });
}

export function useUpdateExpense() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: ExpenseInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateExpense(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenses"] });
    },
  });
}

export function useDeleteExpense() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteExpense(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenses"] });
    },
  });
}

// ─── Purchase Hooks ──────────────────────────────────────────────────────────

export function usePurchases() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Purchase[]>({
    queryKey: ["purchases"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPurchases();
    },
    enabled: !isFetching,
  });
}

export function useCreatePurchase() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: PurchaseInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPurchase(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
}

export function useUpdatePurchase() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: PurchaseId; input: PurchaseInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updatePurchase(id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
}

export function useDeletePurchase() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: PurchaseId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePurchase(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
  });
}

export function useSendInvoiceEmail() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (invoiceId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendInvoiceEmail(invoiceId);
    },
    onSuccess: (_data, invoiceId) => {
      queryClient.invalidateQueries({
        queryKey: ["invoice", invoiceId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
}
