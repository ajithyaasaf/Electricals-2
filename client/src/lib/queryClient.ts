import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const [url, ...params] = queryKey;
    let fetchUrl = url as string;
    
    // Build query string if there are parameters
    if (params.length > 0) {
      const queryParams = new URLSearchParams();
      
      // Handle different parameter patterns
      if (params.length === 3) {
        // Products query: [search, category, limit]
        const [search, category, limit] = params;
        if (search) queryParams.append('search', search as string);
        if (category && category !== 'all') queryParams.append('categoryId', category as string);
        if (limit) queryParams.append('limit', limit.toString());
      }
      
      if (queryParams.toString()) {
        fetchUrl += '?' + queryParams.toString();
      }
    }

    const res = await fetch(fetchUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
