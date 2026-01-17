import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "AIArtistPro",
    role: "Digital Creator",
    avatar: "AA",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of other tools!",
    rating: 5,
  },
  {
    name: "ContentCreator",
    role: "UGC Specialist",
    avatar: "CC",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    rating: 5,
  },
  {
    name: "PhotoEditor",
    role: "Professional Editor",
    avatar: "PE",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    rating: 5,
  },
  {
    name: "MarketingPro",
    role: "Brand Manager",
    avatar: "MP",
    content:
      "We've cut our content production time in half. The AI understands exactly what we need for our campaigns.",
    rating: 5,
  },
  {
    name: "DesignLead",
    role: "Creative Director",
    avatar: "DL",
    content: "The natural language prompts are incredibly intuitive. My team picked it up in minutes and loves it!",
    rating: 5,
  },
  {
    name: "SocialGuru",
    role: "Influencer",
    avatar: "SG",
    content:
      "Game changer for creating consistent content. My followers can't tell the difference from professional shoots!",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section className="relative py-20">
      {/* Banana decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-10 text-5xl opacity-5 rotate-[30deg]">🍌</div>
        <div className="absolute bottom-20 right-1/4 text-6xl opacity-5 rotate-[-25deg]">🍌</div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">User Reviews</h2>
          <p className="text-lg text-muted-foreground">What creators are saying</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur transition-all hover:border-banana/30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-banana/20">
                    <AvatarImage
                      src={`/professional-avatar.png?height=40&width=40&query=professional avatar ${review.name}`}
                    />
                    <AvatarFallback className="bg-banana/10 text-banana-foreground text-sm font-medium">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-banana text-banana" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{review.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
