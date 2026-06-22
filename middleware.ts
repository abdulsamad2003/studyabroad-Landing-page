import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBuildTimeDomainConfig } from "@/config/build-config";
import { isHostAllowed } from "@/config/domain-guards";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const host = request.headers.get("host");
  const config = getBuildTimeDomainConfig();

  if (!isHostAllowed(host, config.allowedHosts, { allowVercelPreview: true })) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
