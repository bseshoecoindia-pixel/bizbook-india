import Types "common";

module {
  public type ExpenseId = Nat;

  public type ExpenseCategory = {
    #office;
    #utilities;
    #transport;
    #rawMaterials;
    #marketing;
    #salaries;
    #rent;
    #other;
  };

  public type Expense = {
    id : ExpenseId;
    category : ExpenseCategory;
    amount : Int;
    date : Types.Timestamp;
    description : Text;
    notes : ?Text;
    receiptUrl : ?Text;
    createdAt : Types.Timestamp;
    updatedAt : Types.Timestamp;
  };

  public type ExpenseInput = {
    category : ExpenseCategory;
    amount : Int;
    date : Types.Timestamp;
    description : Text;
    notes : ?Text;
    receiptUrl : ?Text;
  };
};
