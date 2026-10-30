"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OriginButton } from "@/components/ui/origin-button";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Our Fleet", href: "#fleet" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const links = onHome
    ? NAV_LINKS
    : [{ label: "Home", href: "/" }, ...NAV_LINKS.slice(1).map((l) => ({ ...l, href: `/${l.href}` }))];

  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const sampleTheme = () => {
      raf = 0;
      const headerEl = headerRef.current;
      if (!headerEl) return;
      const navMid = headerEl.getBoundingClientRect().height / 2;
      let best: HTMLElement | null = null;
      const candidates = document.querySelectorAll<HTMLElement>("[data-navbar-theme]");
      for (const el of candidates) {
        if (headerEl.contains(el)) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= navMid && bottom >= navMid) best = el;
      }
      const next = best?.dataset.navbarTheme === "light" ? "light" : "dark";
      setTheme((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!raf) raf = requestAnimationFrame(sampleTheme);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      ref={headerRef}
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isDark
          ? scrolled
            ? "backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm"
            : "backdrop-blur-sm bg-white/5 border-b border-white/5"
          : scrolled
            ? "backdrop-blur-md bg-white/70 border-b border-black/10 shadow-sm"
            : "backdrop-blur-sm bg-white/30 border-b border-black/5",
      ].join(" ")}
    >
      <nav className="max-w-screen-xl mx-auto px-8 py-[5px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center leading-tight">
          <Image
            src="/logo.png"
            alt="United Travel Services"
            width={200}
            height={70}
            className={`h-14 w-auto object-contain transition-[filter] duration-300 ${
              isDark ? "" : "invert"
            }`}
            priority
          />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ label, href, hasDropdown }) => (
            <li key={label}>
              <a
                href={href}
                className={`flex items-center gap-1 text-[11px] font-light tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isDark ? "text-white/85 hover:text-white" : "text-black/85 hover:text-black"
                }`}
              >
                {label}
                {hasDropdown && <span className="text-[9px] opacity-60">▾</span>}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <OriginButton
          onClick={() => router.push("/book")}
          className="hidden md:inline-flex text-[10px] font-medium tracking-[0.18em] uppercase px-6 py-3 rounded-xl"
          fillColor={isDark ? "#1a1a1a" : "#F9F9F9"}
          fillTextColor={isDark ? "#F9F9F9" : "#1a1a1a"}
          style={{
            background: isDark ? "#F9F9F9" : "#1a1a1a",
            color: isDark ? "#1a1a1a" : "#F9F9F9",
            minWidth: "220px",
            justifyContent: "center",
            transition: "background 500ms, color 500ms",
          }}
        >
          Book Your Chauffeur
        </OriginButton>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-3 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
        </button>
      </nav>
    </header>
  );
}
