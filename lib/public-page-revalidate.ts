/**
 * Public route ISR interval (seconds). In each page use a numeric literal:
 *   export const revalidate = 60
 * Next.js does not allow imported bindings for segment config.
 *
 * Keep PUBLIC_PAGE_REVALIDATE_SECONDS in sync with revalidate in app routes.
 */
export const PUBLIC_PAGE_REVALIDATE_SECONDS = 60;
