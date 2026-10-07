// src/data/chatbotData.ts
export type FaqEntry = {
  keywords: string[];
  answer: string;
};

export const faqData: FaqEntry[] = [
  {
    keywords: ["what's your timings","timing", "timings", "hours", "open", "close", "kab", "khula", "band"],
    answer: "We're open Tuesday to Sunday, 12:00 PM – 7:30 PM. Closed on Mondays.",
  },
  {
    keywords: ["what's your location","where are you located", "location", "address", "kahan", "kidhar", "where"],
    answer: "We're at Ground Floor, Building 23, Park View, Sector E Commercial, Bahria Town, Lahore.",
  },
  {
    keywords: ["what's your contact information","contact", "number", "phone", "whatsapp", "call"],
    answer: "You can reach us at 0329 256 0000 or message us on WhatsApp.",
  },
  {
    keywords: ["what's your pricing","pricing", "cost", "price", "rates"],
    answer: "Our pricing varies by service. Please visit our website or contact us for the latest rates.",
  },
  {
    keywords: ["what are your services","services", "service", "what do you offer", "kya karte"],
    answer: "We offer: Hand & Foot care, SPMU, Brow & Lash, Hair & Scalp treatments, Bridal Artistry, and Facials.",
  },
  {
    keywords: ["what's your nail service","nails", "manicure", "pedicure", "hand", "foot"],
    answer: "The Hand & Foot Collective offers manicures, pedicures, and hand/foot microdermabrasion.",
  },
  {
    keywords: ["what's your brow service","brows", "eyebrows", "microblading", "spmu", "permanent makeup", "lips"],
    answer: "The Semi-Permanent Makeup Collective offers Combo Brows, Ombre Powder Brows, Microblading, Lip Blush, and more.",
  },
  {
    keywords: ["what's your lash service","lash", "lashes", "lamination", "threading"],
    answer: "The Brow & Lash Collective offers Lash Lift, Brow Lamination, Brow Mapping, Threading, and Tinting.",
  },
  {
    keywords: ["what's your hair service","hair", "scalp", "keratin", "smoothing", "haircut", "color", "colour"],
    answer: "The Hair & Scalp Collective offers scalp rituals, keratin treatment, hair colour, haircuts, and styling.",
  },
  {
    keywords: ["what's your bridal service","bridal", "makeup", "wedding", "mehndi", "nikkah", "party"],
    answer: "The Artistry Edit offers bridal hair & makeup, mehndi looks, and party makeup.",
  },
  {
    keywords: ["what's your facial service","facial", "skin", "hydrafacial", "glow"],
    answer: "The Facial Collective offers Hydrafacial, Korean Glass Skin, BB Glow, Dermaplaning, and more.",
  },
  {
    keywords: ["what's your services","services", "service", "what do you offer", "kya karte"],
    answer: "We offer: Hand & Foot care, SPMU, Brow & Lash, Hair & Scalp treatments, Bridal Artistry, and Facials.",
  },
];