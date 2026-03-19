import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, 'public', 'icons');

if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

const createIcon = async (size) => {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#333333" rx="${size * 0.1}"/>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${size * 0.5}" fill="white" text-anchor="middle" dominant-baseline="middle">♪</text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(iconsDir, `icon-${size}.png`));
  
  console.log(`Created icon-${size}.png`);
};

await createIcon(192);
await createIcon(512);

console.log('Icons created successfully!');
