"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { FileRejection } from "react-dropzone"
import { useOnboardingStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus, Upload } from "lucide-react"
import { Dropzone, DropzoneEmptyState } from "@/components/kibo-ui/dropzone"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

const linkFormSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL (e.g., https://example.com)")
    .refine(
      (url) => {
        try {
          const urlObj = new URL(url)
          return urlObj.protocol === "http:" || urlObj.protocol === "https:"
        } catch {
          return false
        }
      },
      {
        message: "URL must start with http:// or https://",
      }
    ),
})

type LinkFormValues = z.infer<typeof linkFormSchema>

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]

export function StepInspiration() {
  const { data, addInspirationLink, removeInspirationLink, addInspirationImage, removeInspirationImage } =
    useOnboardingStore()

  const linkForm = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      url: "",
    },
  })

  const handleAddLink = (values: LinkFormValues) => {
    const trimmedUrl = values.url.trim()
    // Check for duplicates
    if (data.inspirationLinks.includes(trimmedUrl)) {
      linkForm.setError("url", {
        type: "manual",
        message: "This URL has already been added",
      })
      return
    }
    addInspirationLink(trimmedUrl)
    linkForm.reset()
  }

  const validateImageFile = (file: File): string | null => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.map((t) => t.split("/")[1]).join(", ")}`
    }

    // Check file size
    if (file.size > MAX_IMAGE_SIZE) {
      return `File size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB limit`
    }

    return null
  }

  const handleImageDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Handle rejected files
    if (fileRejections && fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === "file-too-large") {
            console.error(`File ${file.name} is too large. Maximum size is ${MAX_IMAGE_SIZE / 1024 / 1024}MB`)
          } else if (error.code === "file-invalid-type") {
            console.error(`File ${file.name} has an invalid type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`)
          }
        })
      })
      return
    }

    // Handle accepted files
    acceptedFiles.forEach((file) => {
      const validationError = validateImageFile(file)
      if (validationError) {
        console.error(`Validation error for ${file.name}: ${validationError}`)
        return
      }

      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substring(7)
        const url = URL.createObjectURL(file)
        addInspirationImage({ id, url, file })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Inspiration</h2>
        <p className="text-muted-foreground mt-1">
          Share websites and images that inspire your brand
        </p>
      </div>

      <div className="space-y-6">
        <Form {...linkForm}>
          <form onSubmit={linkForm.handleSubmit(handleAddLink)} className="space-y-6">
            <FormField
              control={linkForm.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-base font-medium">Inspiration Websites</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="https://example.com"
                        className="flex-1"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            linkForm.handleSubmit(handleAddLink)()
                          }
                        }}
                      />
                    </FormControl>
                    <Button type="submit" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormDescription className="text-sm text-muted-foreground">
                    Add URLs of websites that inspire your brand design
                  </FormDescription>
                  {linkForm.formState.errors.url && (
                    <p className="text-sm text-destructive mt-1">
                      {linkForm.formState.errors.url.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>

        {data.inspirationLinks.length > 0 && (
          <div className="space-y-2">
            {data.inspirationLinks.map((link, index) => (
              <Card key={index} className="p-2 px-4">
                <CardContent className="p-0 flex items-center justify-between">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex-1 truncate"
                  >
                    {link}
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInspirationLink(index)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div>
          <Label className="text-base font-medium mb-3 block">Inspiration Images</Label>
          <Dropzone
            accept={{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/gif": [".gif"],
              "image/webp": [".webp"],
            }}
            onDrop={handleImageDrop}
            maxFiles={undefined}
            maxSize={MAX_IMAGE_SIZE}
            className="w-full"
          >
            <DropzoneEmptyState>
              <div className="flex flex-col items-center justify-center">
                <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground mb-2">
                  <Upload className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">Upload Images</p>
                <p className="text-xs text-muted-foreground">
                  Drag and drop or click to upload (Max {MAX_IMAGE_SIZE / 1024 / 1024}MB per file)
                </p>
              </div>
            </DropzoneEmptyState>
          </Dropzone>
          <p className="text-sm text-muted-foreground mt-2">
            Upload images that inspire your brand. Supported formats: JPG, PNG, GIF, WebP (Max {MAX_IMAGE_SIZE / 1024 / 1024}MB per file)
          </p>

          {data.inspirationImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {data.inspirationImages.map((image) => (
                <Card key={image.id} className="relative overflow-hidden p-0!">
                  <div className="aspect-video relative">
                    <img
                      src={image.url}
                      alt="Inspiration"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        removeInspirationImage(image.id)
                        URL.revokeObjectURL(image.url)
                      }}
                      className="absolute top-2 right-2 h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

