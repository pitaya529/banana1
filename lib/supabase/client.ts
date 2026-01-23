import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // 同时尝试读取两个可能的变量名，确保万无一失
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    // 线上环境先在控制台报错，而不是直接崩溃
    console.error("Supabase 配置缺失: 请检查环境变量是否正确注入");
    return null;
  }

  return createBrowserClient(url, key)
}