export const STUDIO = {
  name: "Equà Studio",
  legalName: "Equa Studio - Premium Aesthetics & Beauty",
  tagline: "Premium aesthetics & beauty, made personal.",
  phoneDisplay: "0329 256 0000",
  phoneIntl: "+92 329 2560000",
  whatsapp: "923292560000",
  instagram: "EquaStudioBySahrish",
  instagramUrl: "https://instagram.com/EquaStudioBySahrish",
  address: {
    line1: "Ground Floor, Building 23, Park View",
    line2: "Sector E Commercial, Bahria Town",
    city: "Lahore",
    postal: "54000",
    country: "Pakistan",
  },
  addressOneLine:
    "Ground Floor, 23, Park View, Sector E Commercial, Bahria Town, Lahore, 54000, Pakistan",
  rating: 4.9,
  reviewCount: 38,
  hours: "Tuesday to Sunday· 12:00 PM – 7:30 PM",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Equa Studio Premium Aesthetics & Beauty, Ground Floor 23 Park View, Sector E Commercial, Bahria Town, Lahore 54000, Pakistan",
    ),
  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "Equa Studio Premium Aesthetics & Beauty, Park View, Sector E Commercial, Bahria Town, Lahore",
    ) +
    "&output=embed",
};

export const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;