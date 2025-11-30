const connection = require("../../db/connection");
class TodoRepository {
  async create(content, userId) {
    const promiseConnection = connection.promise();
    const [result] = await promiseConnection.query(
      "INSERT INTO todos (content, userId) VALUES (?, ?, ?)",
      [content, userId]
    );
    return result.insertId;
  }
  findAll;
  deleteById;
}
module.exports = new TodoRepository();
