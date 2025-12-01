const todoRepository = require("../repositories/todos.repositories");

class TodosService {
  async createTodo(content, userId, checked = false) {
    if (content === undefined) {
      throw new Error("content are required");
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      throw new Error("content must be a string");
    }
    const todoId = await todoRepository.create(content.trim(), userId);
    return {
      id: todoId,
      content: content,
      checked,
      user_id: userId,
    };
  }

  async getAllTodos(userId) {
    return await todoRepository.findAll(userId);
  }
  async deleteTodo(id) {
    if (!id) {
      throw new Error("Todo ID is required");
    }

    const deleted = await todoRepository.deleteById(id);
    if (!deleted) {
      throw new Error("Todo not found");
    }

    return { id: parseInt(id) };
  }

  async updateTodo(id, updates) {
    if (!id) {
      throw new Error("Todo ID is required");
    }

    const { content, checked } = updates;
    const updateData = {};
    if (content !== undefined) {
      if (typeof content !== "string" || content.trim().length === 0) {
        throw new Error("content must be a non-empty string");
      }
      updateData.content = content.trim();
    }

    if (checked !== undefined) {
      updateData.checked = Boolean(checked);
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields provided for update");
    }

    const result = await todoRepository.update(id, updateData);

    return { id: parseInt(id), ...updateData };
  }
}

module.exports = new TodosService();
