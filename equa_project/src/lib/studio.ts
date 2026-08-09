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
  reviewCount: 31,
  hours: "Daily · 11:00 AM – 7:30 PM",
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

export const REVIEWS = [
  {
    name: "Momina Ali",
    text: "Got my beauty mark done here and I absolutely love it! It healed really well and stayed exactly where it was placed. The whole experience was smooth, and Dr Sehrish was super friendly and professional.",
    service: "Beauty Marks",
  },
  {
    name: "Sidra Saqlain",
    text: "I had a hair repair treatment at Equa studio, and I absolutely love the results — my hair is now smooth, soft and much easier to manage than before. The staff was friendly, they explained everything clearly.",
    service: "Hair Repair Treatment",
  },
  {
    name: "Nawal N",
    text: "I had the best experience at the studio. Got a lash lift done. The owner was so professional and an absolute pro. The overall ambiance was perfect.",
    service: "Lash Lift",
  },
];

export const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;
