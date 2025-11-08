# راهنمای پیاده‌سازی SEO - بهبودهای سریع

این راهنما دستورالعمل‌های گام‌به‌گام برای پیاده‌سازی بهبودهای اولویت بالای SEO را ارائه می‌دهد.

## 🔴 بهبودهای اولویت بالا

### ۱. اضافه کردن هدرهای امنیتی

**فایل:** `myResume/next.config.mjs`

**کد فعلی:**
```javascript
async headers() {
  return [
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},
```

**کد به‌روزرسانی شده:**
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), camera=()',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},
```

**تست:**
1. تغییرات را deploy کنید
2. به آدرس https://securityheaders.com بروید
3. دامنه خود را وارد کرده و امتیاز را بررسی کنید
4. باید به رتبه A+ برسید

---

### ۲. حذف Crawl Delay از robots.txt

**فایل:** `myResume/public/robots.txt`

**کد فعلی:**
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Crawl-delay: 1  # <-- این خط را حذف کنید
```

**کد به‌روزرسانی شده:**
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Google
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Bing
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://bozorgani.ir/sitemap.xml
```

**تست:**
1. مطمئن شوید robots.txt در آدرس https://bozorgani.ir/robots.txt قابل دسترسی است
2. در Google Search Console بررسی کنید (Crawl > robots.txt Tester)

---

### ۳. بهبود متا دیسکریپشن‌ها

**فایل:** `myResume/app/blog/[...slug]/page.tsx`

**کد فعلی (خط ۳۳-۳۵):**
```typescript
const description = post.description && post.description.trim() 
  ? post.description 
  : `مقاله ${post.title} از بلاگ ${SITE.name} درباره توسعه Full-Stack، بهینه‌سازی عملکرد و سئو فنی.`;
