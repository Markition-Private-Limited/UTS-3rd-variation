import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "United Travel Services — Executive Chauffeur",
  description: "Luxury chauffeur services across the US.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex flex-col bg-white font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
