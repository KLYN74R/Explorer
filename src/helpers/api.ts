class Fetcher {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
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
      throw new Error(`API error: ${responseData.message || 'Unknown error'}`);
    }

    return responseData;
  }
}

const baseUrl = process.env.KLYNTAR_NODE_URL || 'http://localhost:7332';
const fetcher = new Fetcher(baseUrl);

export default fetcher;
