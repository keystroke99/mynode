let express = require("express");
let router = express.Router();
let ObjectId = require("mongodb").ObjectID;

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;