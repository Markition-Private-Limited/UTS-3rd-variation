import type { Metadata } from "next";
import { LenisProvider } from "@/components/lenis/LenisProvider";
import { Navbar } from "@/components/navbar";
import PageLoader from "@/components/ui/PageLoader";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { BookingPanelProvider, BookingPanelOverlay } from "@/lib/booking-panel-context";

export const metadata: Metadata = {
  title: "United Travel Services — Executive Chauffeur",
  description: "Luxury chauffeur services across the UK.",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingPanelProvider>
      <div className="relative flex flex-col bg-white font-sans">
        <ScrollToTop />
        <PageLoader />
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <BookingPanelOverlay />
      </div>
    </BookingPanelProvider>
  );
}
