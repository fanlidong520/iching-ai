import type { Metadata, Viewport } from "next"
import "./globals.css"
import BaguaBackground from "@/components/BaguaBackground"

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "The Ancient Sage · Clarity Oracle",
  description: "A private clarity oracle for love, career, and life decisions, guided by Eastern wisdom.",
  keywords: ["clarity", "decision companion", "Eastern wisdom", "reflection", "daily guidance", "oracle", "I Ching", "BaZi"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ancient Sage",
  },
  openGraph: {
    title: "The Ancient Sage · Clarity Oracle",
    description: "Find clarity for love, career, and life decisions through a private Eastern wisdom ritual.",
    type: "website",
    siteName: "The Ancient Sage",
  },
  twitter: {
    card: "summary",
    title: "The Ancient Sage · Clarity Oracle",
    description: "A private clarity oracle guided by Eastern wisdom.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: '#0a0a0f' }}>
        <BaguaBackground />
        {children}
      </body>
    </html>
  )
}
