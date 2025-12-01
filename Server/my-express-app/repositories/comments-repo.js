const connection = require("../db/connection");

async function getComments(postId) {
  const [comments] = await connection.promise().query(
    `
    SELECT comments.comment_id, comments.post_id, comments.user_id,
           users.username, comments.content, comments.date
    FROM comments
    JOIN users ON comments.user_id = users.user_id
    WHERE comments.post_id = ?
    ORDER BY comments.comment_id ASC
  `,
    [postId]
  );

  return comments;
}

async function addComment(userId, postId, content) {
  const [result] = await connection.promise().query(
    `
    INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)
  `,
    [userId, postId, content]
  );
  return result;
}

async function updateComment(userId, commentId, content) {
  const [result] = await connection.promise().query(
    `
    UPDATE comments SET content = ? WHERE comment_id = ? AND user_id = ?
  `,
    [content, commentId, userId]
  );
  return result;
}

async function deleteComment(userId, commentId) {
  const [result] = await connection.promise().query(
    `
    DELETE FROM comments WHERE comment_id = ? AND user_id = ?
  `,
    [commentId, userId]
  );
  return result;
}

module.exports = { getComments, addComment, updateComment, deleteComment };
