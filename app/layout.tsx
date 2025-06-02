import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sameed Shah | Jamstack Developer & Frontend Engineer",
  description: "Portfolio and blog of Sameed Shah — Jamstack developer, frontend engineer, and technology enthusiast. Explore projects, tutorials, and contact information.",
  keywords: ["Sameed Shah", "Jamstack Developer", "Frontend Engineer", "Web Developer", "JavaScript", "Next.js", "React", "Portfolio"],
  authors: [{ name: "Sameed Shah", url: "https://sameedshah.com" }],
  openGraph: {
    title: "Sameed Shah | Jamstack Developer & Frontend Engineer",
    description: "Explore the personal website of Sameed Shah, showcasing web projects, articles, and skills in frontend and Jamstack development.",
    url: "https://sameedshah.com",
    siteName: "Sameed Shah",
    images: [
      {
        url: "https://postimg.cc/HJrBVbGt",
        secureUrl: "https://postimg.cc/HJrBVbGt",
        width: 1200,
        height: 630,
        alt: "Sameed Shah Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameed Shah | Jamstack Developer",
    description: "Frontend and Jamstack developer sharing projects and tutorials.",
    creator: "@Sameedshah", // Optional
    images: ["https://postimg.cc/HJrBVbGt"],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="hydrated">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}