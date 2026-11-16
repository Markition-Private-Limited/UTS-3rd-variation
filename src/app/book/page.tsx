import type { Metadata } from "next";
import { LenisProvider } from "@/components/lenis/LenisProvider";
import PageLoader from "@/components/ui/PageLoader";
import BookingApp from "@/components/booking/BookingApp";

export const metadata: Metadata = {
  title: "Book Your Chauffeur — United Travel Services",
  description: "Bespoke chauffeur reservations with United Travel Services.",
};

export default function BookPage() {
  return (
    <div className="flex flex-col bg-white font-sans">
      <PageLoader />
      <LenisProvider>
        <BookingApp />
      </LenisProvider>
    </div>
  );
}
