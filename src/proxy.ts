import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/forgot-password(.*)',
  '/verify-otp(.*)',
  '/reset-password(.*)',
  '/verify-email(.*)',
  '/sso-callback(.*)',
  '/about(.*)',
  '/contact(.*)',
  '/blog(.*)',
  '/careers(.*)',
  '/press(.*)',
  '/terms(.*)',
  '/privacy(.*)',
  '/cookies(.*)',
  '/gdpr(.*)',
  '/licenses(.*)',
  '/listing/(.*)',
  '/api/webhook(.*)',
]);

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/auctions/create(.*)',
  '/bids(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect specific routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
