"use client"

import { useOnboardingStore, type BrandAesthetic, type FontStyle } from "@/lib/store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const brandAesthetics: { value: BrandAesthetic; label: string; description: string }[] = [
  { value: "modern", label: "Modern", description: "Clean, contemporary design" },
  { value: "corporate", label: "Corporate", description: "Professional and traditional" },
  { value: "playful", label: "Playful", description: "Fun and energetic" },
  { value: "minimal", label: "Minimal", description: "Simple and focused" },
]

const fontStyles: { value: FontStyle; label: string }[] = [
  { value: "sans-serif", label: "Sans Serif" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "display", label: "Display" },
]

export function StepBrandStyle() {
  const { data, updateData } = useOnboardingStore()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Brand Style</h2>
        <p className="text-muted-foreground mt-1">
          Define your brand&apos;s visual identity
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Brand Aesthetic</Label>
          <div className="grid grid-cols-2 gap-4">
            {brandAesthetics.map((aesthetic) => (
              <Card
                key={aesthetic.value}
                className={`cursor-pointer p-0 transition-all hover:border-primary ${
                  data.brandAesthetic === aesthetic.value
                    ? "border-primary border-2"
                    : ""
                }`}
                onClick={() => updateData({ brandAesthetic: aesthetic.value })}
              >
                <CardContent className="p-4">
                  <div className="font-medium">{aesthetic.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {aesthetic.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                value={data.primaryColor}
                onChange={(e) => {
                  updateData({ primaryColor: e.target.value })
                }}
                className="h-10 w-20 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={data.primaryColor}
                onChange={(e) => {
                  updateData({ primaryColor: e.target.value })
                }}
                placeholder="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                type="color"
                value={data.secondaryColor}
                onChange={(e) => {
                  updateData({ secondaryColor: e.target.value })
                }}
                className="h-10 w-20 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={data.secondaryColor}
                onChange={(e) => {
                  updateData({ secondaryColor: e.target.value })
                }}
                placeholder="#8b5cf6"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Font Style</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fontStyles.map((font) => (
              <Card
                key={font.value}
                className={`cursor-pointer transition-all hover:border-primary ${
                  data.fontStyle === font.value ? "border-primary border-2" : ""
                }`}
                onClick={() => updateData({ fontStyle: font.value })}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{
                      fontFamily:
                        font.value === "sans-serif"
                          ? "system-ui, sans-serif"
                          : font.value === "serif"
                            ? "Georgia, serif"
                            : font.value === "monospace"
                              ? "monospace"
                              : "system-ui, sans-serif",
                    }}
                  >
                    Aa
                  </div>
                  <div className="text-sm">{font.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

