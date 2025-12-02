const connection = require("../db/connection");

async function getAllPosts() {
  const [rows] = await connection.promise().query(
    `
    SELECT posts.*, users.username, users.phone
    FROM posts 
    LEFT JOIN users  ON users.user_id = posts.user_id
    ORDER BY posts.date DESC
    `
  );
  return rows;
}

async function getPostById(postId) {
  const [rows] = await connection.promise().query(
    `
    SELECT posts.*, users.username, users.phone
    FROM posts 
    LEFT JOIN users ON users.user_id = posts.user_id
    WHERE posts.post_id = ?
    `,
    [postId]
  );
  return rows[0] || null;
}

async function getPostsByUserId(userId) {
  const [rows] = await connection.promise().query(
    `
    SELECT posts.*, users.username, users.phone
    FROM posts 
    LEFT JOIN users  ON users.user_id = posts.user_id
    WHERE posts.user_id = ?
    ORDER BY posts.date DESC
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
  return { success: true };
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  deletePost,
};
