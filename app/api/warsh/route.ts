import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'No page' }, { status: 400 });

  const url = `https://easyquran.com/wp-content/uploads/2022/10/${page}-scaled.jpg`;

  const res = await fetch(url, {
    headers: {
      'Referer': 'https://easyquran.com',
      'User-Agent': 'Mozilla/5.0',
    },
  });

  if (!res.ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const buffer = await res.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}