const express = require("express");
const router = express.Router();
const commentsService = require("../services/comments-services");
const { handleServiceError } = require("../services/handleError");

router.get("/:postId", async (req, res) => {
  try {
    const comments = await commentsService.getPostComments(req.params.postId);
    res.json(comments);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const { postId, userId, title, content } = req.body;
    const comment = await commentsService.createComment(
      postId,
      userId,
      title,
      content
    );
    res.json(comment);
  } catch (err) {
    handleServiceError(err, res);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    await commentsService.removeComment(req.params.commentId);
    res.json({ success: true });
  } catch (err) {
    handleServiceError(err, res);
  }
});

module.exports = router;
