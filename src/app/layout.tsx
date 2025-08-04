import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Global Metadata (applies to all pages)
export const metadata: Metadata = {
  title: "Malaysia Integrated E-Queuing System (MIEQS)",
  description:
    "Book your queue number online for IC Renewal, Passport Renewal, Driver’s License Renewal, and Saman Payment.",
  keywords: [
    "Malaysia Queue System",
    "IC Renewal",
    "Passport Renewal",
    "License Renewal",
    "Saman Payment",
    "JPN",
    "JPJ",
    "Immigration Malaysia",
  ],
  openGraph: {
    title: "MIEQS - Malaysia's Digital Queue System",
    description:
      "Avoid long waits! Book your queue number for JPN, JPJ, Immigration, and Police services online.",
    url: "https://yourdomain.com",
    type: "website",
    siteName: "MIEQS",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MIEQS - Malaysia's Digital Queue System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MIEQS - Malaysia's Digital Queue System",
    description:
      "Avoid long waits! Book your queue number for JPN, JPJ, Immigration, and Police services online.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('color-theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
