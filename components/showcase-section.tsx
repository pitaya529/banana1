import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap } from "lucide-react"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    image: "/stunning-mountain-landscape-with-snow-peaks-at-sun.jpg",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    image: "/beautiful-zen-garden-with-cherry-blossoms.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    image: "/tropical-beach-with-crystal-clear-water-and-palm-t.jpg",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    image: "/northern-lights-aurora-borealis-over-snowy-mountai.jpg",
  },
]

export function ShowcaseSection() {
  return (
    <section id="showcase" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Showcase</h2>
          <p className="text-lg text-muted-foreground">Lightning-Fast AI Creations</p>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {showcaseItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-banana text-banana-foreground">
                    <Zap className="mr-1 h-3 w-3" />
                    Nano Banana Speed
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Experience the power of Nano Banana yourself</p>
          <Button size="lg" className="bg-banana text-banana-foreground hover:bg-banana/90">
            Try Nano Banana Generator
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
