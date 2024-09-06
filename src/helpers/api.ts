import * as process from 'process';
import { getFromKV } from '@/helpers/kv';

class Fetcher {
  isProd: boolean;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.isProd = process.env.NODE_ENV === 'production';
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }

  async get<T>(url: string, kvKey?: string): Promise<T> {
    if (kvKey && this.isProd) {
      const kvData = await getFromKV<T>(kvKey);

      if (kvData !== null) {
        return kvData;
      }
    }

    const fullUrl = `${this.baseUrl}${url}`;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 0
      }
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} ${response.statusText} at ${fullUrl} - ${responseData.message || 'Unknown error'}`
      );
    }

    return responseData;
  }
}

const baseUrl = process.env.KLYNTAR_NODE_URL || 'http://localhost:7332';
const fetcher = new Fetcher(baseUrl);

export default fetcher;
