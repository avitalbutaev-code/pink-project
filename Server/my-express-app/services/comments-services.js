const commentsRepo = require("../repositories/comments-repo");

async function getPostComments(postId) {
  if (!postId) throw new Error("postId required");
  const comments = await commentsRepo.getCommentsByPostId(postId);
  return comments;
}

async function createComment(postId, userId, title, content) {
  if (!postId || !userId || !title || !content) {
    const err = new Error("postId, userId, title, and content required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }
  return await commentsRepo.createComment(postId, userId, title, content);
}

async function removeComment(commentId) {
  if (!commentId) throw new Error("commentId required");
  await commentsRepo.deleteComment(commentId);
}

module.exports = {
  getPostComments,
  createComment,
  removeComment,
};
