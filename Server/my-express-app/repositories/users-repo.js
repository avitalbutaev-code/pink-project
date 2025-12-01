const connection = require("../db/connection");

async function getAllUsers() {
  const [rows] = await connection.promise().query(`SELECT * FROM users`);
  return rows;
}

async function getUserById(userId) {
  const [rows] = await connection
    .promise()
    .query(`SELECT * FROM users WHERE user_id = ?`, [userId]);
  return rows[0] || null;
}

async function getUserByUsername(username) {
  const [rows] = await connection
    .promise()
    .query(`SELECT * FROM users WHERE username = ?`, [username]);
  return rows[0] || null;
}

// Added optional phone parameter
async function createUser(username, phone = null) {
  const [result] = await connection
    .promise()
    .query(`INSERT INTO users (username, phone) VALUES (?, ?)`, [
      username,
      phone,
    ]);
  return { user_id: result.insertId, username, phone };
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
};
