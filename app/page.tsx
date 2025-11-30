'use client'

import { useState } from "react"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"
import { useOnboardingStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { StepCompanyDetails } from "@/components/onboarding/step-company-details"
import { StepBrandStyle } from "@/components/onboarding/step-brand-style"
import { StepInspiration } from "@/components/onboarding/step-inspiration"
import { StepReview } from "@/components/onboarding/step-review"
import { LiveBrandingPreview } from "@/components/onboarding/live-branding-preview"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

const steps = [
  {
    description: "Enter your company information",
    step: 1,
    title: "Company Details",
  },
  {
    description: "Define your brand identity",
    step: 2,
    title: "Brand Style",
  },
  {
    description: "Share your inspiration",
    step: 3,
    title: "Inspiration",
  },
  {
    description: "Review and confirm",
    step: 4,
    title: "Review",
  },
]

export default function Home() {
  const { currentStep, setCurrentStep, data } = useOnboardingStore()
  const [isLoading, setIsLoading] = useState(false)

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.companyName.trim() !== "" && data.industry !== ""
      case 2:
        return true // Brand style always has defaults
      case 3:
        return true // Inspiration is optional
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 4 && !isLoading) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsLoading(false)
      }, 300)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1 && !isLoading) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsLoading(false)
      }, 300)
    }
  }


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepCompanyDetails />
      case 2:
        return <StepBrandStyle />
      case 3:
        return <StepInspiration />
      case 4:
        return <StepReview />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recruiter Onboarding</h1>
          <p className="text-muted-foreground">
            Create your recruitment company profile in a few simple steps
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper
            onValueChange={(step) => {
              if (!isLoading && step !== currentStep) {
                setIsLoading(true)
                setTimeout(() => {
                  setCurrentStep(step)
                  setIsLoading(false)
                }, 300)
              }
            }}
            value={currentStep}
          >
            {steps.map(({ step, title, description }) => (
              <StepperItem
                className="relative flex-1 flex-col!"
                key={step}
                step={step}
                completed={currentStep > step}
              >
                <StepperTrigger className="flex-col gap-3 rounded">
                  <StepperIndicator />
                  <div className="space-y-0.5 px-2">
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                )}
              </StepperItem>
            ))}
          </Stepper>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-0!">
              <CardContent className="p-6">
                <div className="min-h-[500px] relative">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    renderStepContent()
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Next
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      disabled={isLoading}
                    >
                      Start Over
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 p-0!">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Live Preview</h3>
                <LiveBrandingPreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
