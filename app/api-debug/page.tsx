import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ApiDebugPage() {
  const apiUrl = process.env.NEXT_PUBLIC_CMS_API || 'http://localhost:4000';
  const nodeEnv = process.env.NODE_ENV;
  
  let posts: Awaited<ReturnType<typeof getAllPosts>>;
  let error: string | null = null;
  let fetchStatus: 'success' | 'error' | 'pending' = 'pending';
  let apiResponse: any = null;
  
  try {
    const testUrl = `${apiUrl}/v1/posts?status=published&limit=5`;
    console.log(`[ApiDebug] Testing API: ${testUrl}`);
    
    const res = await fetch(testUrl, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    fetchStatus = res.ok ? 'success' : 'error';
    apiResponse = {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries())
    };
    
    if (res.ok) {
      const data = await res.json();
      apiResponse.data = data;
    } else {
      const text = await res.text();
      apiResponse.errorText = text;
    }
    
    posts = await getAllPosts();
  } catch (err) {
    fetchStatus = 'error';
    error = err instanceof Error ? err.message : String(err);
    posts = [];
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">API Debug Information</h1>
      
      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
        <div className="space-y-2 font-mono text-sm">
          <div>
            <strong>NEXT_PUBLIC_CMS_API:</strong>{' '}
            <span className={apiUrl === 'http://localhost:4000' ? 'text-red-600' : 'text-green-600'}>
              {apiUrl || 'NOT SET'}
            </span>
          </div>
          <div>
            <strong>NODE_ENV:</strong> {nodeEnv}
          </div>
        </div>
      </section>
      
      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">API Test Result</h2>
        <div className="space-y-2">
          <div>
            <strong>Status:</strong>{' '}
            <span className={fetchStatus === 'success' ? 'text-green-600' : 'text-red-600'}>
              {fetchStatus.toUpperCase()}
            </span>
          </div>
          {error && (
            <div className="text-red-600">
              <strong>Error:</strong> {error}
            </div>
          )}
          {apiResponse && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Response Details:</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Posts Count</h2>
        <div className="text-lg">
          <strong>Total Posts Retrieved:</strong> {posts.length}
        </div>
        {posts.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">First 3 Posts:</h3>
            <ul className="list-disc list-inside space-y-1">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug}>{post.title}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      
      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>اگر NEXT_PUBLIC_CMS_API تنظیم نشده باشد، به localhost:4000 متصل می‌شود</li>
          <li>مطمئن شوید که API در دسترس است و CORS به درستی تنظیم شده</li>
          <li>بررسی کنید که API در مسیر /v1/posts?status=published پاسخ می‌دهد</li>
          <li>لاگ‌های سرور را برای جزئیات بیشتر بررسی کنید</li>
        </ul>
      </section>
    </div>
  );
}

