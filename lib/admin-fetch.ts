/** Max time to wait for admin API responses before the UI stops waiting (Mongo/network hang). */
export const ADMIN_FETCH_TIMEOUT_MS = 25_000;

/**
 * Same as fetch with credentials, plus a timeout so the dashboard never spins forever.
 */
export function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    credentials: init.credentials ?? "same-origin",
    signal: init.signal ?? AbortSignal.timeout(ADMIN_FETCH_TIMEOUT_MS),
  });
}

export function isAbortOrTimeoutError(e: unknown): boolean {
  if (e instanceof DOMException && e.name === "AbortError") return true;
  if (e instanceof Error && e.name === "AbortError") return true;
  return false;
}
