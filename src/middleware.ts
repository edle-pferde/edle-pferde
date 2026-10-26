import { defineMiddleware } from "astro:middleware";

// Keep the Keystatic admin UI and API out of search indexes
const NOINDEX_PATHS = /^\/(api\/)?keystatic(\/|$)/;

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (NOINDEX_PATHS.test(context.url.pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
});
