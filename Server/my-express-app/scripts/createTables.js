const connection = require("../db/connection");
const fs = require("fs/promises");
const path = require("path");

async function createTables() {
  try {
    console.log("🚀 Starting to create tables...");
    console.log("Connected to database:", connection.config.database);

    const entitiesPath = path.join(__dirname, "../entities");
    let files = await fs.readdir(entitiesPath);

    files = files.filter((f) => f.endsWith(".json"));

    const dependencyOrder = [
      "users",
      "user_passwords",
      "posts",
      "comments",
      "todos",
    ];
    files.sort((a, b) => {
      const nameA = path.parse(a).name;
      const nameB = path.parse(b).name;
      return dependencyOrder.indexOf(nameA) - dependencyOrder.indexOf(nameB);
    });

    for (const file of files) {
      const tableName = path.parse(file).name;
      console.log(`\n📌 Creating table: ${tableName}`);

      const content = await fs.readFile(path.join(entitiesPath, file), "utf-8");
      const tableObj = JSON.parse(content);

      let columns = [];
      let constraints = [];

      for (const key of Object.keys(tableObj)) {
        if (key === "__constraints") {
          constraints = tableObj[key];
        } else {
          columns.push(`${key} ${tableObj[key]}`);
        }
      }

      if (constraints.length > 0) {
        columns.push(...constraints);
      }

      const query = `CREATE TABLE IF NOT EXISTS ${tableName} (\n${columns.join(
        ",\n"
      )}\n) `;

      try {
        await connection.promise().query(query);
        console.log(`✅ Table "${tableName}" created successfully.`);
      } catch (err) {
        console.error(`❌ Error creating "${tableName}":`, err);
        throw err;
      }
    }

    console.log("\n🎉 All tables created successfully!");
  } catch (error) {
    console.error("\n🔥 Fatal Error:", error);
  } finally {
    connection.end();
  }
}

module.exports = { createTables };
