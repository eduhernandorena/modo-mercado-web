export function shouldCacheRequest(method: string, path: string) {
  return method === "GET" && (path.startsWith("/assets/") || path.endsWith(".css") || path.endsWith(".js"));
}
