# راه‌اندازی Google Analytics

این راهنما نحوه اتصال Google Analytics 4 (GA4) به پروژه Next.js را توضیح می‌دهد.

## مراحل راه‌اندازی

### 1. ایجاد حساب Google Analytics

1. به [Google Analytics](https://analytics.google.com/) بروید
2. اگر حساب ندارید، یک حساب جدید ایجاد کنید
3. یک Property جدید ایجاد کنید
4. یک Data Stream برای وب سایت خود ایجاد کنید
5. Measurement ID را کپی کنید (فرمت: `G-XXXXXXXXXX`)

### 2. تنظیم متغیرهای محیطی

یک فایل `.env.local` در ریشه پروژه `myResume` ایجاد کنید و Measurement ID خود را اضافه کنید:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**توجه:** 
- فایل `.env.local` در `.gitignore` است و نباید commit شود
- بعد از تغییر فایل `.env.local`، سرور توسعه را restart کنید

### 3. بررسی عملکرد

1. سرور توسعه را اجرا کنید:
   ```bash
   npm run dev
   ```

2. به وب‌سایت خود بروید

3. به Google Analytics بروید و در بخش Real-time گزارش‌ها را بررسی کنید

4. باید بازدیدهای خود را در Real-time گزارش ببینید

## ویژگی‌های پیاده‌سازی شده

✅ **پیگیری خودکار تغییرات صفحه**: با استفاده از Next.js App Router، تغییرات مسیر به صورت خودکار در Google Analytics ثبت می‌شود

✅ **بهینه‌سازی عملکرد**: اسکریپت Google Analytics با استراتژی `afterInteractive` لود می‌شود تا بر روی عملکرد اولیه صفحه تاثیر نگذارد

✅ **پشتیبانی از Query Parameters**: URL های با پارامترهای query string نیز به درستی ثبت می‌شوند

✅ **TypeScript Support**: کامپوننت با TypeScript نوشته شده و type-safe است

## تست در Development

در حالت development، Google Analytics همچنان فعال است. اگر می‌خواهید در development غیرفعال شود، می‌توانید کامپوننت را به این صورت تغییر دهید:

```tsx
if (!GA_MEASUREMENT_ID || process.env.NODE_ENV === 'development') {
  return null;
}
```

## مشکلات رایج

### Analytics کار نمی‌کند

1. بررسی کنید که `NEXT_PUBLIC_GA_MEASUREMENT_ID` به درستی در `.env.local` تنظیم شده باشد
2. سرور را restart کنید
3. Cache مرورگر را پاک کنید
4. از ابزار Google Analytics Debugger استفاده کنید

### داده‌ها نمایش داده نمی‌شوند

- Google Analytics ممکن است 24-48 ساعت طول بکشد تا داده‌های کامل را نمایش دهد
- برای مشاهده فوری، از بخش Real-time استفاده کنید
- مطمئن شوید که Ad blockers غیرفعال هستند

## منابع بیشتر

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Script Component](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [Google Analytics Setup Guide](https://support.google.com/analytics/answer/9304153)

