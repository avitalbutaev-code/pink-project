const connection = require("../db/connection");
const fs = require("fs/promises");
const path = require("path");

async function createTables() {
  try {
    const tables = await fs.readdir(path.join(__dirname, "../entities"));
    for (const table of tables) {
      if (path.extname(table) !== ".json") {
        console.log("Skipping non-json file:", table);
        continue;
      }
      const table_name = path.parse(table).name;
      console.log("table:", table_name);
      const readTable = await fs.readFile(
        path.join(__dirname, "../entities", table),
        "utf-8"
      );
      if (!readTable) continue;
      const tableObj = JSON.parse(readTable);
      let columns = "";
      for (const key of Object.keys(tableObj)) {
        columns += `${key} ${tableObj[key]},`;
      }
      columns = columns.slice(0, -1);

      const query = `CREATE TABLE IF NOT EXISTS ${table_name} (
        ${columns}
      );`;

      await connection.promise().query(query);

      console.log(` Table ${table_name} created`);
    }
  } catch (error) {
    console.error(" Error creating tables:", error);
  } finally {
    connection.end();
  }
}

module.exports = { createTables };
