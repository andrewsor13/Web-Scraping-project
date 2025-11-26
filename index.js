const puppeteer = require("puppeteer");
const duckdb = require("duckdb");

async function parsedData(path) {
  const db = new duckdb.Database(":memory:");
  const conn = db.connect();

  const result = await conn.allAsync(`SELECT domain FROM '${path}'`);

  return result.map((row) => row.domain);
}

(async () => {
  const domains = await parsedData("domains.parquet");
  console.log("Total domenii:", domains.length);
  console.log(domains.slice(0, 10));
})();
