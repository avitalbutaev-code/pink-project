const connection = require("../db/connection");

async function getAllPosts() {
  const [rows] = await connection.promise().query(
    `
    SELECT p.*, u.username, u.phone
    FROM posts p
    LEFT JOIN users u ON u.user_id = p.user_id
    ORDER BY p.date DESC
    `
  );
  return rows;
}

async function getPostById(postId) {
  const [rows] = await connection.promise().query(
    `
    SELECT p.*, u.username, u.phone
    FROM posts p
    LEFT JOIN users u ON u.user_id = p.user_id
    WHERE p.post_id = ?
    `,
    [postId]
  );
  return rows[0] || null;
}

async function getPostsByUserId(userId) {
  const [rows] = await connection.promise().query(
    `
    SELECT p.*, u.username, u.phone
    FROM posts p
    LEFT JOIN users u ON u.user_id = p.user_id
    WHERE p.user_id = ?
    ORDER BY p.date DESC
    `,
    [userId]
  );
  return rows;
}

async function createPost(userId, title, content) {
  const [result] = await connection.promise().query(
    `
    INSERT INTO posts (user_id, title, content)
    VALUES (?, ?, ?)
    `,
    [userId, title, content]
  );
  return await getPostById(result.insertId);
}

async function deletePost(postId) {
  await connection
    .promise()
    .query(`DELETE FROM posts WHERE post_id = ?`, [postId]);
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  deletePost,
};
