module {
  public type Timestamp = Int;
  public type BusinessId = Principal;
  public type CustomerId = Nat;
  public type ProductId = Nat;
  public type InvoiceId = Nat;
  public type StockUpdateId = Nat;
  public type SupplierId = Nat;
  public type ExpenseId = Nat;
  public type PurchaseId = Nat;

  public type UserRole = { #owner; #staff; #accountant };

  public type UserInfo = {
    principal : Principal;
    email : Text;
    role : UserRole;
    createdAt : Timestamp;
    isActive : Bool;
  };

  public type PaymentStatus = { #Unpaid; #Partial; #Paid };
  public type InvoiceStatus = { #Draft; #Sent; #Paid };

  public type DashboardStats = {
    todaySales : Nat;
    monthlySales : Nat;
    outstandingPayments : Nat;
    inventoryValue : Nat;
    totalCustomers : Nat;
    lowStockCount : Nat;
  };

  public type PaginatedResult<T> = {
    items : [T];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };

  public type AdminStats = {
    totalUsers : Nat;
    activeUsers : Nat;
    totalRevenue : Int;
    totalExpenses : Int;
    netPL : Int;
    invoiceCount : Nat;
    customerCount : Nat;
    supplierCount : Nat;
    expenseCount : Nat;
    topMonthRevenue : Int;
    currentMonthRevenue : Int;
  };
};
