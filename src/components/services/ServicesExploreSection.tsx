import Image from "next/image";
import Link from "next/link";

const FEATURED = [
  {
    slug: "airport-transfers",
    src: "/services/explore-airport-transfers.jpg",
    alt: "Mercedes-Benz S-Class with chauffeur at Heathrow Terminal 5 departures",
    title: "Airport Transfers",
    body: "Professional journeys to and from the airport, with pickup and onward travel discussed around your flight.",
  },
  {
    slug: "city-to-city",
    src: "/services/explore-city-to-city.jpg",
    alt: "Bentley Flying Spur driving through the English countryside",
    title: "City to City",
    body: "Private travel between towns and cities, connecting the addresses that matter to your itinerary.",
  },
];

const SERVICES = [
  {
    slug: "city-trip",
    src: "/services/explore-city-trip.jpg",
    alt: "Classic Jaguar Mark 2 parked on a Belgravia street",
    title: "City Trip",
    body: "Considered city journeys between hotels, appointments and the places you want to reach.",
  },
  {
    slug: "hourly-chauffeur",
    src: "/services/explore-hourly-chauffeur.jpg",
    alt: "Businessman checking his phone beside a Jaguar XJ in Belgravia",
    title: "Hourly Chauffeur",
    body: "An agreed period of chauffeur travel for a schedule with more than one destination.",
  },
  {
    slug: "full-day-chauffeur-hire",
    src: "/services/explore-full-day-chauffeur-hire.jpg",
    alt: "Jaguar XJ parked outside a country manor house",
    title: "Full-Day Chauffeur Hire",
    body: "A planned day of travel shaped around successive appointments and your chosen itinerary.",
  },
  {
    slug: "corporate-chauffeur",
    src: "/services/explore-corporate-chauffeur.jpg",
    alt: "Chauffeur standing beside a car outside a modern glass office building",
    title: "Corporate Chauffeur",
    body: "Professional presentation and considered arrangements for executive and business travel.",
  },
  {
    slug: "seaport-cruise-transfers",
    src: "/services/explore-seaport-cruise-transfers.jpg",
    alt: "Chauffeur with a Bentley Mulsanne outside Southampton Ocean Terminal beside a P&O cruise ship",
    title: "Seaport & Cruise Transfers",
    body: "Arrange the road journey between your cruise terminal and your onward destination.",
  },
  {
    slug: "sightseeing-chauffeur",
    src: "/services/explore-sightseeing-chauffeur.jpg",
    alt: "Aston Martin parked in front of the Royal Crescent in Bath",
    title: "Sightseeing Chauffeur",
    body: "Explore your interests with a private itinerary and preferred stops discussed in advance.",
  },
  {
    slug: "charter-service",
    src: "/services/explore-charter-service.jpg",
    alt: "Coordinator reviewing an itinerary beside a car at a manor entrance",
    title: "Charter Service",
    body: "Discuss passenger requirements and suitable transport options for a coordinated itinerary.",
  },
  {
    slug: "special-occasion-chauffeur",
    src: "/services/explore-special-occasion-chauffeur.jpg",
    alt: "Bentley Mulsanne arriving at a hotel entrance in the evening",
    title: "Special Occasion Chauffeur",
    body: "Thoughtful arrival and onward travel arrangements for an occasion worth planning carefully.",
  },
];

function ExploreLink() {
  return (
    <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-neutral-900">
      EXPLORE SERVICE
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function ServicesExploreSection() {
  return (
    <section className="bg-white px-6 pt-0 pb-14 sm:px-10 lg:px-16 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Featured pair */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {FEATURED.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`} className="group block">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <h3 className="mb-3 text-[24px] font-bold tracking-[-0.02em] text-neutral-900">
                  {item.title}
                </h3>
                <p className="max-w-xl text-[15px] leading-[170%] text-neutral-500">
                  {item.body}
                </p>
                <ExploreLink />
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining services, two columns */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:mt-16">
          {SERVICES.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="group flex items-start gap-6 border-t border-neutral-200 py-8"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="mb-2 text-[18px] font-bold tracking-[-0.02em] text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-[160%] text-neutral-500">
                  {item.body}
                </p>
                <ExploreLink />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
