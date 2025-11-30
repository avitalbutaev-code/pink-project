const express = require("express");
const router = express.Router();
const commentsService = require("../services/comments-services");

router.get("/:postId", async (req, res) => {
  try {
    const comments = await commentsService.getPostComments(req.params.postId);
    res.json(comments);
  } catch (err) {
    handleServiceError(error, res);
  }
});

router.post("/:userId/:postId", async (req, res) => {
  try {
    const { content } = req.body;
    const result = await commentsService.createComment(
      req.params.userId,
      req.params.postId,
      content
    );
    res.json(result);
  } catch (err) {
    handleServiceError(error, res);
  }
});

router.put("/:userId/:commentId", async (req, res) => {
  try {
    const { content } = req.body;
    const result = await commentsService.editComment(
      req.params.userId,
      req.params.commentId,
      content
    );
    res.json(result);
  } catch (err) {
    handleServiceError(error, res);
  }
});

router.delete("/:userId/:commentId", async (req, res) => {
  try {
    const result = await commentsService.removeComment(
      req.params.userId,
      req.params.commentId
    );
    res.json(result);
  } catch (err) {
    handleServiceError(error, res);
  }
});

module.exports = router;
