const fs = require("fs");
const path = require("path");

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function getLogo(page, domain) {
  try {
    await page
      .waitForNetworkIdle({ idleTime: 500, timeout: 10000 })
      .catch(() => {});
    await sleep(1000);

    const selector = 'svg[aria-label*="logo" i]';
    await page.waitForSelector(selector, { visible: true, timeout: 8000 });

    const el = await page.$(selector);
    if (!el) return null;

    await el.scrollIntoViewIfNeeded?.();
    await sleep(200);

    const box = await el.boundingBox();
    if (!box) return null;

    const outputPath = `output/logos/${domain}.png`;
    await page.screenshot({
      path: outputPath,
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    console.log("Element logo screenshot for:", domain);
    return outputPath;
  } catch (err) {
    console.log("Optimized getLogo error:", domain, err.message);
    return null;
  }
}

module.exports = getLogo;
