const connection = require("../db/connection");

async function setPassword(userId, password) {
  const [result] = await connection.promise().query(
    `
      INSERT INTO user_passwords (user_id, password)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE password = VALUES(password)
    `,
    [userId, password]
  );

  return result;
}

async function getUserWithPassword(username) {
  const [rows] = await connection.promise().query(
    `
      SELECT users.user_id, users.username, users.phone, user_passwords.password
      FROM users users
      INNER JOIN user_passwords 
      ON users.user_id = user_passwords.user_id
      WHERE users.username = ?
      LIMIT 1
    `,
    [username]
  );

  return rows[0] || null;
}

module.exports = {
  setPassword,
  getUserWithPassword,
};
