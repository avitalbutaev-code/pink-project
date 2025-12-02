const connection = require("../db/connection");

async function getCommentsByPostId(postId) {
  const [rows] = await connection.promise().query(
    `
    SELECT comments.*, users.username
    FROM comments 
    LEFT JOIN users ON users.user_id = comments.user_id
    WHERE comments.post_id = ?
    ORDER BY comments.date DESC
    `,
    [postId]
  );
  return rows;
}

async function createComment(postId, userId, content) {
  const [result] = await connection.promise().query(
    `
    INSERT INTO comments (post_id, user_id, content)
    VALUES (?, ?, ?)
    `,
    [postId, userId, content]
  );

  const [rows] = await connection.promise().query(
    `
    SELECT comments.*, users.username
    FROM comments 
    LEFT JOIN users ON users.user_id = comments.user_id
    WHERE comments.comment_id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}

async function updateComment(commentId, newContent) {
  await connection.promise().query(
    `
    UPDATE comments
    SET content = ?
    WHERE comment_id = ?
    `,
    [newContent, commentId]
  );

  const [rows] = await connection.promise().query(
    `
    SELECT comments.*, users.username
    FROM comments 
    LEFT JOIN users ON users.user_id = comments.user_id
    WHERE comments.comment_id = ?
    `,
    [commentId]
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
  updateComment,
  deleteComment,
};
