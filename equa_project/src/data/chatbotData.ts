// src/data/chatbotData.ts
import { STUDIO } from "@/lib/studio";

export type FaqEntry = {
  id: string;
  /** Short phrases (English + Roman Urdu). Matched as whole-word phrases with typo tolerance. */
  keywords: string[];
  answer: string | (() => string);
  /** Treatment category: gets a price/booking suffix when the query asks for it. */
  service?: boolean;
  /** Extra score so a specific topic beats a treatment keyword that appears in the same question. */
  boost?: number;
};

const SITE = "https://www.equastudio.pk";
const WA = `https://wa.me/${STUDIO.whatsapp}`;
const TEL = `tel:${STUDIO.phoneIntl.replace(/\s/g, "")}`;
const page = (label: string, path: string) => `[${label}](${SITE}${path})`;

export const CHAT_LINK = `[Chat on WhatsApp](${WA})`;
export const BOOK_LINK = page("Book an appointment", "/appointment");

const HOURS = "Our hours are Tuesday to Sunday, 12:00 PM – 7:30 PM (closed on Mondays).";
const CALL = `[${STUDIO.phoneDisplay}](${TEL})`;

export const GREETING =
  "Hi! I'm Equà Studio's assistant. Ask me about our services, prices, timings or location, in English or Roman Urdu.";

export const FALLBACK = `I'm not sure about that one. Our team will gladly help: ${CHAT_LINK} or call ${CALL}.`;

export const QUICK_REPLIES = [
  "Services",
  "Opening hours",
  "Location",
  "Book appointment",
  "Prices",
  "Current offers",
  "Blog",
];

function openStatus(): string {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = now.getDay() !== 1 && mins >= 720 && mins < 1170;
  return `${open ? "Yes, we're open right now." : "We're closed right now."} ${HOURS}`;
}

