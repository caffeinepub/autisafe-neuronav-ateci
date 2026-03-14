import Runtime "mo:core/Runtime";

actor {
  type Settings = {
    vibrationEnabled : Bool;
    audioEnabled : Bool;
    vibrationStrength : Nat;
    audioVolume : Nat;
    ndModeEnabled : Bool;
  };

  let defaultSettings : Settings = {
    vibrationEnabled = true;
    audioEnabled = true;
    vibrationStrength = 50;
    audioVolume = 50;
    ndModeEnabled = false;
  };

  var currentSettings : Settings = defaultSettings;

  public query ({ caller }) func getSettings() : async Settings {
    currentSettings;
  };

  public shared ({ caller }) func updateSettings(newSettings : Settings) : async () {
    if (newSettings.vibrationStrength > 100) {
      Runtime.trap("Vibration strength must be between 0 and 100");
    };
    if (newSettings.audioVolume > 100) {
      Runtime.trap("Audio volume must be between 0 and 100");
    };
    currentSettings := newSettings;
  };
};
