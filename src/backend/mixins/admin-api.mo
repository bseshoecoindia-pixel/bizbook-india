import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import AdminLib "../lib/admin";
import InvoiceTypes "../types/invoice";
import CustomerTypes "../types/customer";
import SupplierTypes "../types/supplier";
import ExpenseTypes "../types/expense";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  invoices : List.List<InvoiceTypes.Invoice>,
  customers : List.List<CustomerTypes.Customer>,
  suppliers : List.List<SupplierTypes.Supplier>,
  expenses : List.List<ExpenseTypes.Expense>,
  users : List.List<CommonTypes.UserInfo>,
  totalUsers : { var val : Nat },
  activeUsers : { var val : Nat },
) {

  public query ({ caller }) func listUsers() : async [CommonTypes.UserInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.listUsers(users);
  };

  public query ({ caller }) func getUserByPrincipal(p : Principal) : async ?CommonTypes.UserInfo {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.getUserByPrincipal(users, p);
  };

  public shared ({ caller }) func updateUserRole(p : Principal, role : CommonTypes.UserRole) : async ?CommonTypes.UserInfo {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AdminLib.updateUserRole(users, p, role);
  };

  public query ({ caller }) func getAdminStats() : async CommonTypes.AdminStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let dayNs : Int = 86_400_000_000_000;
    let now = Time.now();
    let monthStart = now - (30 * dayNs);

    // Total revenue: sum of all paid invoice totals
    let totalRevenue : Int = invoices.foldLeft<Int, InvoiceTypes.Invoice>(0, func(acc, inv) {
      switch (inv.paymentStatus) {
        case (#Paid) acc + inv.total;
        case _ acc;
      };
    });

    // Current month revenue: paid invoices in last 30 days
    let currentMonthRevenue : Int = invoices.foldLeft<Int, InvoiceTypes.Invoice>(0, func(acc, inv) {
      switch (inv.paymentStatus) {
        case (#Paid) {
          if (inv.updatedAt >= monthStart) acc + inv.total else acc;
        };
        case _ acc;
      };
    });

    // Top month revenue: same as current for now (no multi-month grouping without Map)
    let topMonthRevenue : Int = currentMonthRevenue;

    // Total expenses
    let totalExpenses : Int = expenses.foldLeft<Int, ExpenseTypes.Expense>(0, func(acc, e) { acc + e.amount });

    AdminLib.getAdminStats(
      suppliers.size(),
      expenses.size(),
      invoices.size(),
      customers.size(),
      totalRevenue,
      totalExpenses,
      totalUsers.val,
      activeUsers.val,
      topMonthRevenue,
      currentMonthRevenue,
    );
  };
};
