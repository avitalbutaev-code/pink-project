const passwordRepo = require("../repositories/password-repo");

async function setPassword(userId, password) {
  if (!userId || !password) {
    const err = new Error("userId and password required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }

  await passwordRepo.setPassword(userId, password);
}

async function validatePassword(username, enteredPassword) {
  const row = await passwordRepo.getUserWithPassword(username);
  if (!row) return null;

  if (row.password !== enteredPassword) return null;

  return {
    user_id: row.user_id,
    username: row.username,
    phone: row.phone,
  };
}

module.exports = {
  setPassword,
  validatePassword,
};
