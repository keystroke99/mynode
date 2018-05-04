let express = require("express");
let router = express.Router();
let ObjectId = require("mongodb").ObjectID;
// let Preference = require("../models/preference");
let User = require("../models/user");

// Get Preferences List

router.get("/getpreferences", function (req, res) {
  res.json({
    "preferences" : [
      {
          "id" : "Sports",
          "Cricket" : ["Indian Premier League", "Ranji", "International"],
          "Football" : ["National", "International"]
      },
      {
          "id"   : "Movies",
          "Tollywood" : ["Actor", "Actress"],
          "Bollywood" : ["Actor", "Actress"]
      },
      {
          "id"   : "Television",
          "Tollywood" : ["Actor", "Actress"],
          "Bollywood" : ["Actor", "Actress"]
      }
  ]
  });
});

// update user Preference

router.put("/updatepreferences/:id", function (req, res) {
  let preferences = req.body.preferences;
  let id = req.params.id;

  User.updatePreferences(id, preferences, function (err, result) {
    if (err) return res.send(err);
    res.json({ message: "Preferences Updated Successfully" });
  });

});

// Get User Preferences

router.get("/getuserpreferences/:id", function (req, res) {

  id = req.params.id;

  User.findById(id, function(err, result) {
    res.send(result.preferences);
  });
 
});

// Get User Preferences by Category
router.get("/getuserpreferencestype/:id/:category", function (req, res) {

  id = req.params.id;
  type = req.params.category;

  User.findById(id, function(err, result) {
  let dude = result.preferences[0][type];
  //console.log(dude[type]);
    res.send(dude);
  });
 
});




module.exports = router;
