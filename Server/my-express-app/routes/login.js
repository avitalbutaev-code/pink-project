const express = require("express");
const router = express.Router();
const passwordService = require("../services/password-services");
const { handleServiceError } = require("../services/handleError");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await passwordService.validatePassword(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    handleServiceError(err, res);
  }
});

module.exports = router;
