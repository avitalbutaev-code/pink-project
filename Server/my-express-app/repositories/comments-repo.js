const connection = require("../db/connection");

async function getCommentsByPostId(postId) {
  const [rows] = await connection.promise().query(
    `
    SELECT c.*, u.username, u.phone
    FROM comments c
    LEFT JOIN users u ON u.user_id = c.user_id
    WHERE c.post_id = ?
    ORDER BY c.date DESC
    `,
    [postId]
  );
  return rows;
}

async function createComment(postId, userId, title, content) {
  const [result] = await connection.promise().query(
    `
    INSERT INTO comments (post_id, user_id, title, content)
    VALUES (?, ?, ?, ?)
    `,
    [postId, userId, title, content]
  );

  const [rows] = await connection.promise().query(
    `
    SELECT c.*, u.username
    FROM comments c
    LEFT JOIN users u ON u.user_id = c.user_id
    WHERE c.comment_id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}

async function deleteComment(commentId) {
  await connection
    .promise()
    .query(`DELETE FROM comments WHERE comment_id = ?`, [commentId]);
}

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
};
