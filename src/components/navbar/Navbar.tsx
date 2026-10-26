import Image from "next/image";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "SERVICES", href: "#", hasDropdown: true },
  { label: "OUR FLEET", href: "#" },
  { label: "CONTACT", href: "#" },
];

export function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between gap-6 px-10 pt-6">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="United Travel Services"
          width={200}
          height={70}
          className="h-15 w-auto"
          priority
        />
      </div>

      <div
        className="hidden rounded-full p-px lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(255,200,150,0.3) 100%)",
        }}
      >
        <ul
          className="flex items-center gap-8 rounded-full px-8 py-3.5"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(8,6,5,0.7) 60%, rgba(40,24,13,0.62) 100%)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-1 whitespace-nowrap text-[13px] font-medium tracking-wide text-white/90"
              >
                {link.label}
                {link.hasDropdown && <span className="text-[10px]">▾</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          className="rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          Sign up
        </button>
        <button
          className="rounded-xl border border-white/25 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          Log In
        </button>
      </div>
    </nav>
  );
}
