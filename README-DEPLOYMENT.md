# راهنمای استقرار پروژه

## متغیرهای محیطی مورد نیاز

برای اینکه پروژه به درستی روی سرور کار کند، باید متغیر زیر را تنظیم کنید:

```bash
NEXT_PUBLIC_CMS_API=https://api.yourdomain.com
```

**مهم:** 
- این متغیر باید در محیط production تنظیم شود
- اگر تنظیم نشود، پروژه به صورت پیش‌فرض به `http://localhost:4000` متصل می‌شود که روی سرور کار نمی‌کند
- برای Next.js، متغیرهای `NEXT_PUBLIC_*` باید در زمان build تنظیم شوند

## نحوه تنظیم در Vercel

1. وارد پنل Vercel شوید
2. به Settings > Environment Variables بروید
3. متغیر `NEXT_PUBLIC_CMS_API` را اضافه کنید
4. مقدار آن را به آدرس API خود تنظیم کنید (مثلاً: `https://api.bozorgani.ir`)
5. دوباره deploy کنید

## نحوه تنظیم در سرور اختصاصی

اگر از سرور اختصاصی استفاده می‌کنید:

1. فایل `.env.production` را در ریشه پروژه ایجاد کنید:
```bash
NEXT_PUBLIC_CMS_API=https://api.yourdomain.com
```

2. یا در زمان build:
```bash
NEXT_PUBLIC_CMS_API=https://api.yourdomain.com npm run build
```

## بررسی خطاها

اگر صفحه بلاگ باز نمی‌شود، لطفاً:

1. لاگ‌های سرور را بررسی کنید
2. مطمئن شوید متغیر `NEXT_PUBLIC_CMS_API` تنظیم شده است
3. مطمئن شوید API در دسترس است و CORS به درستی تنظیم شده
4. بررسی کنید که API در مسیر `/v1/posts?status=published` پاسخ می‌دهد

## تست محلی

برای تست محلی:
```bash
NEXT_PUBLIC_CMS_API=http://localhost:4000 npm run dev
```

