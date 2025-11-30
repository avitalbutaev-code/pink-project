const postsRepo = require("../repositories/post-repo");

async function getAllPosts() {
  return await postsRepo.getPosts();
}

async function createPost(userId, title, content) {
  return await postsRepo.addPost(userId, title, content);
}

async function editPost(userId, postId, content) {
  return await postsRepo.updatePost(userId, postId, content);
}

async function removePost(userId, postId) {
  return await postsRepo.deletePost(userId, postId);
}

module.exports = { getAllPosts, createPost, editPost, removePost };
