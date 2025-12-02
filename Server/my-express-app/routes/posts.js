const express = require("express");
const router = express.Router();
const postsService = require("../services/posts-services");
const { handleServiceError } = require("../services/handleError");

router.get("/", async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const posts = await postsService.getAllPosts(req.params.userId);
    res.json(posts);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, content } = req.body;
    const post = await postsService.createPost(userId, title, content);
    res.json(post);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    await postsService.removePost(req.params.postId);
    res.json({ success: true });
  } catch (err) {
    handleServiceError(err, res);
  }
});

module.exports = router;
