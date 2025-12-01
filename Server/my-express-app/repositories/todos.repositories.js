const connection = require("../../db/connection");
class TodoRepository {
  async create(content, userId) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      "INSERT INTO todos (content, userId) VALUES (?, ?)",
      [content, userId]
    );
    return result.insertId;
  }
  async findAll(userId) {
    const promiseConnection = connection.promise();
    const [rows] = await promiseConnection.query(
      "SELECT * FROM todos WHERE userId = ?",
      [userId]
    );
    return rows;
  }
  async deleteById(id) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      "DELETE FROM todos WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}
module.exports = new TodoRepository();
