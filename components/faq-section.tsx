import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Nano Banana?",
    answer:
      "Nano Banana is a revolutionary AI image editing model that transforms photos using natural language prompts. It's currently one of the most powerful image editing models available, with exceptional consistency. It offers superior performance for consistent character editing and scene preservation.",
  },
  {
    question: "How does it work?",
    answer:
      "Simply upload an image and describe your desired edits in natural language. The AI understands complex instructions like 'place the creature in a snowy mountain' or 'imagine the whole face and create it'. It processes your text prompt and generates perfectly edited images.",
  },
  {
    question: "How is Nano Banana different from other AI editors?",
    answer:
      "Nano Banana excels in character consistency, scene blending, and one-shot editing. Users report it preserves facial features exceptionally well and seamlessly integrates edits with backgrounds. It also supports multi-image context, making it ideal for creating consistent AI influencers.",
  },
  {
    question: "Can I use it for commercial projects?",
    answer:
      "Yes! Nano Banana is perfect for creating AI UGC content, social media campaigns, and marketing materials. Many users leverage it for creating consistent AI influencers and product photography. The high-quality outputs are suitable for professional use.",
  },
  {
    question: "What types of edits can it handle?",
    answer:
      "The editor handles complex edits including face completion, background changes, object placement, style transfers, and character modifications. It excels at understanding contextual instructions like 'place in a blizzard' or 'create the whole face' while maintaining photorealistic quality.",
  },
  {
    question: "Where can I try Nano Banana?",
    answer:
      "You can try Nano Banana directly on this website! Simply scroll up to the AI Editor section, upload your image, enter a text prompt describing your desired edits, and watch as Nano Banana AI transforms your photo with incredible accuracy and consistency.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">FAQs</h2>
          <p className="text-lg text-muted-foreground">Frequently Asked Questions</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border/50 bg-card/50 px-6 backdrop-blur"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
