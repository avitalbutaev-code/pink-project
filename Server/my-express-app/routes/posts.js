var express = require("express");
var router = express.Router();
const { createTables } = require("../scripts/createTables");
const multer = require("multer");
const os = require("os");
const { handleError } = require('../services/handleError');
const upload = multer({ dest: os.tmpdir() });
router.get('/', async (req, res) => {
  try {
    const classrooms = await ;
    res.json(classrooms);
  } catch (error) {
    handleError(error, res);
  }
});
router.get("/:user", async (req, res) => {
  try {
    const classrooms = await ;
    res.json(classrooms);
  } catch (error) {
    handleError(error, res);
  }
});
router.delete("/:user/:postid", async (req, res) => {
  try {
    const classrooms = await ;
    res.json(classrooms);
  } catch (error) {
    handleError(error, res);
  }
});
router.put("/:user/:postid",async (req, res) => {
  try {
    const classrooms = await ;
    res.json(classrooms);
  } catch (error) {
    handleError(error, res);
  }
});
router.post("/:user/",async (req, res) => {
  try {
    const classrooms = await ;
    res.json(classrooms);
  } catch (error) {
    handleError(error, res);
  }
});
module.exports = router;
