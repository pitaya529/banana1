"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Sparkles, Copy, ExternalLink, ImageIcon, X, Loader2 } from "lucide-react"

type UploadedImage = {
  file: File
  preview_url: string
}

export function ImageEditor() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("nano-banana")
  const [batchMode, setBatchMode] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const nextFiles = Array.from(files)

      nextFiles.forEach((file) => {
        if (!file.type.startsWith("image/")) return
        if (file.size > 10 * 1024 * 1024) {
          alert("File size must be less than 10MB")
          return
        }
        if (images.length >= 9) return

        const reader = new FileReader()
        reader.onload = (event) => {
          const preview = event.target?.result
          if (!preview) return

          setImages((prev) => {
            if (prev.length >= 9) return prev
            return [...prev, { file, preview_url: preview as string }]
          })
        }
        reader.readAsDataURL(file)
      })
    },
    [images.length],
  )

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return
      addFiles(files)
      // Allow selecting the same file again.
      e.target.value = ""
    },
    [addFiles],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      addFiles(files)
    },
    [addFiles],
  )

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedImages([])

    try {
      const formData = new FormData()
      formData.set("prompt", prompt)
      formData.set("batch_mode", batchMode ? "true" : "false")
      formData.set("ui_model", model)
      images.forEach((img) => formData.append("images", img.file))

      const res = await fetch("/api/generate", { method: "POST", body: formData })
      if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw new Error(err?.error || `Request failed: ${res.status}`)
      }

      const data = (await res.json()) as { images?: string[] }
      const imgs = Array.isArray(data.images) ? data.images : []
      if (imgs.length === 0) {
        alert("API 没有返回图片（images 为空）。请检查：1) 是否已上传图片 2) .env.local 的 OPENROUTER_API_KEY 是否正确 3) 账号余额/权限 4) 提示词是否过于简单")
      }
      setGeneratedImages(imgs)
    } catch (e) {
      alert(e instanceof Error ? e.message : "Generate failed")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="editor" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get Started</h2>
          <p className="text-lg text-muted-foreground">Try The AI Editor</p>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Experience the power of Nano Banana's natural language image editing. Transform any photo with simple text
            commands.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-banana" />
                Prompt Engine
              </CardTitle>
              <CardDescription>Transform your image with AI-powered editing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="image-to-image">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
                  <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
                </TabsList>
                <TabsContent value="image-to-image" className="mt-4">
                  {/* Model Selection */}
                  <div className="space-y-3">
                    <Label>AI Model Selection</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nano-banana">🍌 Nano Banana</SelectItem>
                        <SelectItem value="nano-banana-pro">🍌 Nano Banana Pro</SelectItem>
                        <SelectItem value="seedream">SeeDream 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Different models offer unique characteristics and styles
                    </p>
                  </div>

                  {/* Batch Mode */}
                  <div className="mt-4 flex items-center justify-between rounded-lg border border-border/50 p-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="batch-mode">Batch Processing</Label>
                      <Badge variant="secondary" className="bg-banana/10 text-banana-foreground text-xs">
                        Pro
                      </Badge>
                    </div>
                    <Switch id="batch-mode" checked={batchMode} onCheckedChange={setBatchMode} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enable batch mode to process multiple images at once
                  </p>

                  {/* Image Upload */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Reference Image</Label>
                      <span className="text-xs text-muted-foreground">{images.length}/9</span>
                    </div>

                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="relative rounded-lg border-2 border-dashed border-border/50 p-6 text-center transition-colors hover:border-banana/50 hover:bg-banana/5"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                      <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">Add Image</p>
                      <p className="text-xs text-muted-foreground">Max 10MB</p>
                    </div>

                    {/* Uploaded Images Preview */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((img, index) => (
                          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
                            <img
                              src={img.preview_url || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute right-1 top-1 rounded-full bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-3 w-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="text-to-image" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Generate images from text descriptions without a reference image.
                  </p>
                </TabsContent>
              </Tabs>

              {/* Prompt Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Main Prompt</Label>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  placeholder="Describe your desired edits... e.g., 'Place the character in a snowy mountain'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Want more powerful image generation features?</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-banana">
                  Visit Full Generator
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <Button
                className="w-full bg-banana text-banana-foreground hover:bg-banana/90"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-banana" />
                Output Gallery
              </CardTitle>
              <CardDescription>Your ultra-fast AI creations appear here instantly</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {generatedImages.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg border border-border/50">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Generated ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20 p-8 text-center">
                  <div className="mb-4 rounded-full bg-banana/10 p-4">
                    <ImageIcon className="h-8 w-8 text-banana" />
                  </div>
                  <p className="font-medium">Ready for instant generation</p>
                  <p className="mt-1 text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Want more powerful image generation features?</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-banana">
                  Visit Full Generator
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
