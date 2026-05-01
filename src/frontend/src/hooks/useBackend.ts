import { createActor } from "@/backend";
import type { Customer, DashboardStats, Invoice, Product } from "@/backend";
import { InvoiceStatus, PaymentStatus } from "@/backend";
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
