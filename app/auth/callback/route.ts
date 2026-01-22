import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const next = request.nextUrl.searchParams.get("next") ?? "/"

  if (!code) {
    return NextResponse.redirect(
      new URL(`/auth/error?error=missing_code`, request.url),
    )
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(
        new URL(`/auth/error?error=${encodeURIComponent(error.message)}`, request.url),
      )
    }

    return NextResponse.redirect(new URL(next, request.nextUrl.origin))
  } catch (e) {
    return NextResponse.redirect(
      new URL(
        `/auth/error?error=${encodeURIComponent(
          e instanceof Error ? e.message : "callback_failed",
        )}`,
        request.url,
      ),
    )
  }
}
