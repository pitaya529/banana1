import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">登录失败</h1>
      <p className="text-sm text-muted-foreground">
        {error ? `原因：${error}` : "未知原因"}
      </p>
      <Link className="text-sm underline underline-offset-4" href="/">
        返回首页
      </Link>
    </main>
  )
}
