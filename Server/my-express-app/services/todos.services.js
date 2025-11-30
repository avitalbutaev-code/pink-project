const todoRepository = require("../repositories/todos.repository");

class TodosService {
  async createTodo(content, userId) {
    if (content === undefined) {
      throw new Error("content are required");
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      throw new Error("content must be a string");
    }
    const todoId = await todoRepository.create(content, checked, userId);
    return {
      id: todoId,
      content: content,
      checked: false,
      user_id: userId,
    };
  }

  async getAllTodos() {
    return await todoRepository.findAll();
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
    const { todoId, userId, content } = updates;
    if (!content) {
      throw new Error("content must be provided");
    }
    const updateData = {};
    if (content !== undefined) {
      if (typeof content !== "string" || content.trim().length === 0) {
        throw new Error("content must be a non-empty string");
      }
      updateData.content = content.trim();
    }

    const result = await todoRepository.update(id, updateData);
    // if (result.affectedRows === 0) {
    //   throw new Error("Teacher not found");
    // }

    return { id: parseInt(id), ...updateData };
  }

  //   async getTodoById(id) {
  //     const todo = await todoRepository.findById(id);
  //     if (!todo) {
  //       throw new Error("todo not found");
  //     }
  //     return todo;
  //   }
}

module.exports = new TodoService();
