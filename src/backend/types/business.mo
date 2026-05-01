import CommonTypes "common";

module {
  public type BusinessProfile = {
    businessId : CommonTypes.BusinessId;
    name : Text;
    category : Text;
    gstNumber : ?Text;
    address : Text;
    phone : Text;
    email : Text;
    logoUrl : ?Text;
    currency : Text;
    language : Text;
  };

  public type BusinessProfileInput = {
    name : Text;
    category : Text;
    gstNumber : ?Text;
    address : Text;
    phone : Text;
    email : Text;
    logoUrl : ?Text;
    currency : Text;
    language : Text;
  };
};
