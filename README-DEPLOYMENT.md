# راهنمای استقرار پروژه

## متغیرهای محیطی مورد نیاز

برای اینکه پروژه به درستی روی سرور کار کند، باید متغیر زیر را تنظیم کنید:

```bash
NEXT_PUBLIC_CMS_API=https://cms-api-pv3h.onrender.com
```

**⚠️ بسیار مهم:** 
- این متغیر **باید** در محیط production تنظیم شود
- اگر تنظیم نشود، پروژه به صورت پیش‌فرض به `http://localhost:4000` متصل می‌شود که روی سرور کار نمی‌کند
- برای Next.js، متغیرهای `NEXT_PUBLIC_*` باید در زمان **build** و **runtime** تنظیم شوند
- با `dynamic = 'force-dynamic'`، fetch در runtime انجام می‌شود، پس متغیر باید در runtime هم در دسترس باشد

## نحوه تنظیم در Vercel

1. وارد پنل Vercel شوید
2. به Settings > Environment Variables بروید
3. متغیر `NEXT_PUBLIC_CMS_API` را اضافه کنید
4. مقدار آن را به آدرس API خود تنظیم کنید: `https://cms-api-pv3h.onrender.com`
5. دوباره deploy کنید

## نحوه تنظیم در سرور اختصاصی

اگر از سرور اختصاصی استفاده می‌کنید:

1. فایل `.env.production` را در ریشه پروژه ایجاد کنید:
```bash
NEXT_PUBLIC_CMS_API=https://cms-api-pv3h.onrender.com
```

2. یا در زمان build:
```bash
NEXT_PUBLIC_CMS_API=https://cms-api-pv3h.onrender.com npm run build
```

## بررسی خطاها

اگر صفحه بلاگ باز نمی‌شود و پیام "مقاله‌ای یافت نشد" نمایش داده می‌شود، لطفاً:

1. **صفحه debug را بررسی کنید**: به `/api-debug` بروید تا وضعیت API را ببینید
2. **لاگ‌های سرور را بررسی کنید**: لاگ‌های مفصلی اضافه شده‌اند که خطاها را نشان می‌دهند
3. **بررسی متغیر محیطی**: مطمئن شوید `NEXT_PUBLIC_CMS_API` تنظیم شده است
4. **بررسی دسترسی API**: مطمئن شوید API در دسترس است و CORS به درستی تنظیم شده
5. **تست endpoint**: بررسی کنید که API در مسیر `/v1/posts?status=published` پاسخ می‌دهد:

```bash
curl https://cms-api-pv3h.onrender.com/v1/posts?status=published
```

## مشکلات رایج

### مشکل ۱: پست‌ها نمایش داده نمی‌شوند
- ✅ بررسی کنید `NEXT_PUBLIC_CMS_API` تنظیم شده است
- ✅ بررسی کنید API در دسترس است (API فعلی: `https://cms-api-pv3h.onrender.com`)
- ⚠️ **مهم**: بررسی کنید که پست‌هایی با `status='published'` در دیتابیس وجود دارند
  - اگر API پاسخ می‌دهد اما `items: []` است، یعنی هیچ پست published شده‌ای وجود ندارد
  - باید از Admin Panel پست‌ها را publish کنید
- ✅ لاگ‌های سرور را بررسی کنید

### مشکل ۲: خطای CORS
- ✅ مطمئن شوید CORS در API تنظیم شده است
- ✅ در `cms-api/.env` بررسی کنید `CORS_ORIGIN` شامل دامنه frontend است

### مشکل ۳: API timeout
- ✅ timeout از 10 به 15 ثانیه افزایش یافته است
- ✅ بررسی کنید API سریع پاسخ می‌دهد

## تست محلی

برای تست محلی:
```bash
NEXT_PUBLIC_CMS_API=http://localhost:4000 npm run dev
```

