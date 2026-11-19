// Fixed-route flat fares — complete rate card, all 10 routes × 7 tiers fully priced.
// Tiers: Economy | Business | Business Van | First | MPV | 1st class Van | Standard Van

function priced(tier: string, amount: number) {
  return { tier, amount, available: true }
}

export const FIXED_ROUTES = [
  {
    slug: 'london-manchester',
    label: 'London – Manchester',
    order: 1,
    tierRates: [
      priced('Economy',       400),
      priced('Business',      570),
      priced('Business Van',  730),
      priced('First',         730),
      priced('MPV',           499),
      priced('1st class Van', 750),
      priced('Standard Van',  630),
    ],
  },
  {
    slug: 'london-leeds',
    label: 'London – Leeds',
    order: 2,
    tierRates: [
      priced('Economy',       390),
      priced('Business',      560),
      priced('Business Van',  720),
      priced('First',         720),
      priced('MPV',           485),
      priced('1st class Van', 740),
      priced('Standard Van',  620),
    ],
  },
  {
    slug: 'london-birmingham',
    label: 'London – Birmingham',
    order: 3,
    tierRates: [
      priced('Economy',       245),
      priced('Business',      369),
      priced('Business Van',  555),
      priced('First',         423),
      priced('MPV',           306),
      priced('1st class Van', 575),
      priced('Standard Van',  387),
    ],
  },
  {
    slug: 'london-brighton',
    label: 'London – Brighton',
    order: 4,
    tierRates: [
      priced('Economy',       118),
      priced('Business',      233),
      priced('Business Van',  267),
      priced('First',         390),
      priced('MPV',           147),
      priced('1st class Van', 287),
      priced('Standard Van',  186),
    ],
  },
  {
    slug: 'london-bristol',
    label: 'London – Bristol',
    order: 5,
    tierRates: [
      priced('Economy',       224),
      priced('Business',      382),
      priced('Business Van',  572),
      priced('First',         436),
      priced('MPV',           280),
      priced('1st class Van', 592),
      priced('Standard Van',  354),
    ],
  },
  {
    slug: 'london-cardiff',
    label: 'London – Cardiff',
    order: 6,
    tierRates: [
      priced('Economy',       283),
      priced('Business',      474),
      priced('Business Van',  697),
      priced('First',         529),
      priced('MPV',           353),
      priced('1st class Van', 717),
      priced('Standard Van',  447),
    ],
  },
  {
    slug: 'london-portsmouth',
    label: 'London – Portsmouth',
    order: 7,
    tierRates: [
      priced('Economy',       143),
      priced('Business',      261),
      priced('Business Van',  408),
      priced('First',         315),
      priced('MPV',           178),
      priced('1st class Van', 428),
      priced('Standard Van',  225),
    ],
  },
  {
    slug: 'london-southampton',
    label: 'London – Southampton',
    order: 8,
    tierRates: [
      priced('Economy',       150),
      priced('Business',      279),
      priced('Business Van',  433),
      priced('First',         334),
      priced('MPV',           197),
      priced('1st class Van', 453),
      priced('Standard Van',  237),
    ],
  },
  {
    slug: 'london-bournemouth',
    label: 'London – Bournemouth',
    order: 9,
    tierRates: [
      priced('Economy',       203),
      priced('Business',      350),
      priced('Business Van',  529),
      priced('First',         404),
      priced('MPV',           254),
      priced('1st class Van', 549),
      priced('Standard Van',  321),
    ],
  },
  {
    slug: 'london-cambridge',
    label: 'London – Cambridge',
    order: 10,
    tierRates: [
      priced('Economy',       116),
      priced('Business',      233),
      priced('Business Van',  371),
      priced('First',         288),
      priced('MPV',           145),
      priced('1st class Van', 391),
      priced('Standard Van',  183),
    ],
  },
]
