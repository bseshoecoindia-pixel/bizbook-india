module {
  public type Timestamp = Int;
  public type BusinessId = Principal;
  public type CustomerId = Nat;
  public type ProductId = Nat;
  public type InvoiceId = Nat;
  public type StockUpdateId = Nat;

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
};
