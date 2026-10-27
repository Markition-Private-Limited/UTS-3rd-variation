"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { OriginButton } from "@/components/ui/origin-button";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#" },
  { label: "SERVICES", href: "#", hasDropdown: true },
  { label: "OUR FLEET", href: "#" },
  { label: "CONTACT", href: "#" },
];

export function Navbar() {
  const [active, setActive] = useState(0);

  return (
    <nav className="relative z-20 flex items-center justify-center gap-6 px-10 pt-6">
      <div className="absolute left-10 flex items-center">
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
          {NAV_LINKS.map((link, index) => {
            const isActive = index === active;
            return (
              <li key={link.label} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute -inset-x-3 -inset-y-2 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(index);
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 flex items-center gap-1 whitespace-nowrap text-[13px] font-medium tracking-wide text-white/90"
                >
                  {link.label}
                  {link.hasDropdown && <span className="text-[10px]">▾</span>}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </div>

    </nav>
  );
}
