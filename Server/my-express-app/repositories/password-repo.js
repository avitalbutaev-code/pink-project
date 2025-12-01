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
    SELECT u.user_id, u.username, u.phone, p.password
    FROM users u
    INNER JOIN user_passwords p ON u.user_id = p.user_id
    WHERE u.username = ?
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
