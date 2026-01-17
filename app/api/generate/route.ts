import { NextResponse } from "next/server"

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

export const runtime = "nodejs"

function getRequiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

function extractImageUrls(messageContent: unknown): string[] {
  // OpenRouter is OpenAI-compatible, but image models may return an array of parts.
  // We defensively extract any {type:"image_url", image_url:{url:string}} parts.
  if (typeof messageContent === "string") {
    const s = messageContent.trim()
    if (!s) return []
    const m = s.match(/https?:\/\/\S+|data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/g)
    return m ? m.map((u) => u.replace(/[)\]>\"']+$/, "")) : []
  }
  if (!Array.isArray(messageContent)) return []

  const normalize = (u: string): string => {
    const url = u.trim()
    if (!url) return url
    if (url.startsWith("data:")) return url
    if (url.startsWith("http://") || url.startsWith("https://")) return url
    // Heuristic: some providers may return raw base64 without a data URL prefix.
    if (/^[A-Za-z0-9+/]+={0,2}$/.test(url) && url.length > 1000) {
      return `data:image/png;base64,${url}`
    }
    return url
  }

  const urls: string[] = []
  for (const part of messageContent) {
    if (!part || typeof part !== "object") continue
    const type = (part as any).type
    if (type !== "image_url" && type !== "image") continue
    const url = (part as any).image_url?.url || (part as any).url
    if (typeof url === "string" && url.length > 0) urls.push(normalize(url))
  }
  return urls
}

function extractImageUrlsFromImagesField(imagesField: unknown): string[] {
  // OpenRouter image generation responses can include `message.images`.
  // https://openrouter.ai/docs/docs/overview/multimodal/image-generation
  if (!Array.isArray(imagesField)) return []
  const out: string[] = []
  for (const item of imagesField) {
    if (!item || typeof item !== "object") continue
    const type = (item as any).type
    if (type !== "image_url" && type !== "image") continue
    const url = (item as any).image_url?.url || (item as any).url
    if (typeof url === "string" && url.trim()) out.push(url.trim())
  }
  return out
}

async function fileToDataUrl(file: File): Promise<string> {
  const mime = file.type || "application/octet-stream"
  const buf = Buffer.from(await file.arrayBuffer())
  return `data:${mime};base64,${buf.toString("base64")}`
}

async function callGeminiFlashImage(args: { prompt: string; imageDataUrl?: string }): Promise<string[]> {
  const apiKey = getRequiredEnv("OPENROUTER_API_KEY")

  const content: Array<any> = [{ type: "text", text: args.prompt }]
  if (args.imageDataUrl) {
    content.push({ type: "image_url", image_url: { url: args.imageDataUrl } })
  }

  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Optional: helps OpenRouter rankings/analytics. Configure in .env.local if you want.
      ...(process.env.OPENROUTER_HTTP_REFERER ? { "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER } : {}),
      ...(process.env.OPENROUTER_X_TITLE ? { "X-Title": process.env.OPENROUTER_X_TITLE } : {}),
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content }],
      // Required to actually get images back for image-generation models on OpenRouter.
      modalities: ["image", "text"],
    }),
  })

  const json = await res.json().catch(() => null)
  if (!res.ok) {
    const message =
      (json && typeof json === "object" && (json as any).error && (json as any).error.message) ||
      (json && typeof json === "object" && (json as any).error) ||
      `OpenRouter request failed: ${res.status}`
    throw new Error(message)
  }

  const message = json?.choices?.[0]?.message
  const urlsFromImages = extractImageUrlsFromImagesField(message?.images)
  const urlsFromContent = extractImageUrls(message?.content)
  const urls = urlsFromImages.length > 0 ? urlsFromImages : urlsFromContent

  // Some providers may return a plain string or omit image parts; in that case, return nothing.
  return urls
}

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const prompt = String(form.get("prompt") || "").trim()
    const batchMode = String(form.get("batch_mode") || "") === "true"

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const files = form.getAll("images").filter((v): v is File => v instanceof File)

    // If no image is provided, still allow text-only generation.
    if (files.length === 0) {
      const images = await callGeminiFlashImage({ prompt })
      return NextResponse.json({ images })
    }

    if (!batchMode) {
      const first = files[0]
      const dataUrl = await fileToDataUrl(first)
      const images = await callGeminiFlashImage({ prompt, imageDataUrl: dataUrl })
      return NextResponse.json({ images })
    }

    // Batch mode: one request per image (simple + predictable mapping).
    const out: string[] = []
    for (const f of files) {
      const dataUrl = await fileToDataUrl(f)
      const urls = await callGeminiFlashImage({ prompt, imageDataUrl: dataUrl })
      out.push(...urls)
    }

    return NextResponse.json({ images: out })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown error" }, { status: 500 })
  }
}
