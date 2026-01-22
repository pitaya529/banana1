import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // no-op
  }

  return NextResponse.redirect(new URL("/", request.nextUrl.origin), { status: 303 })
}
