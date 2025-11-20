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
  title: "2026년 신년운세 - ALL NEW FORTUNE",
  description: "나의 2026년 운세를 확인하고 행운의 아이템을 알아보세요!",
  openGraph: {
    title: "2026년 신년운세 - ALL NEW FORTUNE",
    description: "나의 2026년 운세를 확인하고 행운의 아이템을 알아보세요!",
    url: "https://allnewfortune.vercel.app",
    siteName: "ALL NEW FORTUNE",
    images: [
      {
        url: "/images/og-image.png", // We might need to create this or use a placeholder
        width: 1200,
        height: 630,
        alt: "2026년 신년운세",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026년 신년운세 - ALL NEW FORTUNE",
    description: "나의 2026년 운세를 확인하고 행운의 아이템을 알아보세요!",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
