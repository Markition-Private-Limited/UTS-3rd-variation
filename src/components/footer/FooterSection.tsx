import Image from "next/image";
import Link from "next/link";
import { OriginButton } from "@/components/ui/origin-button";

const SERVICES_LINKS = [
  { label: "Airport Transfers", href: "#" },
  { label: "City to City", href: "#" },
  { label: "Intercity", href: "#" },
  { label: "Intercity", href: "#" },
  { label: "Corporate", href: "#" },
];

const FLEET_LINKS = [
  { label: "Sedans", href: "#" },
  { label: "SUVs", href: "#" },
  { label: "Luxury Coaches", href: "#" },
];

const CONTACT_LINKS = [
  { label: "Bookings", href: "#" },
  { label: "Support", href: "#" },
  { label: "Locations", href: "#" },
];

export function FooterSection() {
  return (
    <footer
      className="w-full rounded-[32px] overflow-hidden min-h-[520px]"
      style={{ background: "#212121" }}
    >
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.8fr]">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Image
              src="/logo.png"
              alt="United Travel Services"
              width={180}
              height={60}
              className="h-14 w-auto object-contain"
            />
            <p className="text-[15px] leading-relaxed text-white/60" style={{ maxWidth: 260 }}>
              Executive chauffeur services across the US — designed for seamless travel,
              exceptional comfort, and effortless elegance.
            </p>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {SERVICES_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/55 transition-colors hover:text-white/90"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Fleet */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">
              Our Fleet
            </h3>
            <ul className="flex flex-col gap-3">
              {FLEET_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/55 transition-colors hover:text-white/90"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/55 transition-colors hover:text-white/90"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ready to Book */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">
              Ready to Book
            </h3>
            <p className="text-[15px] leading-relaxed text-white/55" style={{ maxWidth: 280 }}>
              Choose your service and reserve a chauffeur for airport transfers, corporate
              travel, or city-to-city journeys.
            </p>

            {/* Book Now button — exact Figma spec */}
            <OriginButton
              style={{
                width: "148.96px",
                height: "53.2px",
                borderRadius: "8.28px",
                border: "0.59px solid #FFFFFF",
                padding: "11.82px 18.92px",
                gap: "11.82px",
                background: "linear-gradient(180deg, #FFFFFF 0%, #999999 100%)",
              }}
              fillColor="#111111"
              fillTextColor="#ffffff"
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "18.92px",
                  lineHeight: "121%",
                  letterSpacing: "-0.05em",
                  textTransform: "uppercase",
                }}
              >
                Book Now
              </span>
            </OriginButton>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-6 mt-20">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[13px] text-white/40">
            © 2026 UTS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[13px] text-white/40 transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[13px] text-white/40 transition-colors hover:text-white/70"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
