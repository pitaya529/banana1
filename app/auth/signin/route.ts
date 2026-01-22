import { createClient } from "@/lib/supabase/server"
import type { Provider } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

const ALLOWED_PROVIDERS = new Set<Provider>(["google"])

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider") as Provider | null
  const next = request.nextUrl.searchParams.get("next") ?? "/"

  if (!provider || !ALLOWED_PROVIDERS.has(provider)) {
    return NextResponse.redirect(
      new URL(`/auth/error?error=unsupported_provider`, request.url),
    )
  }

  try {
    const supabase = await createClient()
    const redirectTo = new URL("/auth/callback", request.nextUrl.origin)
    redirectTo.searchParams.set("next", next)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo.toString(),
      },
    })

    if (error || !data.url) {
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=${encodeURIComponent(
            error?.message ?? "oauth_failed",
          )}`,
          request.url,
        ),
      )
    }

    return NextResponse.redirect(data.url)
  } catch (e) {
    return NextResponse.redirect(
      new URL(
        `/auth/error?error=${encodeURIComponent(
          e instanceof Error ? e.message : "signin_failed",
        )}`,
        request.url,
      ),
    )
  }
}
