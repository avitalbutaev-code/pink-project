const commentsRepo = require("../repositories/comments-repo");

async function getPostComments(postId) {
  if (!postId) throw new Error("postId required");
  const comments = await commentsRepo.getCommentsByPostId(postId);
  return comments;
}

async function createComment(postId, userId, content) {
  console.log(postId, userId, content);

  if (!postId || !userId || !content) {
    const err = new Error("postId, userId and content required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }
  return await commentsRepo.createComment(postId, userId, content);
}
async function updateComment(commentId, newComment) {
  if (!commentId || !newComment) {
    const err = new Error("commentId and newComment required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }
  return await commentsRepo.updateComment(commentId, newComment);
}
async function removeComment(commentId) {
  if (!commentId) throw new Error("commentId required");
  await commentsRepo.deleteComment(commentId);
}

module.exports = {
  getPostComments,
  createComment,
  removeComment,
  updateComment,
};
