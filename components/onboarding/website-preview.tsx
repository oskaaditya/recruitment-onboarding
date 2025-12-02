"use client"

import { useOnboardingStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Users, UserSearch, Lightbulb } from "lucide-react"

/**
 * Renders a website preview based on user's onboarding data.
 * The layout is made responsive using Tailwind CSS classes (e.g., sm:, md:, lg:).
 * Typography scales for better mobile readability.
 */
export function WebsitePreview() {
  const { data } = useOnboardingStore()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [buttonClicked, setButtonClicked] = useState(false)

  const handleButtonClick = (type: string) => {
    setButtonClicked(true)
    setTimeout(() => setButtonClicked(false), 200)
    // In a real app, this would navigate or trigger an action
    console.log(`${type} button clicked`)
  }

  // --- Helper Functions ---

  /**
   * Defines a clean set of font fallbacks for each style.
   */
  const getFontFamily = () => {
    switch (data.fontStyle) {
      case "sans-serif":
        return "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
      case "serif":
        return "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
      case "monospace":
        return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
      case "display":
        // Using a sans-serif for display as a general style for preview
        return "ui-sans-serif, system-ui, sans-serif"
      default:
        return "ui-sans-serif, system-ui, sans-serif"
    }
  }

  /**
   * Retrieves aesthetic styles (borderRadius and spacing) based on brandAesthetic.
   */
  const getAestheticStyles = () => {
    switch (data.brandAesthetic) {
      case "modern":
        return { borderRadius: "0.75rem", spacing: "2rem" }
      case "corporate":
        return { borderRadius: "0.375rem", spacing: "1.5rem" }
      case "playful":
        return { borderRadius: "1.25rem", spacing: "2.5rem" }
      case "minimal":
        return { borderRadius: "0", spacing: "1rem" }
      default:
        return { borderRadius: "0.75rem", spacing: "2rem" }
    }
  }

  const styles = getAestheticStyles()
  const primaryColor = data.primaryColor || "#3b82f6" // Default Blue if undefined
  const secondaryColor = data.secondaryColor || "#9ca3af" // Default Gray if undefined

  // --- Component Render ---

  return (
    <div
      className="w-full min-h-screen bg-background"
      style={{
        fontFamily: getFontFamily(),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div 
        // Dynamic vertical spacing based on aesthetic style
        className="space-y-8 sm:space-y-12 min-h-[600px]"
        style={{ '--section-spacing': styles.spacing } as React.CSSProperties}
      >
        {/* Hero Section */}
        <section
          // Responsive padding: py-12 on small screens, py-20 on large screens
          className="py-12 md:py-20 px-6 text-center shadow-xl transition-all duration-500 hover:shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            color: "#ffffff",
            borderRadius: styles.borderRadius,
          }}
        >
          <h1 
            // Responsive font size: 3xl on small, 5xl on medium, 6xl on large
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 transition-transform duration-300"
          >
            {data.companyName || "Your Company Name"}
          </h1>
          {data.tagline && (
            <p 
              // Responsive font size: base on small, xl on medium
              className="text-base sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto opacity-90"
            >
              {data.tagline}
            </p>
          )}
          <Button
            size="lg"
            onClick={() => handleButtonClick("Get Started")}
            className="font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "#ffffff",
              color: primaryColor,
              borderRadius: styles.borderRadius,
              transform: buttonClicked ? "scale(0.95)" : undefined,
            }}
          >
            Get Started
          </Button>
        </section>
        
        {/* About Section */}
        <section className="px-0 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            About Us
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
            {data.companyName || "We"} are a leading recruitment company specializing in{" "}
            {data.industry || "talent acquisition"}. Our mission is to connect
            exceptional talent with outstanding opportunities, creating meaningful
            partnerships that drive success. Our commitment to excellence and a personalized approach
            sets us apart in the competitive job market.
          </p>
        </section>

        {/* Services Section */}
        <section className="px-0 sm:px-6">
          <div className="flex flex-col items-start gap-2 justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: primaryColor }}>
              Our Services
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Comprehensive recruitment solutions tailored to your needs, leveraging cutting-edge technology and a vast network of professionals.
            </p>
          </div>
          <div 
            // Responsive Grid: 1 column on small, 2 on medium, 3 on large
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              { name: "Talent Acquisition", icon: Users },
              { name: "Executive Search", icon: UserSearch },
              { name: "Consulting", icon: Lightbulb },
            ].map(
              (service, index) => {
                const IconComponent = service.icon
                return (
                  <Card
                    key={index}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleButtonClick(service.name)}
                    className="shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group p-0!"
                    style={{
                      borderRadius: styles.borderRadius,
                      borderColor: hoveredCard === index ? primaryColor : secondaryColor + "33",
                    }}
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="mb-4 transition-transform duration-300" style={{ 
                        color: hoveredCard === index ? primaryColor : primaryColor,
                      }}>
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div
                        className="text-xl font-semibold mb-2 transition-colors duration-300"
                        style={{ 
                          color: hoveredCard === index ? primaryColor : primaryColor,
                        }}
                      >
                        {service.name}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground transition-opacity duration-300">
                        Comprehensive {service.name.toLowerCase()} solutions tailored to
                        your needs, leveraging cutting-edge technology and a vast network of professionals.
                      </p>
                    </CardContent>
                  </Card>
                )
              }
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section
          // Use relative padding
          className="py-8 sm:py-12 px-6 rounded-lg transition-all duration-300"
          style={{
            backgroundColor: secondaryColor + "15", // Subtle background
            borderRadius: styles.borderRadius,
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: primaryColor }}>
            Get In Touch
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="space-y-4">
              <div 
                className="group cursor-pointer transition-all duration-300 "
                onClick={() => handleButtonClick("Email")}
              >
                <div className="font-medium text-lg mb-1 transition-colors duration-300 group-hover:opacity-80" style={{ color: primaryColor }}>
                  Email
                </div>
                <a 
                  href="mailto:contact@company.com" 
                  className="text-muted-foreground text-base hover:text-foreground transition-colors duration-300 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  contact@company.com
                </a>
              </div>
              <div 
                className="group cursor-pointer transition-all duration-300 "
                onClick={() => handleButtonClick("Phone")}
              >
                <div className="font-medium text-lg mb-1 transition-colors duration-300 group-hover:opacity-80" style={{ color: primaryColor }}>
                  Phone
                </div>
                <a 
                  href="tel:+15551234567" 
                  className="text-muted-foreground text-base hover:text-foreground transition-colors duration-300 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            
            <div className="flex items-end pt-4 sm:pt-0">
              <Button
                size="lg"
                onClick={() => handleButtonClick("Start Conversation")}
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  borderRadius: styles.borderRadius,
                  transform: buttonClicked ? "scale(0.95)" : undefined,
                }}
                className="transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 font-semibold w-full sm:w-auto cursor-pointer"
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}