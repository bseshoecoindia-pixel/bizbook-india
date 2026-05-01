import Map "mo:core/Map";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import BusinessTypes "../types/business";

module {
  public type State = Map.Map<Principal, BusinessTypes.BusinessProfile>;

  public func getProfile(state : State, owner : Principal) : ?BusinessTypes.BusinessProfile {
    state.get(owner);
  };

  public func saveProfile(state : State, owner : Principal, input : BusinessTypes.BusinessProfileInput) : BusinessTypes.BusinessProfile {
    let profile : BusinessTypes.BusinessProfile = {
      businessId = owner;
      name = input.name;
      category = input.category;
      gstNumber = input.gstNumber;
      address = input.address;
      phone = input.phone;
      email = input.email;
      logoUrl = input.logoUrl;
      currency = input.currency;
      language = input.language;
    };
    state.add(owner, profile);
    profile;
  };

  public func updateProfile(state : State, owner : Principal, input : BusinessTypes.BusinessProfileInput) : ?BusinessTypes.BusinessProfile {
    switch (state.get(owner)) {
      case null null;
      case (?_existing) {
        let updated : BusinessTypes.BusinessProfile = {
          businessId = owner;
          name = input.name;
          category = input.category;
          gstNumber = input.gstNumber;
          address = input.address;
          phone = input.phone;
          email = input.email;
          logoUrl = input.logoUrl;
          currency = input.currency;
          language = input.language;
        };
        state.add(owner, updated);
        ?updated;
      };
    };
  };

  public func deleteProfile(state : State, owner : Principal) : Bool {
    switch (state.get(owner)) {
      case null false;
      case (?_) {
        state.remove(owner);
        true;
      };
    };
  };
};
