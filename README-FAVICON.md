# راهنمای Favicon برای سایت

این مستندات توضیح می‌دهد که چگونه favicon ها برای سایت تنظیم شده‌اند و چگونه می‌توانید آن‌ها را به‌روز کنید.

## 📋 فایل‌های Favicon ایجاد شده

فایل‌های زیر در پوشه `public/` ایجاد شده‌اند:

- `favicon.ico` - Favicon اصلی (32x32)
- `favicon-16x16.png` - Favicon کوچک برای مرورگرها
- `favicon-32x32.png` - Favicon متوسط
- `favicon-96x96.png` - Favicon بزرگ برای برخی مرورگرها
- `apple-touch-icon.png` - آیکون برای iOS devices (180x180)
- `android-chrome-192x192.png` - آیکون برای Android (192x192)
- `android-chrome-512x512.png` - آیکون برای Android (512x512)
- `safari-pinned-tab.svg` - SVG برای Safari pinned tabs

## 🎨 تولید Favicon ها

برای تولید favicon ها از یک تصویر منبع، از اسکریپت زیر استفاده کنید:

```bash
npm run favicon:generate
```

یا با تصویر خاص:

```bash
npm run favicon:generate ./path/to/your/icon.png
```

### نیازمندی‌ها

- تصویر منبع باید حداقل 512x512 پیکسل باشد
- بهتر است تصویر مربع باشد (نسبت 1:1)
- فرمت‌های پشتیبانی شده: PNG, JPEG, WebP

## 🔧 تنظیمات

### 1. تنظیمات در `app/layout.tsx`

Favicon ها در `metadata.icons` تنظیم شده‌اند:

```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }
  ],
  shortcut: '/favicon.ico',
}
```

### 2. تنظیمات در `site.webmanifest`

فایل `public/site.webmanifest` شامل تمام آیکون‌های لازم برای PWA است.

## 🔍 تست Favicon ها

### 1. تست در مرورگر

1. سرور توسعه را اجرا کنید:
   ```bash
   npm run dev
   ```

2. به آدرس `http://localhost:3000` بروید

3. تب مرورگر را بررسی کنید - باید favicon را ببینید

4. برای تست کامل:
   - مرورگر را رفرش کنید (Ctrl+F5 یا Cmd+Shift+R)
   - Developer Tools را باز کنید
   - به تب Network بروید و فیلتر "Img" را فعال کنید
   - بررسی کنید که favicon ها لود می‌شوند

### 2. تست در Google Search Console

1. به [Google Search Console](https://search.google.com/search-console) بروید
2. سایت خود را انتخاب کنید
3. به بخش "Enhancements" > "Core Web Vitals" بروید
4. Google به صورت خودکار favicon شما را index می‌کند

### 3. تست با ابزارهای آنلاین

- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

## 🌐 نمایش در Google Search

برای اینکه favicon شما در نتایج جستجوی Google نمایش داده شود:

1. **فایل favicon.ico باید در root سایت باشد** ✅ (در `public/favicon.ico`)
2. **سایز مناسب**: 16x16 یا 32x32 پیکسل ✅
3. **فرمت مناسب**: ICO یا PNG ✅
4. **دسترسی Google**: Google باید بتواند به فایل دسترسی داشته باشد ✅
5. **صبر**: ممکن است چند روز تا چند هفته طول بکشد تا Google favicon را index کند

### نکات مهم:

- Google معمولاً favicon را از آدرس `/favicon.ico` می‌خواند
- favicon باید در تمام صفحات سایت در دسترس باشد
- از robots.txt اطمینان حاصل کنید که favicon مسدود نشده باشد

## 🔄 به‌روزرسانی Favicon

اگر می‌خواهید favicon را تغییر دهید:

1. تصویر جدید خود را آماده کنید (حداقل 512x512 پیکسل، مربع)
2. اسکریپت را اجرا کنید:
   ```bash
   npm run favicon:generate ./path/to/new/icon.png
   ```
3. فایل‌های جدید در `public/` ایجاد می‌شوند
4. سرور را restart کنید
5. مرورگر را hard refresh کنید (Ctrl+F5)

## 📱 پشتیبانی از دستگاه‌های مختلف

- **Desktop Browsers**: favicon.ico, favicon-16x16.png, favicon-32x32.png
- **iOS**: apple-touch-icon.png (180x180)
- **Android**: android-chrome-192x192.png, android-chrome-512x512.png
- **Safari**: safari-pinned-tab.svg
- **PWA**: site.webmanifest (شامل تمام آیکون‌ها)

## 🐛 رفع مشکلات

### Favicon نمایش داده نمی‌شود

1. بررسی کنید که فایل `favicon.ico` در `public/` وجود دارد
2. مرورگر را hard refresh کنید (Ctrl+F5)
3. Cache مرورگر را پاک کنید
4. بررسی کنید که مسیر favicon در `layout.tsx` درست است

### Favicon در Google Search نمایش داده نمی‌شود

1. اطمینان حاصل کنید که favicon.ico در root سایت است
2. بررسی کنید که Google می‌تواند به فایل دسترسی داشته باشد
3. در Google Search Console، از "URL Inspection" استفاده کنید
4. صبر کنید - ممکن است چند هفته طول بکشد

### کیفیت favicon پایین است

1. از یک تصویر با کیفیت بالا (حداقل 512x512) استفاده کنید
2. اسکریپت را دوباره اجرا کنید
3. از فرمت PNG به جای ICO استفاده کنید (در صورت نیاز)

## 📚 منابع بیشتر

- [Google Favicon Guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [MDN Web Docs - Favicon](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#favicon)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

