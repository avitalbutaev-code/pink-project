var express = require("express");
var router = express.Router();
const multer = require("multer");
const os = require("os");
const { handleError } = require("../services/handleError");
const upload = multer({ dest: os.tmpdir() });
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const todos = await todosService.getAllTodos(userId);
    res.json(todos);
  } catch (error) {
    handleServiceError(error, res);
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const content = req.body;
    const userId = req.params.userId;
    if (!content) {
      const error = new Error("todo are required");
      error.code = "MISSING_REQUIRED_FIELDS";
      throw error;
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      throw new Error("Todo must be a non-empty string");
    }

    const todo = await todoService.createTodo(content, userId);

    res.status(201).json({
      message: "todo created successfully",
      todo_id: todo.id,
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.id;
    const todoId = req.body.todoId;
    const { content, checked } = req.body;
    const todo = await todoService.updateTodo(todoId, {
      userId,
      content,
      checked,
    });

    res.json({
      message: "Todo updated successfully",
      todo_id: todo.id,
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const result = await todoService.deleteTodo(todoId);

    res.json({
      message: "Todo deleted successfully",
      todo_id: result.id,
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;
