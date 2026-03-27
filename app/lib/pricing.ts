export const PRICING_SCHEDULE = [
  {
    date: new Date("2026-04-10T00:00:00"),
    label: "Bevezető ár",
    price: 7970,
    deadline: "04.19",
    isCombo: false,
  },
  {
    date: new Date("2026-04-19T00:00:00"),
    label: "Kedvezményes ár",
    price: 8970,
    deadline: "04.26",
    isCombo: false,
  },
  {
    date: new Date("2026-04-26T00:00:00"),
    label: "Kombo kedvezmény",
    price: 9970,
    comboPrice: 15970,
    deadline: "05.01",
    isCombo: true,
  },
  {
    date: new Date("2026-05-01T20:00:00"), // Saturday evening
    label: "Normál ár",
    price: 9970,
    comboPrice: 19940,
    deadline: "05.03", // for Magyar
    isCombo: true,
  }
];

export function getCurrentPriceTier() {
  const now = new Date();
  // Find the last tier that has already started
  for (let i = PRICING_SCHEDULE.length - 1; i >= 0; i--) {
    if (now >= PRICING_SCHEDULE[i].date) {
      return PRICING_SCHEDULE[i];
    }
  }
  // Default to first tier if none started
  return PRICING_SCHEDULE[0];
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('hu-HU').format(price) + " Ft";
}
