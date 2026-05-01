import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import BusinessLib "../lib/business";
import BusinessTypes "../types/business";

mixin (
  accessControlState : AccessControl.AccessControlState,
  businessProfiles : BusinessLib.State,
) {
  public query ({ caller }) func getBusinessProfile() : async ?BusinessTypes.BusinessProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BusinessLib.getProfile(businessProfiles, caller);
  };

  public shared ({ caller }) func saveBusinessProfile(input : BusinessTypes.BusinessProfileInput) : async BusinessTypes.BusinessProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BusinessLib.saveProfile(businessProfiles, caller, input);
  };

  public shared ({ caller }) func updateBusinessProfile(input : BusinessTypes.BusinessProfileInput) : async ?BusinessTypes.BusinessProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BusinessLib.updateProfile(businessProfiles, caller, input);
  };

  public shared ({ caller }) func deleteBusinessProfile() : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    BusinessLib.deleteProfile(businessProfiles, caller);
  };
};
