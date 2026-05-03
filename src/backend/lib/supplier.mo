import Types "../types/supplier";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func listSuppliers(suppliers : List.List<Types.Supplier>) : [Types.Supplier] {
    suppliers.toArray();
  };

  public func getSupplier(suppliers : List.List<Types.Supplier>, id : Types.SupplierId) : ?Types.Supplier {
    suppliers.find(func(s) { s.id == id });
  };

  public func addSupplier(suppliers : List.List<Types.Supplier>, nextId : Nat, input : Types.SupplierInput) : Types.Supplier {
    let now = Time.now();
    let supplier : Types.Supplier = {
      id = nextId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      address = input.address;
      gstNumber = input.gstNumber;
      paymentTerms = input.paymentTerms;
      notes = input.notes;
      totalPurchases = 0;
      pendingAmount = 0;
      createdAt = now;
      updatedAt = now;
    };
    suppliers.add(supplier);
    supplier;
  };

  public func updateSupplier(suppliers : List.List<Types.Supplier>, id : Types.SupplierId, input : Types.SupplierInput) : ?Types.Supplier {
    var updated : ?Types.Supplier = null;
    suppliers.mapInPlace(func(s) {
      if (s.id == id) {
        let u : Types.Supplier = {
          s with
          name = input.name;
          phone = input.phone;
          email = input.email;
          address = input.address;
          gstNumber = input.gstNumber;
          paymentTerms = input.paymentTerms;
          notes = input.notes;
          updatedAt = Time.now();
        };
        updated := ?u;
        u;
      } else { s };
    });
    updated;
  };

  public func deleteSupplier(suppliers : List.List<Types.Supplier>, id : Types.SupplierId) : Bool {
    let sizeBefore = suppliers.size();
    let filtered = suppliers.filter(func(s) { s.id != id });
    suppliers.clear();
    suppliers.append(filtered);
    suppliers.size() < sizeBefore;
  };

  public func recordPurchase(suppliers : List.List<Types.Supplier>, id : Types.SupplierId, amount : Int) : Bool {
    var found = false;
    suppliers.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with totalPurchases = s.totalPurchases + amount; pendingAmount = s.pendingAmount + amount; updatedAt = Time.now() };
      } else { s };
    });
    found;
  };

  public func recordPayment(suppliers : List.List<Types.Supplier>, id : Types.SupplierId, amount : Int) : Bool {
    var found = false;
    suppliers.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        let newPending = if (s.pendingAmount > amount) s.pendingAmount - amount else 0;
        { s with pendingAmount = newPending; updatedAt = Time.now() };
      } else { s };
    });
    found;
  };
};
