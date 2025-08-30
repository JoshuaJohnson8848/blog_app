const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  auth?: boolean;
}

export async function apiClient(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {

  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  if (options.auth && !token) {
    throw new Error('Authentication required but no token found.');
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && options.auth !== false && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.log(e);
      errorMessage = await res.text();
    }
    throw new Error(errorMessage);
  }

  return res.json();
}