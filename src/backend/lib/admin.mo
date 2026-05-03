import CommonTypes "../types/common";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  public func listUsers(users : List.List<CommonTypes.UserInfo>) : [CommonTypes.UserInfo] {
    users.toArray();
  };

  public func getUserByPrincipal(users : List.List<CommonTypes.UserInfo>, p : Principal) : ?CommonTypes.UserInfo {
    users.find(func(u) { Principal.equal(u.principal, p) });
  };

  public func updateUserRole(users : List.List<CommonTypes.UserInfo>, p : Principal, role : CommonTypes.UserRole) : ?CommonTypes.UserInfo {
    var updated : ?CommonTypes.UserInfo = null;
    users.mapInPlace(func(u) {
      if (Principal.equal(u.principal, p)) {
        let u2 : CommonTypes.UserInfo = { u with role };
        updated := ?u2;
        u2;
      } else { u };
    });
    updated;
  };

  public func getAdminStats(
    supplierCount : Nat,
    expenseCount : Nat,
    invoiceCount : Nat,
    customerCount : Nat,
    totalRevenue : Int,
    totalExpenses : Int,
    totalUsers : Nat,
    activeUsers : Nat,
    topMonthRevenue : Int,
    currentMonthRevenue : Int
  ) : CommonTypes.AdminStats {
    {
      totalUsers;
      activeUsers;
      totalRevenue;
      totalExpenses;
      netPL = totalRevenue - totalExpenses;
      invoiceCount;
      customerCount;
      supplierCount;
      expenseCount;
      topMonthRevenue;
      currentMonthRevenue;
    };
  };
};
