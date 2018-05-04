let mongoose = require("mongoose");
let ObjectId = require("mongodb").ObjectID;
let User = require("../models/user");

let PreferencesSchema = new mongoose.Schema({
  preferences: Array,
  username: String,
  updated_at: { type: Date, default: Date.now }
});

let Preference = (module.exports = mongoose.model("Preferences", PreferencesSchema));

module.exports.updatePreferences = function(id, preferences, callback) {
  console.log(preferences);

  User.findAndModify({ _id: id }, { $set: preferences });
};
