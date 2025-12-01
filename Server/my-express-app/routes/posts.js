const express = require("express");
const router = express.Router();
const postService = require("../services/posts-services");
const { handleServiceError } = require("../services/handleError");
router.get("/", async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    handleServiceError(err, res);
  }
});
router.get("/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const posts = await postService.getAllPosts(req.params.userId);
    res.json(posts);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await postService.createPost(
      req.params.userId,
      title,
      content
    );
    res.json(result);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.put("/:userId/:postId", async (req, res) => {
  try {
    const { content } = req.body;
    const result = await postService.editPost(
      req.params.userId,
      req.params.postId,
      content
    );
    res.json(result);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.delete("/:userId/:postId", async (req, res) => {
  try {
    const result = await postService.removePost(
      req.params.userId,
      req.params.postId
    );
    res.json(result);
  } catch (err) {
    handleServiceError(err, res);
  }
});

module.exports = router;
