"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, ImageIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Banana decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 text-8xl opacity-10 rotate-[-30deg]">🍌</div>
        <div className="absolute -right-10 top-40 text-7xl opacity-10 rotate-[20deg]">🍌</div>
        <div className="absolute bottom-20 left-1/4 text-6xl opacity-10 rotate-[45deg]">🍌</div>
        <div className="absolute bottom-40 right-1/3 text-5xl opacity-10 rotate-[-15deg]">🍌</div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 border-banana/20 bg-banana/10 text-banana-foreground">
            <Sparkles className="mr-1 h-3 w-3" />
            NEW: Nano Banana Pro is now live
          </Badge>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            Transform Images with{" "}
            <span className="bg-gradient-to-r from-banana to-amber-500 bg-clip-text text-transparent">AI Magic</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
            Transform any image with simple text prompts. Nano Banana's advanced model delivers consistent character
            editing and scene preservation. Experience the future of AI image editing.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-banana text-banana-foreground hover:bg-banana/90">
              <Zap className="mr-2 h-5 w-5" />
              Start Editing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <ImageIcon className="mr-2 h-5 w-5" />
              View Examples
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              One-shot editing
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-banana" />
              Multi-image support
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              Natural language
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
