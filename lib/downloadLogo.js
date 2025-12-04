const fs = require("fs");
const path = require("path");

async function downloadLogo(url, destFolder, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to download: " + url);

  const buffer = Buffer.from(await res.arrayBuffer());

  const fullPath = path.join(destFolder, filename);

  fs.mkdirSync(destFolder, { recursive: true });
  fs.writeFileSync(fullPath, buffer);

  return fullPath;
}

module.exports = downloadLogo;
