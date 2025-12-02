"use client"

import { useOnboardingStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LiveBrandingPreview() {
  const { data } = useOnboardingStore()
  const [buttonClicked, setButtonClicked] = useState(false)

  const handleButtonClick = () => {
    setButtonClicked(true)
    setTimeout(() => setButtonClicked(false), 200)
  }

  const getFontFamily = () => {
    switch (data.fontStyle) {
      case "sans-serif":
        return "system-ui, -apple-system, sans-serif"
      case "serif":
        return "Georgia, serif"
      case "monospace":
        return "monospace"
      case "display":
        return "system-ui, sans-serif"
      default:
        return "system-ui, sans-serif"
    }
  }

  const getBorderRadius = () => {
    switch (data.brandAesthetic) {
      case "modern":
        return "0.5rem"
      case "corporate":
        return "0.25rem"
      case "playful":
        return "1rem"
      case "minimal":
        return "0"
      default:
        return "0.5rem"
    }
  }

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
  const primaryColor = data.primaryColor || "#3b82f6"
  const secondaryColor = data.secondaryColor || "#9ca3af"

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily: getFontFamily(),
      }}
    >
      {/* Mock Logo */}
      <div
        className="p-5"
        style={{
          backgroundColor: data.primaryColor,
          color: "#ffffff",
          borderRadius: getBorderRadius(),
        }}
      >
        <div className="text-xl font-semibold">
          {data.companyName || "Your Company"}
        </div>
        {data.tagline && (
          <div className="text-xs opacity-90 mt-1.5">{data.tagline}</div>
        )}
      </div>

      {/* Letterhead / Card Preview */}
      <div className="border border-border p-4" style={{ borderRadius: getBorderRadius() }}>
        <div
          className="h-1 mb-4"
          style={{
            backgroundColor: data.primaryColor,
            borderRadius: getBorderRadius(),
          }}
        />
        <div className="text-sm font-medium" style={{ color: data.primaryColor }}>
          {data.companyName || "Company Name"}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {data.tagline || "Your tagline"}
        </div>
      </div>

      {/* Email Signature */}
      <div className="border border-border p-4" style={{ borderRadius: getBorderRadius() }}>
        <table
          cellPadding="0"
          cellSpacing="0"
          border={0}
          style={{
            fontFamily: getFontFamily(),
            fontSize: "14px",
            lineHeight: "1.4",
            color: "#333333",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "0", verticalAlign: "top" }}>
                <table cellPadding="0" cellSpacing="0" border={0} style={{ width: "100%" }}>
                  <tbody>
                    {/* Company Name */}
                    <tr>
                      <td
                        style={{
                          padding: "0 0 4px 0",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: data.primaryColor,
                          fontFamily: getFontFamily(),
                        }}
                      >
                        {data.companyName || "Your Company"}
                      </td>
                    </tr>
                    {/* Tagline */}
                    {data.tagline && (
                      <tr>
                        <td
                          style={{
                            padding: "0 0 8px 0",
                            fontSize: "12px",
                            color: "#666666",
                            fontFamily: getFontFamily(),
                          }}
                        >
                          {data.tagline}
                        </td>
                      </tr>
                    )}
                    {/* Divider */}
                    <tr>
                      <td
                        style={{
                          padding: "8px 0",
                          borderTop: `1px solid ${data.primaryColor}20`,
                        }}
                      />
                    </tr>
                    {/* Contact Info */}
                    <tr>
                      <td style={{ padding: "0", fontSize: "12px", lineHeight: "1.6" }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  padding: "0 0 4px 0",
                                  color: "#333333",
                                  fontFamily: getFontFamily(),
                                }}
                              >
                                <strong>Email:</strong>{" "}
                                <a
                                  href="mailto:example@company.com"
                                  style={{
                                    color: data.secondaryColor,
                                    textDecoration: "none",
                                    fontFamily: getFontFamily(),
                                  }}
                                >
                                  example@company.com
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "0",
                                  color: "#333333",
                                  fontFamily: getFontFamily(),
                                }}
                              >
                                <strong>Website:</strong>{" "}
                                <a
                                  href="https://www.company.com"
                                  style={{
                                    color: data.secondaryColor,
                                    textDecoration: "none",
                                    fontFamily: getFontFamily(),
                                  }}
                                >
                                  www.company.com
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hero Section Preview */}
      <section
        className="py-12 md:py-20 px-6 text-center shadow-xl transition-all duration-500 hover:shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          color: "#ffffff",
          borderRadius: styles.borderRadius,
        }}
      >
        <h1 
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 transition-transform duration-300 hover:scale-105"
        >
          {data.companyName || "Your Company Name"}
        </h1>
        {data.tagline && (
          <p 
            className="text-base sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto opacity-90"
          >
            {data.tagline}
          </p>
        )}
        <Button
          size="lg"
          onClick={handleButtonClick}
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
    </div>
  )
}

