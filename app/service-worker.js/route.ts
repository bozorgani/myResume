import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Empty service worker to prevent 404 errors
export async function GET() {
  const serviceWorkerScript = `
// Empty service worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
  `.trim();

  return new NextResponse(serviceWorkerScript, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}



