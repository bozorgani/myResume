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

// Portrait main - High quality for homepage (480px for 2x retina = 240px display)
// Using 480px ensures crisp display on retina screens without over-optimization
await sharp(input)
  .rotate() // respect EXIF
  .resize({ width: 960, height: 960, fit: 'cover', position: 'center', withoutEnlargement: true })
  .webp({ quality: 95, effort: 6, smartSubsample: true })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait.webp'));

// Avatar - High quality for resume page (384px for 2x retina = 96px display)
await sharp(input)
  .rotate()
  .resize({ width: 768, height: 768, fit: 'cover', position: 'center', withoutEnlargement: true })
  .webp({ quality: 95, effort: 6, smartSubsample: true })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait-512.webp'));

// Optional optimized JPG (if you need jpg as well) - High quality
await sharp(input)
  .rotate()
  .resize({ width: 1200, height: 1200, fit: 'cover', position: 'center', withoutEnlargement: true })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(resolve(outDir, 'amin-bozorgani-portrait.jpg'));

console.log('Images written to public/images:');
console.log('- amin-bozorgani-portrait.webp');
console.log('- amin-bozorgani-portrait-512.webp');
console.log('- amin-bozorgani-portrait.jpg');


