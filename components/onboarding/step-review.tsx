"use client"

import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useOnboardingStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Printer, ExternalLink } from "lucide-react"
import { LiveBrandingPreview } from "./live-branding-preview"
import { WebsitePreview } from "./website-preview"
import Link from "next/link"

export function StepReview() {
  const { data, setCurrentStep } = useOnboardingStore()
  const printRef = useRef<HTMLDivElement>(null)

  const handleExportJSON = () => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${data.companyName || "onboarding"}-config.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${data.companyName || "Onboarding"} - Review`,
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          .print-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .print-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            page-break-inside: avoid;
          }
          
          .print-card {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 1rem;
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
          
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 1.5rem;
          }
          
          /* Website Preview Print Styles */
          .print-container [class*="min-h-screen"],
          .print-container [class*="min-h-"] {
            min-height: auto !important;
            height: auto !important;
          }
          
          .print-container [class*="max-w-"] {
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .print-container [class*="px-"],
          .print-container [class*="py-"] {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
          }
          
          .print-container section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 0.75rem !important;
            padding: 0.5rem !important;
            overflow: visible !important;
          }
          
          .print-container [class*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          
          .print-container [class*="space-y-"] > * + * {
            margin-top: 0.5rem !important;
          }
          
          .print-container [class*="space-x-"] > * + * {
            margin-left: 0.5rem !important;
          }
          
          .print-container button {
            display: none !important;
          }
          
          .print-container a {
            text-decoration: underline;
            color: inherit !important;
          }
          
          .print-container [class*="shadow-"] {
            box-shadow: none !important;
          }
          
          .print-container [class*="hover:"] {
            transform: none !important;
            opacity: 1 !important;
          }
          
          .print-container [class*="transition-"] {
            transition: none !important;
          }
          
          .print-container .separator {
            margin: 0.5rem 0 !important;
          }
          
          .print-container [class*="Card"] {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 0.5rem !important;
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
          }
          
          .print-container [class*="CardContent"] {
            padding: 0.75rem !important;
          }
          
          .print-container h1,
          .print-container h2,
          .print-container h3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          .print-container p {
            orphans: 3;
            widows: 3;
          }
          
          a[href]:after {
            content: " (" attr(href) ")";
            font-size: 0.8em;
            color: #666;
          }
          
          * {
            overflow: visible !important;
          }
        }
        
        @media screen {
          .print-only {
            display: none !important;
          }
        }
      `}} />
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Review & Confirm</h2>
            <p className="text-muted-foreground mt-1">
              Review your selections and export your configuration
            </p>
          </div>
          <div className="flex gap-2 no-print">
            <Button variant="outline" onClick={handleExportJSON}>
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div ref={printRef} className="print-container space-y-6">
        <div className="print-section">
          <h2 className="text-2xl font-semibold mb-4 print-only">Review & Confirm</h2>
        </div>
        
        <div className="print-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="print-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>Your company information</CardDescription>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(1)}
                className="no-print"
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Company Name</div>
              <div className="text-sm text-muted-foreground">
                {data.companyName || "Not set"}
              </div>
            </div>
            {data.tagline && (
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium">Tagline</div>
                <div className="text-sm text-muted-foreground">{data.tagline}</div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Industry</div>
              <div className="text-sm text-muted-foreground">
                {data.industry || "Not set"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="print-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Brand Style</CardTitle>
                <CardDescription>Your brand visual identity</CardDescription>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(2)}
                className="no-print"
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Aesthetic</div>
              <div className="text-sm text-muted-foreground capitalize">
                {data.brandAesthetic}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Primary Color</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: data.primaryColor }}
                />
                <div className="text-sm text-muted-foreground">{data.primaryColor}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Secondary Color</div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: data.secondaryColor }}
                />
                <div className="text-sm text-muted-foreground">{data.secondaryColor}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Font Style</div>
              <div className="text-sm text-muted-foreground capitalize">
                {data.fontStyle}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="print-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inspiration</CardTitle>
                <CardDescription>Your inspiration sources</CardDescription>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentStep(3)}
                className="no-print"
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Links</div>
              <div className="text-sm text-muted-foreground">
                {data.inspirationLinks.length} link(s)
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">Images</div>
              <div className="text-sm text-muted-foreground">
                {data.inspirationImages.length} image(s)
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        <div className="print-section space-y-6">
        <Card className="print-card">
          <CardHeader>
            <CardTitle>Live Branding Preview</CardTitle>
            <CardDescription>See how your brand looks</CardDescription>
          </CardHeader>
          <CardContent>
            <LiveBrandingPreview />
          </CardContent>
        </Card>

        <Card className="print-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
              <div>
                <CardTitle>One-Page Website Preview</CardTitle>
                <CardDescription>Preview your generated website</CardDescription>
              </div>
              <Link href="/preview" target="_blank" rel="noopener noreferrer" className="no-print">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                  View Full Page
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-1">
            <WebsitePreview />
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
    </>
  )
}

