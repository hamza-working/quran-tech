import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  if (!page) return NextResponse.json({ error: 'No page' }, { status: 400 });

  const url = `https://easyquran.com/wp-content/uploads/2022/10/${page}-scaled.jpg`;

const res = await fetch(url, {
  headers: {
    'Referer': 'https://easyquran.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
    'Accept-Language': 'ar,en;q=0.9',
    'sec-fetch-dest': 'image',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-site': 'same-origin',
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