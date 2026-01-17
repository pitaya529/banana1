import Link from "next/link"
import { Banana } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-banana text-banana-foreground">
              <Banana className="h-4 w-4" />
            </div>
            <span className="font-bold">Nano Banana</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Blog
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">© 2026 Nano Banana. All rights reserved.</p>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Nano Banana is not related to Google or other AI companies.</p>
        </div>
      </div>
    </footer>
  )
}
