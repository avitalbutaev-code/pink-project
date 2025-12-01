const connection = require("../db/connection");

async function getPosts(user_id = undefined) {
  let query = `
    SELECT posts.post_id, posts.user_id, users.username,
           posts.title, posts.content, posts.date
    FROM posts
    JOIN users ON posts.user_id = users.user_id
  `;
  const params = [];

  if (user_id) {
    query += ` WHERE posts.user_id = ? `;
    params.push(user_id);
  }

  query += ` ORDER BY posts.date ASC `;

  const [posts] = await connection.promise().query(query, params);
  return posts;
}

async function addPost(userId, title, content) {
  const [result] = await connection.promise().query(
    `
    INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)
  `,
    [userId, title, content]
  );
  return result;
}

async function updatePost(userId, postId, content) {
  const [result] = await connection.promise().query(
    `
    UPDATE posts SET content = ? WHERE post_id = ? AND user_id = ?
  `,
    [content, postId, userId]
  );
  return result;
}

async function deletePost(userId, postId) {
  const [result] = await connection.promise().query(
    `
    DELETE FROM posts WHERE post_id = ? AND user_id = ?
  `,
    [postId, userId]
  );
  return result;
}

module.exports = { getPosts, addPost, updatePost, deletePost };
