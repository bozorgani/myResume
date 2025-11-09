# راهنمای پیاده‌سازی SEO - گام‌به‌گام
**تاریخ:** ۹ نوامبر ۲۰۲۵

---

## ✅ کار ۱: تنظیم ری‌دایرکت 301 از non-www به www

### روش ۱: استفاده از Next.js Config (پیاده‌سازی شده ✅)

ری‌دایرکت 301 در فایل `next.config.mjs` اضافه شده است. این کار به صورت خودکار تمام درخواست‌های `bozorgani.ir` را به `www.bozorgani.ir` ری‌دایرکت می‌کند.

**وضعیت:** ✅ انجام شد

### روش ۲: تنظیم در سطح Hosting (توصیه می‌شود)

اگر از **Vercel** استفاده می‌کنید:

1. به داشبورد Vercel بروید: https://vercel.com/dashboard
2. پروژه خود را انتخاب کنید
3. به بخش **Settings** → **Domains** بروید
4. دامنه `bozorgani.ir` را اضافه کنید
5. در تنظیمات دامنه، گزینه **Redirect** را فعال کنید و `www.bozorgani.ir` را به عنوان مقصد تنظیم کنید

یا از فایل `vercel.json` استفاده کنید:

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "bozorgani.ir"
        }
      ],
      "destination": "https://www.bozorgani.ir/:path*",
      "permanent": true
    }
  ]
}
```

اگر از **Netlify** استفاده می‌کنید:

فایل `netlify.toml` ایجاد کنید:

```toml
[[redirects]]
  from = "https://bozorgani.ir/*"
  to = "https://www.bozorgani.ir/:splat"
  status = 301
  force = true
```

### تست ری‌دایرکت

#### تست محلی (قبل از deploy):

1. سرور development را اجرا کنید: `npm run dev`
2. در فایل `hosts` سیستم خود (Windows: `C:\Windows\System32\drivers\etc\hosts`)، خط زیر را اضافه کنید:
   ```
   127.0.0.1 bozorgani.ir
   127.0.0.1 www.bozorgani.ir
   ```
3. به آدرس `http://bozorgani.ir:3000` بروید
4. باید به `http://www.bozorgani.ir:3000` ری‌دایرکت شوید

#### تست پس از deploy:

1. مرورگر را باز کنید
2. به آدرس `https://bozorgani.ir` بروید
3. باید به طور خودکار به `https://www.bozorgani.ir` ری‌دایرکت شوید
4. در Developer Tools → Network، باید کد 301 را ببینید
5. آدرس URL در address bar باید تغییر کند

### ابزار تست آنلاین:

- https://www.redirect-checker.org/
- https://httpstatus.io/
- https://httpstatus.io/redirect-checker

### نکته مهم:

اگر از Vercel استفاده می‌کنید، می‌توانید در تنظیمات پروژه نیز ری‌دایرکت را تنظیم کنید (اما middleware کافی است).

---

## ✅ کار ۲: ارسال Sitemap به Google Search Console

### گام ۱: ایجاد حساب Google Search Console

1. به آدرس بروید: https://search.google.com/search-console
2. با حساب Google خود وارد شوید
3. روی **Add Property** کلیک کنید
4. **URL prefix** را انتخاب کنید
5. آدرس `https://www.bozorgani.ir` را وارد کنید
6. روی **Continue** کلیک کنید

### گام ۲: تأیید مالکیت دامنه

روش‌های تأیید:

#### روش ۱: HTML Tag (آسان‌ترین)

1. Google یک تگ HTML به شما می‌دهد مثل:
   ```html
   <meta name="google-site-verification" content="XeFvCtZt5MKDwcNWELRzeIOcAT5gCYPlR0gvO5Ys6EI" />
   ```

2. بررسی کنید که این تگ در فایل `app/layout.tsx` موجود است:
   ```typescript
   verification: {
     google: 'XeFvCtZt5MKDwcNWELRzeIOcAT5gCYPlR0gvO5Ys6EI'
   }
   ```

3. اگر موجود است، روی **Verify** کلیک کنید
4. اگر موجود نیست، باید اضافه کنید (که قبلاً اضافه شده ✅)

#### روش ۲: HTML File Upload

1. Google یک فایل HTML به شما می‌دهد
2. آن را در پوشه `public` قرار دهید
3. روی **Verify** کلیک کنید

#### روش ۳: DNS Record

1. یک TXT record در DNS خود اضافه کنید
2. مقدار داده شده توسط Google را وارد کنید
3. روی **Verify** کلیک کنید

### گام ۳: ارسال Sitemap

1. پس از تأیید، به داشبورد Google Search Console بروید
2. در منوی سمت چپ، روی **Sitemaps** کلیک کنید
3. در قسمت **Add a new sitemap**، آدرس زیر را وارد کنید:
   ```
   https://www.bozorgani.ir/sitemap.xml
   ```
4. روی **Submit** کلیک کنید
5. وضعیت sitemap را بررسی کنید (معمولاً چند دقیقه تا چند ساعت طول می‌کشد)

### گام ۴: بررسی وضعیت Sitemap

1. پس از چند ساعت، به بخش **Sitemaps** برگردید
2. وضعیت sitemap را بررسی کنید:
   - ✅ **Success**: sitemap با موفقیت پردازش شد
   - ⚠️ **Has errors**: خطاهایی وجود دارد (باید بررسی کنید)
   - ⏳ **Pending**: در حال پردازش

### نکات مهم:

