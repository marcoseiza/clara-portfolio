import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "./routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (routes[pathname])
    return NextResponse.redirect(new URL(routes[pathname], request.url));
}
