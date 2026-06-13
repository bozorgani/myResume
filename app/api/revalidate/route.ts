import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET;

    // Optional: Protect the route with a secret token
    if (secret && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { path, tag, type = 'page' } = body;

    if (!path && !tag) {
      return NextResponse.json(
        { message: 'Missing path or tag in request body' },
        { status: 400 }
      );
    }

    if (path) {
      // type can be 'page' or 'layout'
      revalidatePath(path, type as "page" | "layout");
      return NextResponse.json({ revalidated: true, path, type, now: Date.now() });
    }

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
