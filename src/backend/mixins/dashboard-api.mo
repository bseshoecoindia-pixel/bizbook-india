import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import InvoiceLib "../lib/invoice";
import ProductLib "../lib/product";
import CustomerLib "../lib/customer";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : InvoiceLib.State,
  products : ProductLib.ProductState,
  customers : CustomerLib.State,
) {
  public query ({ caller }) func getDashboardStats() : async CommonTypes.DashboardStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    {
      todaySales = InvoiceLib.todaySalesTotal(invoices, now);
      monthlySales = InvoiceLib.monthlySalesTotal(invoices, now);
      outstandingPayments = InvoiceLib.outstandingTotal(invoices);
      inventoryValue = ProductLib.totalInventoryValue(products);
      totalCustomers = customers.size();
      lowStockCount = ProductLib.getLowStock(products, 5).size();
    };
  };
};
