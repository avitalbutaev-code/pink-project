const commentsRepo = require("../repositories/comments-repo");

async function getPostComments(postId) {
  return await commentsRepo.getComments(postId);
}

async function createComment(userId, postId, content) {
  return await commentsRepo.addComment(userId, postId, content);
}

async function editComment(userId, commentId, content) {
  return await commentsRepo.updateComment(userId, commentId, content);
}

async function removeComment(userId, commentId) {
  return await commentsRepo.deleteComment(userId, commentId);
}

module.exports = { getPostComments, createComment, editComment, removeComment };
