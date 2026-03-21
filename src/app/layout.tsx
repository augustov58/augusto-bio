import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Augusto Valbuena — Engineer, Builder, Tinkerer",
  description:
    "Electrical engineer by day, builder by night. Exploring AI, automation, and everything in between.",
  openGraph: {
    title: "Augusto Valbuena",
    description: "Engineer, Builder, Tinkerer",
    type: "website",
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
        className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
