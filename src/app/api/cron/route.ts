import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  console.log('CRON - REQUEST');

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {

    console.log('CRON - ERROR');

    return new Response('Unauthorized', {
        status: 401,
    });
  }

  console.log('CRON - SUCCESS');

  return Response.json({ success: true });
}