import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth) => {
  console.log(auth); // Use the auth parameter
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all routes except for static files and _next
    "/",
    "/(api|trpc)(.*)",
    "/auth/sign-in(.*)",
    "/auth/sign-up(.*)",
  ],
};