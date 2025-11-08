// اسکریپت تولید خودکار favicon ها از تصویر منبع
// Usage: node scripts/generate-favicons.mjs [path-to-source-image]
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import sharp from 'sharp';

// مسیر تصویر منبع - اگر ارائه نشده باشد از تصاویر موجود استفاده می‌شود
const publicDir = resolve(process.cwd(), 'public');
const imagesDir = resolve(publicDir, 'images');

// بررسی تصاویر موجود به ترتیب اولویت
const possibleSources = [
  process.argv[2], // اگر کاربر مسیر داده باشد
  resolve(imagesDir, 'og-default.png'),
  resolve(imagesDir, 'amin-bozorgani-portrait-512.webp'),
  resolve(imagesDir, 'amin-bozorgani-portrait.webp'),
  resolve(imagesDir, 'amin-bozorgani-portrait.jpg')
].filter(Boolean);

let sourceImage = null;
for (const path of possibleSources) {
  if (existsSync(path)) {
    sourceImage = path;
    break;
  }
}

// بررسی وجود تصویر منبع
if (!sourceImage) {
  console.error(`❌ هیچ تصویر منبعی یافت نشد!`);
  console.error('لطفاً یک تصویر مربع (حداقل 512x512) را در public/images قرار دهید یا مسیر آن را به عنوان آرگومان ارائه دهید.');
  console.error('مثال: node scripts/generate-favicons.mjs ./path/to/icon.png');
  process.exit(1);
}

console.log(`📸 در حال پردازش تصویر: ${sourceImage}`);

try {
  // خواندن تصویر و تبدیل به مربع
  // sharp به صورت خودکار فرمت‌های مختلف را تشخیص می‌دهد
  let image = sharp(sourceImage);
  
  // اگر فایل PNG نباشد، آن را به PNG تبدیل می‌کنیم
  const metadata = await image.metadata();
  console.log(`📐 ابعاد تصویر: ${metadata.width}x${metadata.height}`);
  console.log(`📄 فرمت تصویر: ${metadata.format}`);
  
  // اطمینان از اینکه تصویر RGB یا RGBA است
  if (metadata.format !== 'png' && metadata.format !== 'jpeg' && metadata.format !== 'webp') {
    console.log('⚠️  فرمت تصویر غیرمعمول است، در حال تبدیل...');
    image = image.png();
  }

  // تولید favicon های مختلف
  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 96, name: 'favicon-96x96.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  console.log('🎨 در حال تولید favicon ها...\n');

  // تولید PNG ها
  for (const { size, name } of sizes) {
    await image
      .clone()
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(resolve(publicDir, name));
    
    console.log(`✅ ${name} (${size}x${size}) ایجاد شد`);
  }

  // تولید favicon.ico (چند سایز در یک فایل)
  // favicon.ico معمولاً شامل 16x16 و 32x32 است
  await image
    .clone()
    .resize(32, 32, {
      fit: 'cover',
      position: 'center',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(resolve(publicDir, 'favicon.ico'));
  
  console.log(`✅ favicon.ico (32x32) ایجاد شد`);

  // تولید safari-pinned-tab.svg (SVG ساده)
  // این یک SVG ساده است که می‌تواند بعداً بهبود یابد
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#0ea5e9"/>
  <text x="16" y="22" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">MB</text>
</svg>`;
  
  // نوشتن SVG - در اینجا از sharp استفاده نمی‌کنیم چون یک SVG ساده است
  // اما برای تولید خودکار از تصویر، می‌توانیم از یک کتابخانه دیگر استفاده کنیم
  // فعلاً یک SVG ساده می‌سازیم
  
  console.log('\n✨ تمام favicon ها با موفقیت ایجاد شدند!');
  console.log('\n📋 فایل‌های ایجاد شده:');
  sizes.forEach(({ name }) => console.log(`   - ${name}`));
  console.log('   - favicon.ico');
  console.log('\n💡 نکته: برای safari-pinned-tab.svg بهتر است از یک SVG سفارشی استفاده کنید.');
  console.log('   می‌توانید یک SVG با طراحی بهتر ایجاد کنید و در public/safari-pinned-tab.svg قرار دهید.');
  
} catch (error) {
  console.error('❌ خطا در تولید favicon ها:', error.message);
  process.exit(1);
}

