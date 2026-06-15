'use client';
import { useState, useEffect } from 'react';

export function ClientDate({ dateString, options }: { dateString: string, options?: Intl.DateTimeFormatOptions }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    try {
      const date = new Date(dateString);
      setFormattedDate(date.toLocaleDateString('fa-IR', options));
    } catch (e) {
      setFormattedDate(dateString);
    }
  }, [dateString, options]);

  if (!formattedDate) {
    // Show an empty span or a skeleton during SSR to avoid hydration mismatch completely
    return <span className="opacity-0">Loading...</span>;
  }

  return <span>{formattedDate}</span>;
}
