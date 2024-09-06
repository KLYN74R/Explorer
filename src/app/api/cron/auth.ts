export function checkAuthorization(request: Request, timestamp: string): Response | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.error(`[${timestamp}] [ERROR] Unauthorized access attempt`);
    return new Response('Unauthorized', { status: 401 });
  }

  return null;
}
