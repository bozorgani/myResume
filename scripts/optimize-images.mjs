// Usage: node scripts/optimize-images.mjs /absolute/path/to/input.jpg
import { resolve, basename } from 'node:path';
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const input = process.argv[2];
if (!input) {
  console.error('Please provide input image path. Example: node scripts/optimize-images.mjs ~/Pictures/me.jpg');
  process.exit(1);
}

const outDir = resolve(process.cwd(), 'public/images');
mkdirSync(outDir, { recursive: true });

const baseName = basename(input).replace(/\.[^.]+$/, '');

// Portrait main 1200px (for large contexts/OG fallback if needed)
await sharp(input)
  .rotate() // respect EXIF
  .resize({ width: 1200, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait.webp'));

// Avatar 512px
await sharp(input)
  .rotate()
  .resize({ width: 512, withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait-512.webp'));

// Optional optimized JPG (if you need jpg as well)
await sharp(input)
  .rotate()
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait.jpg'));

console.log('Images written to public/images:');
console.log('- amin-bozorgani-portrait.webp');
console.log('- amin-bozorgani-portrait-512.webp');
console.log('- amin-bozorgani-portrait.jpg');


