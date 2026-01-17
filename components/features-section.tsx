import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, User, Layers, Zap, Images, Users } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Editing",
    description:
      "Edit images using simple text prompts. Nano Banana AI understands complex instructions like GPT for images.",
  },
  {
    icon: User,
    title: "Character Consistency",
    description:
      "Maintain perfect character details across edits. This model excels at preserving faces and identities.",
  },
  {
    icon: Layers,
    title: "Scene Preservation",
    description: "Seamlessly blend edits with original backgrounds. Superior scene fusion for realistic results.",
  },
  {
    icon: Zap,
    title: "One-Shot Editing",
    description:
      "Perfect results in a single attempt. Nano Banana solves one-shot image editing challenges effortlessly.",
  },
  {
    icon: Images,
    title: "Multi-Image Context",
    description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows.",
  },
  {
    icon: Users,
    title: "AI UGC Creation",
    description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20">
      {/* Banana decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-10 top-10 text-6xl opacity-5 rotate-[15deg]">🍌</div>
        <div className="absolute bottom-10 left-10 text-7xl opacity-5 rotate-[-20deg]">🍌</div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Core Features</h2>
          <p className="text-lg text-muted-foreground">Why Choose Nano Banana?</p>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Nano Banana is the most advanced AI image editor. Revolutionize your photo editing with natural language
            understanding.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-border/50 bg-card/50 backdrop-blur transition-all hover:border-banana/30 hover:shadow-lg hover:shadow-banana/5"
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-banana/10 text-banana transition-colors group-hover:bg-banana group-hover:text-banana-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
