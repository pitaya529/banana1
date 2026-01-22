import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Banana, Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function Header() {
  let userEmail: string | null = null

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    userEmail = user?.email ?? null
  } catch {
    // Supabase not configured; render logged-out UI.
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-banana text-banana-foreground">
            <Banana className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Nano Banana</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#editor"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Editor
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#showcase"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Showcase
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {userEmail ? (
            <>
              <span className="hidden max-w-[220px] truncate text-sm text-muted-foreground sm:inline">
                {userEmail}
              </span>
              <form action="/auth/signout" method="post" className="hidden sm:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  type="submit"
                >
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden bg-transparent sm:flex"
            >
              <Link href="/auth/signin?provider=google&next=/">Sign In</Link>
            </Button>
          )}
          <Button size="sm" className="bg-banana text-banana-foreground hover:bg-banana/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Try Pro
          </Button>
        </div>
      </div>
    </header>
  )
}
