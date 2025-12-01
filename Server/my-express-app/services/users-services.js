const usersRepo = require("../repositories/users-repo");

async function getAllUsers() {
  return await usersRepo.getAllUsers();
}

async function getUserById(userId) {
  const user = await usersRepo.getUserById(userId);
  if (!user) throw new Error("not found");
  return user;
}

async function createUser(username, phone = null) {
  if (!username) {
    const err = new Error("username required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }

  return await usersRepo.createUser(username, phone);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
