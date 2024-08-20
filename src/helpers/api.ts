class Fetcher {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  }

  async get<T>(url: string): Promise<T> {
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
