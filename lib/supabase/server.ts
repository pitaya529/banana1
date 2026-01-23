import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // 同时尝试两个可能的变量名
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // 线上环境建议打印日志以便排查，而不是单纯抛出 Error
    console.error("Missing Supabase URL or Key in Server Client");
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or Key")
  }

  const cookieStore = await cookies()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // 被 Server Component 调用时无法设置 cookie 是正常的
        }
      },
    },
  })
}