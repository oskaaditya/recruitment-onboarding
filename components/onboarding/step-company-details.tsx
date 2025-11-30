"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useOnboardingStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useEffect } from "react"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Other",
]

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  tagline: z.string().optional(),
  industry: z.string().min(1, "Please select an industry"),
})

export function StepCompanyDetails() {
  const { data, updateData } = useOnboardingStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: data.companyName,
      tagline: data.tagline,
      industry: data.industry,
    },
  })

  useEffect(() => {
    form.reset({
      companyName: data.companyName,
      tagline: data.tagline,
      industry: data.industry,
    })
  }, [data, form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Company Details</h2>
        <p className="text-muted-foreground mt-1">
          Tell us about your recruitment company
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Recruitment"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      updateData({ companyName: e.target.value })
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The name of your recruitment company
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Connecting talent with opportunity"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      updateData({ tagline: e.target.value })
                    }}
                  />
                </FormControl>
                <FormDescription>
                  A short tagline that describes your company
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      updateData({ industry: value })
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The primary industry you recruit for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

