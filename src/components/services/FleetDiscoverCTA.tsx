import Link from "next/link";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function FleetDiscoverCTA() {
  return (
    <div className="-mt-8 flex justify-center bg-white px-6 pb-14 sm:px-10 lg:-mt-12 lg:px-16 lg:pb-20">
      <Link
        href="/#fleet"
        className="group relative inline-flex items-center justify-between gap-6 overflow-hidden whitespace-nowrap rounded-full border border-transparent bg-black text-white transition-colors duration-300 hover:border-white/40"
        style={{ padding: "16px 28px", fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 600, textTransform: "uppercase" }}
      >
        <PillButtonContent fill="white">Discover Our Fleet</PillButtonContent>
      </Link>
    </div>
  );
}
