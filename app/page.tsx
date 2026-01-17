import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ImageEditor } from "@/components/image-editor"
import { FeaturesSection } from "@/components/features-section"
import { ShowcaseSection } from "@/components/showcase-section"
import { ReviewsSection } from "@/components/reviews-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ImageEditor />
      <FeaturesSection />
      <ShowcaseSection />
      <ReviewsSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
