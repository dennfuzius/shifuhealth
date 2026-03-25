import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/images/crane-logo.png");
const pub = path.join(root, "public");

async function main() {
  // favicon-16x16.png
  await sharp(src)
    .resize(16, 16, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(pub, "favicon-16x16.png"));
  console.log("✓ favicon-16x16.png");

  // favicon-32x32.png
  await sharp(src)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(pub, "favicon-32x32.png"));
  console.log("✓ favicon-32x32.png");

  // favicon.ico (32x32 png renamed — browsers accept png as ico)
  await sharp(src)
    .resize(32, 32, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(pub, "favicon.ico"));
  console.log("✓ favicon.ico");

  // apple-touch-icon.png (180x180 with bg color)
  await sharp(src)
    .resize(160, 160, { fit: "contain", background: { r: 245, g: 237, b: 227, alpha: 1 } })
    .extend({
      top: 10, bottom: 10, left: 10, right: 10,
      background: { r: 245, g: 237, b: 227, alpha: 1 },
    })
    .png()
    .toFile(path.join(pub, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png");

  // og-image.png (1200x630, crane centered on --color-bg)
  const craneResized = await sharp(src)
    .resize(300, 300, { fit: "contain", background: { r: 245, g: 237, b: 227, alpha: 1 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 245, g: 237, b: 227 },
    },
  })
    .composite([
      {
        input: craneResized,
        top: Math.round((630 - 300) / 2),
        left: Math.round((1200 - 300) / 2),
      },
    ])
    .png()
    .toFile(path.join(pub, "og-image.png"));
  console.log("✓ og-image.png");

  console.log("\nAll favicon variants generated!");
}

main().catch(console.error);
