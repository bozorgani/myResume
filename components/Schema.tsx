import React from 'react';

// تزریق داده ساختاریافته JSON-LD به <head> برای سئو
export function Schema({ json }: { json: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // استفاده از dangerouslySetInnerHTML روش توصیه‌شده برای تعبیه JSON-LD است
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}


