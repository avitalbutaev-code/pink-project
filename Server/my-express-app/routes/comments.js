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

router.post("/:userId/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const content = req.body.content;
    console.log("content: ", content);
    const comment = await commentsService.createComment(
      postId,
      userId,
      content
    );
    res.json(comment);
  } catch (err) {
    handleServiceError(err, res);
  }
});
router.put("/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const newComment = req.body.content;
    console.log("newComment: ", newComment);
    const comment = await commentsService.updateComment(commentId, newComment);
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
