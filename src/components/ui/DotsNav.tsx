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
    <div className={`flex items-center justify-center gap-[0.4167vw] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to page ${i + 1}`}
          onClick={() => onDotClick?.(i)}
          disabled={!onDotClick}
          className="rounded-full transition-all duration-300 cursor-pointer disabled:cursor-default p-0 border-0"
          style={{
            height: "0.4167vw",
            minHeight: "6px",
            width: i === activeIndex ? "1.25vw" : "0.4167vw",
            minWidth: i === activeIndex ? "18px" : "6px",
            backgroundColor: i === activeIndex ? "#0d0d0d" : "#D9D9D9",
          }}
        />
      ))}
    </div>
  );
}
