var express = require("express");
var router = express.Router();
const todosService = require("../services/todos.services");
const { handleServiceError } = require("../services/handleError");
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
    const { content } = req.body;
    const userId = req.params.userId;
    if (!content) {
      const error = new Error("Todo content is required");
      error.code = "MISSING_REQUIRED_FIELDS";
      throw error;
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      throw new Error("Todo must be a non-empty string");
    }

    const todo = await todosService.createTodo(content, userId);

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
    const userId = req.params.userId;
    const todoId = req.body.todoId;
    const { content, checked } = req.body;
    if (!todoId) {
      throw new Error("todoId is required");
    }
    const todo = await todosService.updateTodo(todoId, {
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
    const result = await todosService.deleteTodo(todoId);

    res.json({
      message: "Todo deleted successfully",
      todo_id: result.id,
    });
  } catch (error) {
    handleServiceError(error, res);
  }
});

module.exports = router;
