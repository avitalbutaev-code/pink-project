const express = require("express");
const router = express.Router();
const usersService = require("../services/users-services");
const passwordService = require("../services/password-services");
const { handleServiceError } = require("../services/handleError");

router.get("/", async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password, phone } = req.body;

    // Create user
    const user = await usersService.createUser(username, phone);

    // Set password
    await passwordService.setPassword(user.user_id, password);

    res.json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    handleServiceError(err, res);
  }
});

module.exports = router;