export const faqData: FaqEntry[] = [
  {
    id: "open-now",
    keywords: [
      "Are you open today?", "Are you open right now?", "Are you closed today?",
      "open now", "open right now", "open today", "closed today", "is the studio open", "is studio open now",
      "abhi khula hai", "aaj khula hai", "kya aaj open hain", "aaj band hai",
    ],
    answer: openStatus,
  },
  {
    id: "hours",
    keywords: [
      "What are your opening hours?", "What are your business hours?", "What time do you open?",
      "What time do you close?", "When does Equa Studio open?", "When does Equa Studio close?",
      "What time can I visit your studio?", "Which days are you open?", "Which day are you closed?",
      "Are you open on Mondays?", "Are you open on Sundays?", "Do you work on weekends?",
      "Can I visit your studio in the evening?", "What are your weekday timings?",
      "What are your weekend timings?", "Can you confirm your opening schedule?",
      "Until what time are you available?", "What are your studio hours?",
      "What's your timing for appointments?", "What are your working hours?",
      "When can I visit your studio?", "What's your timing ?", "what's your timings", "what is your timing ?",
      "hours", "timing", "open", "close", "closing", "what time", "weekend", "monday", "sunday", "opening time",
      "closing time", "working days", "kab", "khula", "band", "waqt", "kitne baje", "timing kya hai",
      "aap ki timing", "kis din band", "kab tak open", "kab khulta hai", "kab band hota hai",
    ],
    answer: `${HOURS} For a specific slot, message us on WhatsApp: ${CHAT_LINK}`,
  },
  {
    id: "location",
    keywords: [
      "What is your location?", "Where are you located?", "Where is Equa Studio located?",
      "Can you tell me your address?", "What is your complete address?",
      "Where is your beauty studio located?", "Where is your salon located?",
      "How can I find your studio?", "How can I get to Equa Studio?",
      "Can you share your Google Maps location?", "Can you send me your location?",
      "Which area is your studio in?", "Are you located in Lahore?", "Are you in Bahria Town Lahore?",
      "What is your studio's address in Lahore?", "How do I reach your studio?",
      "Can you give me directions to your studio?", "Where exactly is your studio?",
      "Which sector of Bahria Town are you located in?", "What is your nearby landmark?",
      "location", "address", "where", "directions", "direction", "map", "google map", "find you", "reach you",
      "get to", "landmark", "bahria", "park view", "sector e", "kahan", "kidhar", "pata", "rasta",
      "studio kahan hai", "location bhejo", "address batao", "kahan par ho", "kis jagah",
    ],
    answer:
      `We're at ${STUDIO.addressOneLine}.\n\n` +
      `[Open in Google Maps](${STUDIO.mapsDirections})\n${page("Location page", "/location")}`,
  },
  {
    id: "contact",
    keywords: [
      "What is your phone number?", "How can I contact Equa Studio?", "What's your WhatsApp number?",
      "Can I reach you on WhatsApp?", "What is your contact information?", "What is your email address?",
      "How can I get in touch with you?", "Can you provide your contact details?",
      "What's your whatsapp contact?", "What is your WhatsApp contact number?", "How can I contact you?",
      "What is your contact number?", "Can you share your phone number?", "What is your WhatsApp number?",
      "How can I reach Equa Studio?", "Can I contact you on WhatsApp?", "Can I call your studio?",
      "How can I speak to someone from your team?", "Can you share your contact details?",
      "What is the best way to contact you?", "Do you have a customer support number?",
      "Can I message you directly?", "Where can I ask questions about your services?",
      "How can I get in touch with your team?", "Can you send me your WhatsApp contact?",
      "Can I speak to your team?",
      "contact", "phone", "number", "call", "whatsapp", "email", "reach", "get in touch", "speak to",
      "talk to", "human", "real person", "support", "complaint", "complain", "rabta", "raabta",
      "number do", "number batao", "baat karni hai", "call karna hai", "whatsapp number kya hai",
    ],
    answer: `You can call us on ${CALL} or message us on WhatsApp: ${CHAT_LINK}`,
  },
  {
    id: "reschedule",
    keywords: [
      "Can I change my appointment time?", "How can I cancel an appointment?",
      "cancel", "reschedule", "change appointment", "change booking", "postpone", "move appointment",
      "appointment cancel", "appointment change", "time change karna hai", "cancel karna hai",
    ],
    answer: `To cancel or change an appointment, please message us on WhatsApp as early as you can: ${CHAT_LINK}`,
  },
  {
    id: "booking",
    keywords: [
      "How can I book an appointment?", "Can I book an appointment with you?", "How do I make a booking?",
      "Can you schedule an appointment for me?", "How can I reserve a time slot?",
      "Do I need to book before visiting?", "Can I walk in without an appointment?",
      "How do I check appointment availability?", "Are there any appointments available today?",
      "Can I book a service for tomorrow?", "How far in advance should I book?",
      "Can I book multiple services together?", "How can I confirm my booking?",
      "Where can I book your beauty services?", "Can I book an appointment through WhatsApp?",
      "What information do I need to make a booking?", "Can I book a bridal consultation?",
      "book", "booking", "appointment", "reserve", "slot", "walk in", "availability", "available today",
      "advance", "schedule appointment", "time lena", "appointment lena", "appointment kaise",
      "booking kaise", "book karna hai", "appointment chahiye", "slot mil sakta",
    ],
    answer:
      `Booking is easy: ${BOOK_LINK} or message us on WhatsApp: ${CHAT_LINK}\n\n` +
      "Please share your preferred service, date and time. We recommend booking in advance, and our team will confirm your slot.",
  },
  {
    id: "pricing",
    keywords: [
      "What are your prices?", "How much do your services cost?", "Can you share your price list?",
      "What are your service charges?", "How much does each treatment cost?",
      "Where can I find your pricing?", "Do you have a beauty service price list?",
      "How much should I budget for a treatment?", "Do you offer affordable beauty packages?",
      "Are your prices available online?", "Can you tell me the cost before I book?",
      "Do your prices vary by treatment?",
      "price", "cost", "rate", "charge", "fee", "how much", "budget", "price list", "pricing", "affordable",
      "kitna", "kitne", "qeemat", "keemat", "qimat", "paisay", "paise", "rates kya", "kitne ka hai",
      "price kya hai", "rate list", "kharcha", "charges kya hain",
    ],
    answer:
      "Prices depend on the treatment. " +
      `See ${page("Services", "/services")} and ${page("Offers", "/offers")}, or message us for an exact quote: ${CHAT_LINK}`,
  },
  {
    id: "offers",
    keywords: [
      "What offers do you have?", "Do you have any special offers?", "Are there any discounts available?",
      "What are your latest promotions?", "Do you offer discounts on beauty treatments?",
      "Are there any ongoing deals?", "Can you tell me about your current offers?",
      "Do you have any seasonal offers?", "Are there any bridal packages on offer?",
      "Do you offer discounted beauty packages?", "How can I avail your offers?",
      "Where can I find your latest deals?", "Are there any special packages available?",
      "Do you have any new customer discounts?", "Can I get a discount when booking multiple services?",
      "special offer", "any offer", "have offer", "current offer", "latest offer", "ongoing offer",
      "new offer", "offer page", "discount", "deal", "promo", "promotion", "package", "sale", "sasta",
      "offer chal raha", "koi offer", "discount milega", "koi deal", "offers kya hain",
    ],
    answer:
      `You can see our latest offers here: ${page("Offers", "/offers")}\n\n` +
      `Offers run for limited dates, so please confirm validity on WhatsApp before booking: ${CHAT_LINK}`,
  },
  {
    id: "portfolio",
    keywords: [
      "Can I see your before and after results?", "Do you have before and after pictures?",
      "Can you show me examples of your work?", "Where can I see your previous work?",
      "Can I view your treatment results?", "Do you have a portfolio of your services?",
      "Can you share photos of your clients' results?", "Where can I see your beauty transformations?",
      "Can I see your microblading results?", "Can I see your bridal makeup portfolio?",
      "Do you have pictures of your facial results?", "Can I see your hair treatment results?",
      "Can you show me examples before I book?", "Do you have a gallery of completed treatments?",
      "Can I check your work before choosing a service?",
      "before and after", "before after", "portfolio", "gallery", "previous work", "your work", "examples",
      "results photo", "photos", "pictures", "transformation", "kaam dikhao", "pehle aur baad",
      "kaam ki pictures", "work dekhna hai", "samples",
    ],
    answer:
      "We'd be happy to show examples relevant to your treatment. Please message us on WhatsApp and our team will share them: " +
      CHAT_LINK,
  },
  {
    id: "hand-foot",
    service: true,
    keywords: [
      "What hand and foot services do you offer?", "Do you offer manicures?", "Do you offer pedicures?",
      "What is included in your manicure service?", "What is included in your pedicure service?",
      "Do you provide hand treatments?", "Do you provide foot treatments?",
      "Do you offer hand and foot microdermabrasion?",
      "Where can I find your manicure and pedicure prices?", "Can I book a manicure and pedicure together?",
      "What nail care services are available?", "Do you offer professional hand and foot care?",
      "How can I book your hand and foot services?",
      "manicure", "pedicure", "nail", "nails", "hand and foot", "hand foot", "hand care", "foot care",
      "microdermabrasion", "hands", "feet", "nail care", "nakhun", "haath pair", "manicure pedicure",
    ],
    answer:
      "Our Hand & Foot Collective offers manicures, pedicures, and hand/foot microdermabrasion.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "spmu",
    service: true,
    keywords: [
      "What is semi-permanent makeup?", "What SPMU services do you offer?", "Do you offer microblading?",
      "What are Combo Brows?", "What are Ombre Powder Brows?", "Do you offer powder brows?",
      "Do you offer lip blush treatments?", "What is included in your SPMU services?",
      "Can I get my eyebrows enhanced?", "Do you provide semi-permanent lip colour?",
      "How can I book a microblading appointment?",
      "What is the difference between microblading and powder brows?",
      "How long do semi-permanent makeup results last?", "Where can I see your eyebrow treatment results?",
      "What should I know before booking an SPMU treatment?",
      "What is the price of microblading?", "How much does lip blush cost?",
      "spmu", "semi permanent", "permanent makeup", "microblading", "powder brow", "ombre", "combo brow",
      "lip blush", "lip tint", "eyebrow tattoo", "brow tattoo", "healing", "aftercare", "how long does it last",
      "microblading kya hai", "permanent eyebrows", "lips ka colour",
    ],
    answer:
      "Our Semi-Permanent Makeup Collective offers Combo Brows, Ombre Powder Brows, Microblading, Lip Blush and more. " +
      "Suitability, healing and results vary by person, so every treatment starts with a consultation.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "brow-lash",
    service: true,
    keywords: [
      "What brow and lash services do you offer?", "Do you offer lash lifts?", "What is a lash lift?",
      "Do you offer brow lamination?", "What is brow lamination?", "Do you provide eyebrow threading?",
      "Do you offer brow mapping?", "Can I get my eyebrows tinted?", "Do you provide lash tinting?",
      "What eyebrow services are available?", "What eyelash treatments do you offer?",
      "How can I book a brow appointment?", "Can I book eyebrow threading and tinting together?",
      "What is included in your Brow & Lash Collective?", "How much do your lash and brow services cost?",
      "brow", "eyebrow", "lash", "eyelash", "lamination", "brow lamination", "lash lift", "threading",
      "tinting", "tint", "brow mapping", "eyebrow shaping", "bhaun", "palkain", "eyebrows banwani hain",
    ],
    answer:
      "Our Brow & Lash Collective offers Lash Lift, Brow Lamination, Brow Mapping, Threading and Tinting.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "hair-scalp",
    service: true,
    keywords: [
      "What hair services do you offer?", "What hair treatments are available?",
      "Do you offer keratin treatments?", "Do you provide hair smoothing?",
      "Can I book a haircut at your studio?", "Do you offer professional hair colouring?",
      "Do you offer hair styling?", "What scalp treatments do you provide?",
      "What is included in your scalp rituals?", "Do you provide hair care consultations?",
      "Which hair treatment would suit my hair?", "Can you help with frizzy hair?",
      "Where can I find your hair treatment prices?", "How can I book a hair appointment?",
      "What hair and scalp services are included in your menu?",
      "What is the price of your hair treatments?", "How much does a keratin treatment cost?",
      "hair", "scalp", "keratin", "smoothing", "haircut", "hair cut", "hair colour", "hair color", "colour",
      "color", "styling", "frizzy", "hair fall", "hair spa", "dandruff", "baal", "balon", "baal katwane hain",
      "baalon ka colour", "baal smooth",
    ],
    answer:
      "Our Hair & Scalp Collective offers scalp rituals, keratin treatments, hair colour, haircuts and styling. " +
      "The best option depends on your hair type and goals.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "bridal",
    service: true,
    keywords: [
      "What bridal services do you offer?", "Do you provide bridal makeup?",
      "Do you offer bridal hairstyling?", "Can I book wedding makeup with you?",
      "Do you offer Nikkah makeup?", "Do you provide Mehndi makeup looks?", "Do you offer Walima makeup?",
      "Can I book party makeup?", "Do you have bridal packages?", "What is included in your bridal services?",
      "How much do you charge for bridal makeup?", "How can I book a bridal consultation?",
      "Do you provide makeup for engagement events?", "Where can I find your bridal service details?",
      "What are your bridal makeup charges?",
      "bridal", "bride", "bridal hair", "wedding", "nikkah", "nikah", "mehndi", "walima", "engagement",
      "party makeup", "makeup", "dulhan", "shaadi", "barat", "bridal makeup kitne ka", "dulhan makeup",
      "party ke liye makeup",
    ],
    answer:
      "The Artistry Edit offers bridal hair & makeup, Mehndi looks and party makeup. " +
      "For dates, packages and consultations, message us early so we can reserve your day.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "facial",
    service: true,
    keywords: [
      "What facial services do you offer?", "What skincare treatments are available?",
      "Do you offer Hydrafacial?", "What is included in your Hydrafacial service?",
      "Do you offer Korean Glass Skin treatments?", "What is a BB Glow treatment?",
      "Do you provide dermaplaning?", "Which facial treatments are available at your studio?",
      "How can I choose the right facial?", "What facial would suit my skin type?",
      "Do you offer professional skin treatments?", "Can I book a facial appointment?",
      "How much does a facial cost?", "Where can I find your skincare service list?",
      "What is included in your Facial Collective?", "What is the price of your facial services?",
      "How much does a Hydrafacial cost?",
      "facial", "skin", "skincare", "skin care", "hydrafacial", "glass skin", "korean", "bb glow",
      "dermaplaning", "glow", "face", "chehra", "skin glow", "skin treatment", "facial kitne ka",
      "chehre ka facial",
    ],
    answer:
      "Our Facial Collective offers Hydrafacial, Korean Glass Skin, BB Glow, Dermaplaning and more. " +
      "The right treatment depends on your skin, which we assess in a consultation.\n\n" +
      page("View services", "/services"),
  },
  {
    id: "services",
    keywords: [
      "what's your services?", "What is your services?", "What are your services?",
      "What services do you offer?", "Tell me about your services", "What services do you provide?",
      "What services are available at Equa Studio?", "What treatments can I get at your studio?",
      "What beauty services do you offer?", "Can you list your services?", "What treatments are available?",
      "What services can I book with you?", "Can you tell me about your beauty services?",
      "What treatments do you provide?", "What services are offered at your studio?",
      "Can you share your service offerings?", "What services does Equa Studio provide?",
      "Can you tell me about your services?", "What beauty treatments do you offer?",
      "What treatments are available at your studio?", "What can I get done at Equa Studio?",
      "Can you share your complete service list?", "What are all the services available at your studio?",
      "Do you offer beauty salon services?", "What kind of beauty treatments can I book?",
      "Can you tell me everything you offer?", "Do you offer hair, skin, and beauty treatments?",
      "What beauty services are available in Lahore?", "Where can I see your complete list of services?",
      "Can you send me your services page?", "Do you offer professional beauty treatments?",
      "Which beauty services can I book with you?", "Can you recommend a service from your menu?",
      "What are your main service categories?", "What is included in your beauty service menu?",
      "service", "treatment", "menu", "what do you offer", "what do you provide", "what do you do",
      "service list", "categories", "beauty salon", "kya karte", "kya services", "kaun si services",
      "kya kya milta hai", "services batao", "services kya hain",
    ],
    answer:
      "We offer Hand & Foot Care, Semi-Permanent Makeup, Brow & Lash, Hair & Scalp treatments, Bridal Artistry and Facials.\n\n" +
      `${page("See all services", "/services")}\nAsk me about any one of them for details.`,
  },
  {
    id: "consultation",
    keywords: [
      "How can I arrange a consultation?", "Can someone help me choose a treatment?",
      "consultation", "consult", "patch test", "advice", "which treatment", "suit me", "recommend",
      "first time", "new client", "mashwara", "consultation chahiye",
    ],
    answer:
      "Every skin, brow and semi-permanent makeup service starts with a consultation, so we can plan the right treatment for you. " +
      `Book one here: ${BOOK_LINK}`,
  },
  {
    id: "safety",
    boost: 2,
    keywords: [
      "pregnant", "pregnancy", "allergy", "allergic", "sensitive skin", "side effect", "safe", "pain",
      "does it hurt", "skin condition", "medical", "mehfooz", "dard", "hamal",
    ],
    answer:
      "Your safety comes first. Suitability depends on the individual, so please tell our team about any allergies, pregnancy or skin conditions before booking. " +
      `We'll advise you in your consultation: ${CHAT_LINK}`,
  },
  {
    id: "blog",
    boost: 2,
    keywords: [
      "Who writes your blogs?", "Who writes your journal?", "Where can I read your beauty blogs?",
      "Do you have a beauty blog?", "Do you publish skincare articles?",
      "Where can I find your latest articles?", "What topics do you cover in your journal?",
      "Who is the author of your blog?", "Do you share self-care tips?", "Can you share your latest blog post?",
      "blog", "journal", "article", "tips", "self care", "read", "beauty tips", "skincare tips",
    ],
    answer: `Our journal has beauty and self-care articles: ${page("Read the journal", "/blog")}`,
  },
  {
    id: "owner",
    keywords: [
      "Who is the owner of Equa Studio?", "Can you tell me the owner's name?", "Who founded Equa Studio?",
      "Who runs the studio?", "Who owns this beauty studio?", "Who is the founder of your studio?",
      "Can you tell me more about the studio owner?",
      "owner", "founder", "who runs", "who founded", "who owns", "sahrish", "esthetician", "malik",
      "owner kaun hai", "studio kis ka hai",
    ],
    answer: "Equà Studio was founded by Sahrish, our principal esthetician.\n\n" + page("About us", "/about"),
  },
  {
    id: "reviews",
    keywords: ["review", "rating", "rated", "feedback", "testimonial", "trusted", "reputation", "kaisa hai studio"],
    answer: `Clients rate us ${STUDIO.rating} out of 5 across ${STUDIO.reviewCount} reviews.\n\n${page("About us", "/about")}`,
  },
  {
    id: "instagram",
    keywords: ["instagram", "insta", "social media", "follow", "facebook", "tiktok", "insta id"],
    answer: `Follow us on Instagram: [@${STUDIO.instagram}](${STUDIO.instagramUrl})`,
  },
  {
    id: "careers",
    keywords: ["job", "jobs", "career", "hiring", "vacancy", "work with you", "naukri"],
    answer: `For career enquiries, please message us on WhatsApp: ${CHAT_LINK}`,
  },
  {
    id: "about",
    keywords: [
      "What is Equa Studio?", "Can you tell me about Equa Studio?", "What kind of studio is Equa Studio?",
      "What beauty services does Equa Studio specialize in?", "Can you tell me more about your studio?",
      "What makes Equa Studio different?", "Who are you?", "What is your name?",
      "what is equa", "who are you", "about equa", "about you", "your studio", "your name", "tell me about",
      "different", "equa studio kya hai", "aap kaun hain",
    ],
    answer:
      "Equà Studio is a premium aesthetics and beauty studio in Bahria Town, Lahore, with honest advice and no upselling.\n\n" +
      `${page("About us", "/about")}\n${page("Our services", "/services")}`,
  },
  {
    id: "help",
    keywords: [
      "How can you help me?", "What can I ask you?", "Can you help me with something else?",
      "I have another question", "Where can I get more information?", "I need more details about a service",
      "help", "what can i ask", "how can you help", "madad", "options", "more information", "more details",
      "ek aur sawal", "mujhe help chahiye",
    ],
    answer:
      "Of course! I can help with services, prices, offers, opening hours, location, booking and contact details. " +
      `Type your question, tap a button below, or ${CHAT_LINK} to reach our team.`,
  },
  // Small talk goes last so specific questions always win ties.
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "aoa", "good morning", "good evening", "good afternoon"],
    answer: "Hello! How can I help you today? You can ask about services, prices, timings, location or booking.",
  },
  {
    id: "thanks",
    keywords: ["thank", "thanks", "thank you", "shukriya", "shukria", "jazak", "appreciate"],
    answer: "You're very welcome! Is there anything else I can help you with?",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "allah hafiz", "khuda hafiz", "see you"],
    answer: `Take care! We look forward to seeing you at Equà Studio. ${BOOK_LINK}`,
  },
];