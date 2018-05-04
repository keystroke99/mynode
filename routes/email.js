let express = require("express");
let router = express.Router();
let ObjectId = require("mongodb").ObjectID;

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('9PX-u8xbRPjr3gVocGxbDQ');

module.exports = router;