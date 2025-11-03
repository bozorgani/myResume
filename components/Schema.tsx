import React from 'react';

// Injects JSON-LD structured data into <head> for SEO
export function Schema({ json }: { json: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Using dangerouslySetInnerHTML is the recommended way to embed JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}


