const puppeteer = require("puppeteer");
const parsedData = require("./lib/parseData");
const getLogo = require("./lib/getLogo");

(async () => {
  const domains = await parsedData("logos.snappy.parquet");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const domain = domains[4];

  try {
    await page.goto("https://" + domain);
  } catch {
    await page.goto("http://" + domain);
  }

  const logoPath = await getLogo(page, domain);
  console.log("Saved logo:", logoPath);
})();
