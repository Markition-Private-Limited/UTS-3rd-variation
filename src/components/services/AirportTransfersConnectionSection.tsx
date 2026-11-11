import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function AirportTransfersConnectionSection() {
  return (
    <Reveal>
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[min(92vw,1800px)]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[568fr_597fr] lg:gap-x-[86px]">
          <div>
            <span className="mb-6 block text-[11px] font-medium tracking-[0.3em] text-neutral-400">
              BETWEEN FLIGHT AND DESTINATION
            </span>
            <h2 className="mb-6 text-[42px] font-extralight leading-[115%] tracking-[-0.03em] text-neutral-900">
              A Considered <span className="font-semibold">Connection, Either Way.</span>
            </h2>
            <p className="text-[15px] font-normal leading-[180%] tracking-[-0.01em] text-neutral-500">
              An airport journey often sits within a much larger itinerary. Whether you are leaving home for a business flight, meeting a visitor or returning to a hotel after time away, the road transfer deserves the same consideration as the flight itself. United Travel Services offers chauffeur transportation with your terminal, addresses and passenger requirements discussed before travel. Share your flight details, preferred pickup arrangements and luggage information when enquiring. Together, these details help establish a clear plan for the journey between the airport and your chosen destination.
            </p>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "880/590" }}>
            <Image
              src="/services/airport-transfers-connection.jpg"
              alt="Passengers with luggage walking through an airport terminal toward waiting cars"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  );
}
