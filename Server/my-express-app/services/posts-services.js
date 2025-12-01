const postsRepo = require("../repositories/post-repo");

async function getAllPosts(userId = undefined) {
  if (userId) {
    return await postsRepo.getPostsByUserId(userId);
  }
  return await postsRepo.getAllPosts();
}

async function createPost(userId, title, content) {
  if (!userId || !title || !content) {
    const err = new Error("userId, title, and content required");
    err.code = "MISSING_REQUIRED_FIELDS";
    throw err;
  }
  return await postsRepo.createPost(userId, title, content);
}

async function removePost(postId) {
  if (!postId) throw new Error("postId required");
  await postsRepo.deletePost(postId);
}

module.exports = {
  getAllPosts,
  createPost,
  removePost,
};
