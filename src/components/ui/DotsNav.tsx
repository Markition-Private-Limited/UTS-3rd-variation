export default function DotsNav({
  count,
  activeIndex = 0,
  className = "",
  onDotClick,
}: {
  count: number;
  activeIndex?: number;
  className?: string;
  onDotClick?: (index: number) => void;
}) {
  return (
    <div className={`flex items-center justify-center gap-2 md:gap-[0.4167vw] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to page ${i + 1}`}
          onClick={() => onDotClick?.(i)}
          disabled={!onDotClick}
          className="rounded-full transition-all duration-300 cursor-pointer disabled:cursor-default border-0 flex items-center justify-center"
          style={{ padding: "6px", margin: "-6px", background: "transparent" }}
        >
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              height: "8px",
              width: i === activeIndex ? "24px" : "8px",
              backgroundColor: i === activeIndex ? "#0d0d0d" : "#D9D9D9",
            }}
          />
        </button>
      ))}
    </div>
  );
}
