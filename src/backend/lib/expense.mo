import Types "../types/expense";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func listExpenses(expenses : List.List<Types.Expense>) : [Types.Expense] {
    expenses.toArray();
  };

  public func listExpensesByCategory(expenses : List.List<Types.Expense>, category : Types.ExpenseCategory) : [Types.Expense] {
    expenses.filter(func(e) {
      switch (e.category, category) {
        case (#office, #office) true;
        case (#utilities, #utilities) true;
        case (#transport, #transport) true;
        case (#rawMaterials, #rawMaterials) true;
        case (#marketing, #marketing) true;
        case (#salaries, #salaries) true;
        case (#rent, #rent) true;
        case (#other, #other) true;
        case _ false;
      };
    }).toArray();
  };

  public func getExpense(expenses : List.List<Types.Expense>, id : Types.ExpenseId) : ?Types.Expense {
    expenses.find(func(e) { e.id == id });
  };

  public func addExpense(expenses : List.List<Types.Expense>, nextId : Nat, input : Types.ExpenseInput) : Types.Expense {
    let now = Time.now();
    let expense : Types.Expense = {
      id = nextId;
      category = input.category;
      amount = input.amount;
      date = input.date;
      description = input.description;
      notes = input.notes;
      receiptUrl = input.receiptUrl;
      createdAt = now;
      updatedAt = now;
    };
    expenses.add(expense);
    expense;
  };

  public func updateExpense(expenses : List.List<Types.Expense>, id : Types.ExpenseId, input : Types.ExpenseInput) : ?Types.Expense {
    var updated : ?Types.Expense = null;
    expenses.mapInPlace(func(e) {
      if (e.id == id) {
        let u : Types.Expense = {
          e with
          category = input.category;
          amount = input.amount;
          date = input.date;
          description = input.description;
          notes = input.notes;
          receiptUrl = input.receiptUrl;
          updatedAt = Time.now();
        };
        updated := ?u;
        u;
      } else { e };
    });
    updated;
  };

  public func deleteExpense(expenses : List.List<Types.Expense>, id : Types.ExpenseId) : Bool {
    let sizeBefore = expenses.size();
    let filtered = expenses.filter(func(e) { e.id != id });
    expenses.clear();
    expenses.append(filtered);
    expenses.size() < sizeBefore;
  };

  public func totalExpenses(expenses : List.List<Types.Expense>) : Int {
    expenses.foldLeft<Int, Types.Expense>(0, func(acc, e) { acc + e.amount });
  };
};