- Sitemap باید قابل دسترسی باشد (https://www.bozorgani.ir/sitemap.xml)
- پس از تغییرات در sitemap، Google به طور خودکار آن را بررسی می‌کند
- می‌توانید sitemap را دوباره submit کنید اگر مشکلی وجود دارد

---

## ✅ کار ۳: ارسال Sitemap به Bing Webmaster Tools

### گام ۱: ایجاد حساب Bing Webmaster Tools

1. به آدرس بروید: https://www.bing.com/webmasters
2. با حساب Microsoft خود وارد شوید (می‌توانید با Google هم وارد شوید)
3. روی **Add a site** کلیک کنید
4. آدرس `https://www.bozorgani.ir` را وارد کنید
5. روی **Add** کلیک کنید

### گام ۲: تأیید مالکیت دامنه

روش‌های تأیید:

#### روش ۱: XML File Upload (آسان‌ترین)

1. Bing یک فایل XML به شما می‌دهد (مثل `BingSiteAuth.xml`)
2. آن را در پوشه `public` قرار دهید
3. مطمئن شوید که در آدرس `https://www.bozorgani.ir/BingSiteAuth.xml` قابل دسترسی است
4. روی **Verify** کلیک کنید

#### روش ۲: Meta Tag

1. Bing یک تگ HTML به شما می‌دهد
2. آن را در `app/layout.tsx` اضافه کنید (در بخش `other` در metadata)
3. روی **Verify** کلیک کنید

#### روش ۳: CNAME Record

1. یک CNAME record در DNS خود اضافه کنید
2. مقدار داده شده توسط Bing را وارد کنید
3. روی **Verify** کلیک کنید

### گام ۳: ارسال Sitemap

1. پس از تأیید، به داشبورد Bing Webmaster Tools بروید
2. در منوی سمت چپ، روی **Sitemaps** کلیک کنید
3. در قسمت **Submit a sitemap**، آدرس زیر را وارد کنید:
   ```
   https://www.bozorgani.ir/sitemap.xml
   ```
4. روی **Submit** کلیک کنید
5. وضعیت sitemap را بررسی کنید

### گام ۴: بررسی وضعیت Sitemap

1. پس از چند ساعت، به بخش **Sitemaps** برگردید
2. وضعیت sitemap را بررسی کنید:
   - ✅ **Submitted**: sitemap با موفقیت submit شد
   - ⚠️ **Errors**: خطاهایی وجود دارد
   - ⏳ **Pending**: در حال پردازش

### نکات مهم:

- Bing معمولاً sitemap را سریع‌تر از Google پردازش می‌کند
- می‌توانید چندین sitemap submit کنید (مثلاً sitemap-index)
- Bing همچنین از Google Search Console داده دریافت می‌کند (اگر اتصال داده باشید)

---

## چک‌لیست کامل

### ✅ کار ۱: ری‌دایرکت 301
- [x] ری‌دایرکت در `next.config.mjs` اضافه شد
- [ ] تست ری‌دایرکت انجام شد
- [ ] (اختیاری) تنظیم در سطح hosting انجام شد

### ✅ کار ۲: Google Search Console
- [ ] حساب Google Search Console ایجاد شد
- [ ] مالکیت دامنه تأیید شد
- [ ] Sitemap submit شد
- [ ] وضعیت sitemap بررسی شد

### ✅ کار ۳: Bing Webmaster Tools
- [ ] حساب Bing Webmaster Tools ایجاد شد
- [ ] مالکیت دامنه تأیید شد
- [ ] Sitemap submit شد
- [ ] وضعیت sitemap بررسی شد

---

## عیب‌یابی مشکلات رایج

### مشکل ۱: Sitemap قابل دسترسی نیست

**راه‌حل:**
1. مطمئن شوید که sitemap در آدرس `https://www.bozorgani.ir/sitemap.xml` قابل دسترسی است
2. در مرورگر آدرس را تست کنید
3. مطمئن شوید که robots.txt آن را block نکرده باشد

### مشکل ۲: تأیید مالکیت انجام نمی‌شود

**راه‌حل:**
1. مطمئن شوید که تگ/فایل درست اضافه شده است
2. Cache مرورگر را پاک کنید
3. از روش دیگر تأیید استفاده کنید

### مشکل ۳: ری‌دایرکت کار نمی‌کند

**راه‌حل:**
1. مطمئن شوید که کد در `next.config.mjs` درست است
2. پروژه را دوباره build و deploy کنید
3. اگر در Vercel است، از `vercel.json` استفاده کنید
4. Cache CDN را پاک کنید

---

## منابع مفید

### Google Search Console:
- مستندات: https://developers.google.com/search-console
- راهنمای شروع: https://support.google.com/webmasters/answer/9128668

### Bing Webmaster Tools:
- مستندات: https://www.bing.com/webmasters/help
- راهنمای شروع: https://www.bing.com/webmasters/help/getting-started-with-bing-webmaster-tools

### تست Sitemap:
- Google Sitemap Tester: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Bing Sitemap Validator: در Bing Webmaster Tools موجود است

---

## بعد از انجام کارها

پس از انجام این سه کار:

1. **نظارت منظم:**
   - هر هفته Google Search Console را بررسی کنید
   - خطاهای crawl را بررسی کنید
   - عملکرد جستجو را بررسی کنید

2. **به‌روزرسانی Sitemap:**
   - هر بار که محتوای جدید اضافه می‌کنید، sitemap به طور خودکار به‌روز می‌شود
   - می‌توانید sitemap را دوباره submit کنید

3. **تحلیل عملکرد:**
   - از Google Analytics استفاده کنید
   - رتبه‌بندی کلمات کلیدی را ردیابی کنید
   - ترافیک ارگانیک را بررسی کنید

---

**تاریخ ایجاد:** ۹ نوامبر ۲۰۲۵  
**آخرین به‌روزرسانی:** ۹ نوامبر ۲۰۲۵

---

**پایان راهنما**
