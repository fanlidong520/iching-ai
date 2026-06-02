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
  title: "The Ancient Sage · I Ching Oracle",
  description: "The 3000-year-old I Ching speaks again. Your personal oracle and spiritual companion — daily guidance from the ancient Eastern masters.",
  keywords: ["I Ching", "Yi Jing", "divination", "spirituality", "Eastern wisdom", "meditation", "daily guidance", "oracle", "BaZi"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ancient Sage",
  },
  openGraph: {
    title: "The Ancient Sage · I Ching Oracle",
    description: "Ancient Eastern wisdom for modern souls. Daily I Ching readings personalized to your celestial blueprint.",
    type: "website",
    siteName: "The Ancient Sage",
  },
  twitter: {
    card: "summary",
    title: "The Ancient Sage · I Ching Oracle",
    description: "Ancient Eastern wisdom for modern souls.",
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
      <body className="min-h-full bg-ink-wash flex flex-col">
        <BaguaBackground />
        {children}
      </body>
    </html>
  )
}
