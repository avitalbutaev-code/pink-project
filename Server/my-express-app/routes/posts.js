var express = require("express");
var router = express.Router();
const { createTables } = require("../scripts/createTables");
const multer = require("multer");
const os = require("os");

const upload = multer({ dest: os.tmpdir() });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/:user", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.delete("/:user/:postid", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.put("/:user/:postid", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/:user/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
