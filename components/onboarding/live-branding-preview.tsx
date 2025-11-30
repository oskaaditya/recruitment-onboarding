"use client"

import { useOnboardingStore } from "@/lib/store"

export function LiveBrandingPreview() {
  const { data } = useOnboardingStore()

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
      <div
        className="p-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${data.primaryColor}15 0%, ${data.secondaryColor}15 100%)`,
          borderRadius: getBorderRadius(),
        }}
      >
        <div className="text-lg font-bold mb-1" style={{ color: data.primaryColor }}>
          {data.companyName || "Welcome"}
        </div>
        {data.tagline && (
          <div className="text-xs text-muted-foreground">{data.tagline}</div>
        )}
      </div>
    </div>
  )
}

