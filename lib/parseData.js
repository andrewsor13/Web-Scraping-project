const parquet = require("parquetjs-lite");

async function parsedData(path) {
  const db = [];
  let reader = await parquet.ParquetReader.openFile(path);
  let cursor = reader.getCursor();
  let record = null;

  while ((record = await cursor.next())) {
    db.push(record.domain);
  }

  return db;
}

module.exports = parsedData;
