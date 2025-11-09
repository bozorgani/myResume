# راهنمای سریع SEO - ۳ کار اصلی

این راهنمای سریع برای انجام ۳ کار اصلی SEO است که در گزارش حسابرسی مشخص شده‌اند.

---

## ✅ کار ۱: ری‌دایرکت 301 (انجام شد ✅)

**وضعیت:** ✅ کامل شده - فایل‌های لازم ایجاد/ویرایش شده‌اند

**فایل‌های تغییر یافته:**
- ✅ `middleware.ts` - ایجاد شد
- ✅ `next.config.mjs` - redirects اضافه شد

**اقدام بعدی:**
1. پروژه را deploy کنید
2. تست کنید که `https://bozorgani.ir` به `https://www.bozorgani.ir` ری‌دایرکت می‌شود
3. از ابزارهای آنلاین برای تست استفاده کنید:
   - https://www.redirect-checker.org/
   - https://httpstatus.io/

---

## ⏳ کار ۲: ارسال Sitemap به Google Search Console

### مراحل:

#### ۱. ایجاد/ورود به Google Search Console
1. به آدرس بروید: https://search.google.com/search-console
2. با حساب Google خود وارد شوید
3. روی **Add Property** کلیک کنید
4. **URL prefix** را انتخاب کنید
5. آدرس `https://www.bozorgani.ir` را وارد کنید
6. روی **Continue** کلیک کنید

#### ۲. تأیید مالکیت
گزینه **HTML tag** را انتخاب کنید (ساده‌ترین روش)

Google یک تگ مثل این به شما می‌دهد:
```html
<meta name="google-site-verification" content="XeFvCtZt5MKDwcNWELRzeIOcAT5gCYPlR0gvO5Ys6EI" />
```

✅ **خبر خوب:** این تگ قبلاً در کد شما موجود است! (`app/layout.tsx`)

بنابراین:
1. روی **Verify** کلیک کنید
2. باید پیام تأیید را ببینید

#### ۳. ارسال Sitemap
1. در منوی سمت چپ، روی **Sitemaps** کلیک کنید
2. در قسمت **Add a new sitemap**، آدرس زیر را وارد کنید:
   ```
   https://www.bozorgani.ir/sitemap.xml
   ```
3. روی **Submit** کلیک کنید
4. بعد از چند دقیقه/ساعت، وضعیت sitemap را بررسی کنید

**زمان انجام:** ۱۰-۱۵ دقیقه

---

## ⏳ کار ۳: ارسال Sitemap به Bing Webmaster Tools

### مراحل:

#### ۱. ایجاد/ورود به Bing Webmaster Tools
1. به آدرس بروید: https://www.bing.com/webmasters
2. با حساب Microsoft/Google خود وارد شوید
3. روی **Add a site** کلیک کنید
4. آدرس `https://www.bozorgani.ir` را وارد کنید
5. روی **Add** کلیک کنید

#### ۲. تأیید مالکیت
گزینه **XML file** را انتخاب کنید (ساده‌ترین روش)

1. Bing یک فایل XML به شما می‌دهد (مثل `BingSiteAuth.xml`)
2. محتوای فایل را کپی کنید
3. فایل جدید در پوشه `public` ایجاد کنید: `public/BingSiteAuth.xml`
4. محتوای کپی شده را در فایل قرار دهید
5. فایل را commit و push کنید
6. پس از deploy، روی **Verify** کلیک کنید

**نکته:** اگر نمی‌خواهید فایل ایجاد کنید، می‌توانید از روش **Meta tag** استفاده کنید (مشابه Google).

#### ۳. ارسال Sitemap
1. در منوی سمت چپ، روی **Sitemaps** کلیک کنید
2. در قسمت **Submit a sitemap**، آدرس زیر را وارد کنید:
   ```
   https://www.bozorgani.ir/sitemap.xml
   ```
3. روی **Submit** کلیک کنید
4. بعد از چند دقیقه/ساعت، وضعیت sitemap را بررسی کنید

**زمان انجام:** ۱۵-۲۰ دقیقه

---

## چک‌لیست سریع

### کار ۱: ری‌دایرکت 301
- [x] کد اضافه شده (middleware.ts + next.config.mjs)
- [ ] پروژه deploy شده
- [ ] ری‌دایرکت تست شده

### کار ۲: Google Search Console
- [ ] حساب ایجاد شده
- [ ] مالکیت تأیید شده (تگ قبلاً موجود است ✅)
- [ ] Sitemap submit شده
- [ ] وضعیت sitemap بررسی شده

### کار ۳: Bing Webmaster Tools
- [ ] حساب ایجاد شده
- [ ] مالکیت تأیید شده (فایل XML یا Meta tag)
- [ ] Sitemap submit شده
- [ ] وضعیت sitemap بررسی شده

---

## نکات مهم

### ۱. Google Verification
✅ تگ verification قبلاً در کد موجود است (`app/layout.tsx` خط 56):
```typescript
verification: {
  google: 'XeFvCtZt5MKDwcNWELRzeIOcAT5gCYPlR0gvO5Ys6EI'
}
```
بنابراین فقط باید روی **Verify** کلیک کنید!

### ۲. Sitemap URL
آدرس sitemap شما:
```
https://www.bozorgani.ir/sitemap.xml
```

مطمئن شوید که این آدرس قابل دسترسی است (در مرورگر تست کنید).

### ۳. زمان پردازش
- Google: معمولاً ۱-۲ روز
- Bing: معمولاً چند ساعت تا ۱ روز

صبر کنید و بعد از ۲۴-۴۸ ساعت وضعیت را بررسی کنید.

---

## مشکل‌یابی

### مشکل: Sitemap قابل دسترسی نیست
**راه‌حل:**
1. مطمئن شوید که sitemap در `https://www.bozorgani.ir/sitemap.xml` قابل دسترسی است
2. در مرورگر آدرس را باز کنید و تست کنید
3. مطمئن شوید که robots.txt آن را block نکرده باشد

### مشکل: Verification کار نمی‌کند
**راه‌حل:**
1. مطمئن شوید که تگ/فایل درست اضافه شده است
2. Cache مرورگر را پاک کنید
3. از روش دیگر verification استفاده کنید

### مشکل: ری‌دایرکت کار نمی‌کند
**راه‌حل:**
1. مطمئن شوید که پروژه deploy شده است
2. Cache CDN را پاک کنید
3. از ابزارهای آنلاین برای تست استفاده کنید

---

## بعد از انجام کارها

پس از انجام این سه کار:

1. **نظارت منظم:**
   - هر هفته Google Search Console را بررسی کنید
   - خطاهای crawl را بررسی کنید
   - عملکرد جستجو را بررسی کنید

2. **به‌روزرسانی Sitemap:**
   - Sitemap به طور خودکار به‌روز می‌شود
   - می‌توانید sitemap را دوباره submit کنید

3. **تحلیل عملکرد:**
   - از Google Analytics استفاده کنید
   - رتبه‌بندی کلمات کلیدی را ردیابی کنید
   - ترافیک ارگانیک را بررسی کنید

---

## لینک‌های مفید

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Redirect Checker: https://www.redirect-checker.org/
- HTTP Status: https://httpstatus.io/

---

**زمان کل تخمینی:** ۳۰-۴۵ دقیقه

**تاریخ ایجاد:** ۹ نوامبر ۲۰۲۵

---

**برای راهنمای کامل، به فایل `SEO-IMPLEMENTATION-GUIDE-FA.md` مراجعه کنید.**

