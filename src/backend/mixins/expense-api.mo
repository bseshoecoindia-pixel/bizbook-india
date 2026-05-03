import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/expense";
import ExpenseLib "../lib/expense";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  expenses : List.List<Types.Expense>,
  nextExpenseId : { var val : Nat },
) {
  public query ({ caller }) func listExpenses() : async [Types.Expense] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.listExpenses(expenses);
  };

  public query ({ caller }) func listExpensesByCategory(category : Types.ExpenseCategory) : async [Types.Expense] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.listExpensesByCategory(expenses, category);
  };

  public query ({ caller }) func getExpense(id : Types.ExpenseId) : async ?Types.Expense {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.getExpense(expenses, id);
  };

  public shared ({ caller }) func createExpense(input : Types.ExpenseInput) : async Types.Expense {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextExpenseId.val;
    nextExpenseId.val += 1;
    ExpenseLib.addExpense(expenses, id, input);
  };

  public shared ({ caller }) func updateExpense(id : Types.ExpenseId, input : Types.ExpenseInput) : async ?Types.Expense {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.updateExpense(expenses, id, input);
  };

  public shared ({ caller }) func deleteExpense(id : Types.ExpenseId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.deleteExpense(expenses, id);
  };

  public query ({ caller }) func getTotalExpenses() : async Int {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ExpenseLib.totalExpenses(expenses);
  };
};
