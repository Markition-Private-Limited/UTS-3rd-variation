import type { Metadata } from "next";
import { LenisProvider } from "@/components/lenis/LenisProvider";
import { Navbar } from "@/components/navbar";
import PageLoader from "@/components/ui/PageLoader";

export const metadata: Metadata = {
  title: "United Travel Services — Executive Chauffeur",
  description: "Luxury chauffeur services across the UK.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col bg-white font-sans">
      <PageLoader />
      <Navbar />
      <LenisProvider>{children}</LenisProvider>
    </div>
  );
}
