var express = require("express");
var router = express.Router();
const { createTables } = require("../scripts/createTables");

router.get("/", function (req, res, next) {
  createTables();
  res.render("index", { title: "Express" });
});

module.exports = router;
