const connection = require("../db/connection");
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

  async update(id, updateData) {
    const promiseConnection = connection.promise();
    const fields = [];
    const values = [];
    for (const key in updateData) {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    }
    if (fields.length === 0) return false;
    const sql = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);
    const [result] = await promiseConnection.query(sql, values);
    return result.affectedRows > 0;
  }
}
module.exports = new TodoRepository();