```

**توصیه:**
- مطمئن شوید همه پست‌های بلاگ دیسکریپشن‌های یکتا و جذاب دارند (۱۵۰-۱۶۰ کاراکتر)
- کلمه کلیدی اصلی را به طور طبیعی شامل کنید
- در صورت مناسب بودن، call-to-action اضافه کنید
- هنگام ایجاد پست‌ها در CMS، دیسکریپشن‌ها را بنویسید

**مثال:**
```
بد: "مقاله درباره Next.js"
خوب: "راهنمای جامع بهینه‌سازی Core Web Vitals در Next.js. یاد بگیرید چگونه LCP، FID و CLS را بهبود دهید و رتبه سایت خود را افزایش دهید."
```

---

### ۴. بهبود Alt Text برای تصاویر

**فایل:** `myResume/app/blog/[...slug]/page.tsx`

**کد فعلی (خط ۲۴۱):**
```typescript
alt={`کاور ${post.title}`}
```

**کد به‌روزرسانی شده:**
```typescript
alt={post.imageAlt || `تصویر کاور مقاله ${post.title} درباره ${post.categories?.[0]?.name || 'توسعه وب'}`}
```

**توصیه:**
- فیلد `imageAlt` را به پست‌های بلاگ در CMS اضافه کنید
- alt text توصیفی بنویسید (۱۲۵ کاراکتر یا کمتر)
- کلمات کلیدی مرتبط را به طور طبیعی شامل کنید
- محتوای تصویر را توصیف کنید، نه فقط زمینه

**مثال:**
```
بد: "کاور مقاله"
خوب: "نمودار بهبود Core Web Vitals در Next.js - مقایسه LCP قبل و بعد از بهینه‌سازی"
```

---

### ۵. اضافه کردن Resource Hints

**فایل:** `myResume/app/layout.tsx`

**اضافه کردن به بخش `<head>`:**

```tsx
<head>
  <ThemeScript />
  {/* Resource Hints */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://cms-api-pv3h.onrender.com" />
  {/* در صورت نیاز دامنه‌های خارجی دیگر را اضافه کنید */}
</head>
```

---

### ۶. اضافه کردن Google Analytics 4

**فایل:** `myResume/app/layout.tsx`

**اضافه کردن به بخش `<head>`:**

```tsx
<head>
  <ThemeScript />
  {/* Google Analytics */}
  {process.env.NEXT_PUBLIC_GA_ID && (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
    </>
  )}
</head>
```

**متغیر محیطی:**
اضافه کردن به `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**راه‌اندازی:**
1. یک property Google Analytics 4 ایجاد کنید
2. Measurement ID را دریافت کنید (G-XXXXXXXXXX)
3. به متغیرهای محیطی اضافه کنید
4. Deploy کنید و در داشبورد GA4 تأیید کنید

---

### ۷. بهبود لینک‌دهی داخلی

**فایل:** `myResume/app/blog/[...slug]/page.tsx`

**اضافه کردن بخش پست‌های مرتبط (بعد از navigation):**

```tsx
{/* Related Posts */}
{relatedPosts.length > 0 && (
  <section className="mt-12" aria-label="مقالات مرتبط">
    <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.slice(0, 3).map((relatedPost) => (
        <Link
          key={relatedPost.slug}
          href={getPostUrl(relatedPost)}
          className="group rounded-xl border p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
            {relatedPost.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {relatedPost.description}
          </p>
        </Link>
      ))}
    </div>
  </section>
)}
```

**اضافه کردن منطق پست‌های مرتبط (قبل از return statement):**

```tsx
// Get related posts (same category or tags)
const relatedPosts = posts
  .filter((p) => {
    if (p.slug === post.slug) return false;
    // Same category
    if (post.categories?.[0] && p.categories?.some(c => c.slug === post.categories[0].slug)) {
      return true;
    }
    // Same tags
    if (post.tags && p.tags && post.tags.some(t => p.tags?.some(pt => pt.slug === t.slug))) {
      return true;
    }
    return false;
  })
  .slice(0, 3);
```

---

### ۸. اضافه کردن بیوگرافی نویسنده به پست‌های بلاگ

**فایل:** `myResume/app/blog/[...slug]/page.tsx`

**اضافه کردن بعد از محتوای مقاله، قبل از navigation:**

```tsx
{/* Author Bio */}
<section className="mt-12 rounded-xl border p-6 bg-gray-50 dark:bg-gray-900">
  <div className="flex items-start gap-4">
    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
      <Image
        src="/images/amin-bozorgani-portrait-512.webp"
        alt="محمد امین بزرگانی"
        width={64}
        height={64}
        className="object-cover"
      />
    </div>
    <div>
      <h3 className="font-bold text-lg mb-2">محمد امین بزرگانی</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        توسعه‌دهنده Full-Stack با ۱۰+ سال تجربه در ساخت وب‌اپلیکیشن‌های مدرن با Next.js، React و Node.js. 
        متخصص در بهینه‌سازی عملکرد، بهبود Core Web Vitals، و سئو فنی.
      </p>
      <div className="flex gap-3">
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
          GitHub
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
          LinkedIn
        </a>
        <a href={`mailto:${SITE.email}`} className="text-gray-600 hover:text-gray-900">
          Email
        </a>
      </div>
    </div>
  </div>
</section>
```

---

### ۹. اضافه کردن دکمه‌های اشتراک‌گذاری اجتماعی

**ایجاد کامپوننت:** `myResume/components/SocialShare.tsx`

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/seo';

export function SocialShare({ title, description }: { title: string; description?: string }) {
  const pathname = usePathname();
  const url = `${SITE.domain}${pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <p className="text-sm font-medium mb-3">اشتراک‌گذاری:</p>
      <div className="flex gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          aria-label="اشتراک در توییتر"
        >
          توییتر
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
          aria-label="اشتراک در لینکدین"
        >
          لینکدین
        </a>
        <a
          href={shareLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
          aria-label="اشتراک در تلگرام"
        >
          تلگرام
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
          aria-label="اشتراک در واتساپ"
        >
          واتساپ
        </a>
      </div>
    </div>
  );
}
```

**اضافه کردن به صفحه پست بلاگ:**

```tsx
import { SocialShare } from '@/components/SocialShare';

// در کامپوننت، بعد از محتوای مقاله:
<SocialShare title={post.title} description={post.description} />
```

---

### ۱۰. ایجاد صفحه حریم خصوصی

**فایل:** `myResume/app/privacy/page.tsx`

```tsx
import type { Metadata } from 'next';
import { SITE, createPageMeta } from '@/lib/seo';

export const metadata: Metadata = createPageMeta({
  title: `حریم خصوصی | ${SITE.name}`,
  description: `سیاست حریم خصوصی ${SITE.name} - اطلاعات درباره جمع‌آوری و استفاده از اطلاعات شخصی.`,
  url: `${SITE.domain}/privacy`,
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">حریم خصوصی</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">جمع‌آوری اطلاعات</h2>
        <p className="text-gray-700 dark:text-gray-300">
          ما اطلاعاتی که شما به صورت داوطلبانه در فرم تماس یا نظرات ارسال می‌کنید را جمع‌آوری می‌کنیم.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">استفاده از اطلاعات</h2>
        <p className="text-gray-700 dark:text-gray-300">
          اطلاعات جمع‌آوری شده صرفاً برای پاسخ به درخواست‌های شما و بهبود خدمات استفاده می‌شود.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">حفظ امنیت</h2>
        <p className="text-gray-700 dark:text-gray-300">
          ما از روش‌های امنیتی استاندارد برای محافظت از اطلاعات شما استفاده می‌کنیم.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">تماس با ما</h2>
        <p className="text-gray-700 dark:text-gray-300">
          اگر سوالی درباره این سیاست حریم خصوصی دارید، لطفاً با ما تماس بگیرید: 
          <a href={`mailto:${SITE.email}`} className="text-blue-600 hover:underline">
            {SITE.email}
          </a>
        </p>
      </section>

      <p className="text-sm text-gray-500">
        آخرین به‌روزرسانی: {new Date().toLocaleDateString('fa-IR')}
      </p>
    </div>
  );
}
```

**اضافه کردن به ناوبری Footer:**

فایل `myResume/components/Footer.tsx` را به‌روزرسانی کنید تا لینک حریم خصوصی شامل شود.

---

## چک‌لیست تست

بعد از پیاده‌سازی تغییرات:

- [ ] تست هدرهای امنیتی در securityheaders.com
- [ ] تأیید دسترسی robots.txt
- [ ] تست متا دیسکریپشن‌ها در Google Search Console
- [ ] بررسی alt text تصاویر در source صفحه
- [ ] تأیید ردیابی Google Analytics
- [ ] تست ساختار لینک‌دهی داخلی
- [ ] تأیید نمایش صحیح بیوگرافی نویسنده
- [ ] تست دکمه‌های اشتراک‌گذاری اجتماعی
- [ ] تأیید دسترسی صفحه حریم خصوصی
- [ ] اجرای audit Lighthouse
- [ ] تست روی دستگاه‌های موبایل
- [ ] تأیید عملکرد صحیح همه لینک‌ها

---

## نظارت

راه‌اندازی نظارت برای:

1. **Google Search Console:**
   - نظارت بر وضعیت ایندکسینگ
   - ردیابی عملکرد جستجو
   - بررسی خطاهای خزیدن
   - نظارت بر Core Web Vitals

2. **Google Analytics:**
   - ردیابی page views
   - نظارت بر نرخ پرش
   - ردیابی رفتار کاربر
   - نظارت بر رویدادهای تبدیل

3. **عملکرد:**
   - auditهای منظم Lighthouse
   - نظارت بر Core Web Vitals
   - ردیابی زمان بارگذاری صفحه
   - نظارت بر زمان پاسخ سرور

4. **ابزارهای SEO:**
   - Ahrefs/SEMrush برای بکلینک‌ها
   - نظارت بر رتبه‌بندی کلمات کلیدی
   - ردیابی اقتدار دامنه
   - نظارت بر عملکرد رقبا

---

## گام‌های بعدی

بعد از پیاده‌سازی بهبودهای اولویت بالا:

1. **هفته ۱-۲:** پیاده‌سازی همه بهبودهای اولویت بالا
2. **هفته ۳-۴:** شروع ایجاد و بهینه‌سازی محتوا
3. **ماه ۲:** شروع کمپین ساخت بکلینک
4. **ماه ۳:** بررسی و بهینه‌سازی بر اساس داده

برای استراتژی دقیق SEO، به `SEO-AUDIT-REPORT-FA.md` مراجعه کنید.

