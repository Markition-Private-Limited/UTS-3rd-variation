"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

export function ParallaxImage({
  src,
  alt,
  sizes,
  aspectRatio,
  range = 6,
  hoverRange = 16,
}: {
  src: string;
  alt: string;
  sizes: string;
  aspectRatio: string;
  range?: number;
  /** Max pixel shift of the image following the cursor on hover. */
  hoverRange?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const hy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    // Image moves opposite to the cursor for a depth effect.
    mx.set(-((e.clientX - r.left) / r.width - 0.5) * 2 * hoverRange);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * hoverRange);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio }}
    >
      <motion.div className="absolute" style={{ y, top: "-10%", bottom: "-10%", left: "-4%", right: "-4%" }}>
        <motion.div className="absolute inset-0" style={{ x, y: hy }}>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}
