import {
  PlaneIcon,
  SwapIcon,
  ScaleIcon,
  ClockIcon,
  DotsVerticalIcon,
  CalendarIcon,
  StarIcon,
} from "./icons";

const TABS = [
  { label: "Airport Transfer", icon: PlaneIcon, active: true },
  { label: "City to City", icon: SwapIcon },
  { label: "Cooperate Chauffeur", icon: ScaleIcon },
  { label: "Hourly Basis", icon: ClockIcon },
  { label: "Intercity", icon: DotsVerticalIcon },
];

export function BookingPanel() {
  return (
    <div
      className="relative z-20 rounded-2xl border border-white/20 px-10 pb-5 pt-5 text-white backdrop-blur-xl backdrop-saturate-150"
      style={{ background: "rgba(20,20,20,0.35)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-[18px] py-3 text-sm font-medium transition-colors ${
                tab.active
                  ? "bg-white text-neutral-900"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex">
            {["#1a1a1a", "#c89b6a", "#8a8a8a", "#3a3a3a"].map((color) => (
              <span
                key={color}
                className="-ml-2.5 h-8 w-8 rounded-full border-2 border-white/80 first:ml-0"
                style={{ background: color }}
              />
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-white">
            <StarIcon className="h-4 w-4 text-amber-400" /> 4.9 Rating across USA
          </span>
        </div>
      </div>

      <div className="my-4 h-px bg-white/15" />

      <div className="grid grid-cols-1 items-end gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-semibold">Pickup Location</label>
          <input
            type="text"
            placeholder="Street, Hotel or Airport"
            className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white placeholder-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-semibold">Drop off Location</label>
          <input
            type="text"
            placeholder="Destination Address"
            className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white placeholder-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-semibold">Pickup Date</label>
          <div className="flex items-center justify-between border-b border-white/25 py-1.5">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
            />
            <CalendarIcon className="h-4 w-4 text-white/50" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-semibold">Pickup Time</label>
          <div className="flex items-center justify-between border-b border-white/25 py-1.5">
            <input
              type="text"
              placeholder="--:-- --"
              className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
            />
            <ClockIcon className="h-4 w-4 text-white/50" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-semibold">Passenger</label>
          <select className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white outline-none [&>option]:text-neutral-900">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <button className="flex h-fit items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-7 py-4 text-sm font-semibold text-neutral-900">
          Find My Chauffeur ↗
        </button>
      </div>
    </div>
  );
}
