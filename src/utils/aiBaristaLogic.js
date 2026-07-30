import {MENU_ITEMS} from "../data/menuData";
import {CAFE_INFO} from "../data/faqData";

// --- BUILD YOUR OWN COFFEE AI CONFIG & LOGIC EXPORTS ---

export const COFFEE_BASES = [
  {
    id: "espresso-single",
    name: "Single Shot Espresso",
    basePrice: 3.5,
    color: "#2b1b17",
    density: 0.7
  }, {
    id: "espresso-double",
    name: "Double Shot Espresso",
    basePrice: 4.2,
    color: "#1c120c",
    density: 0.8
  }, {
    id: "cold-brew",
    name: "Artisanal Cold Brew",
    basePrice: 4.5,
    color: "#382218",
    density: 0.6
  }, {
    id: "nitro-brew",
    name: "Nitro Cold Brew",
    basePrice: 5.0,
    color: "#22150e",
    density: 0.65
  }, {
    id: "decaf-espresso",
    name: "Decaf Swiss Water Espresso",
    basePrice: 4.0,
    color: "#4a2c20",
    density: 0.7
  }
];

export const MILK_OPTIONS = [
  {
    id: "oat",
    name: "Organic Oat Milk",
    price: 0.8,
    color: "#f1cc9c",
    text: "Silky & Nutty Oat"
  }, {
    id: "whole",
    name: "Whole Creamery Milk",
    price: 0.0,
    color: "#fff8f0",
    text: "Rich & Creamy Dairy"
  }, {
    id: "almond",
    name: "Unsweetened Almond Milk",
    price: 0.8,
    color: "#f5dfc3",
    text: "Light & Nutty Almond"
  }, {
    id: "pistachio",
    name: "Artisanal Pistachio Milk",
    price: 1.2,
    color: "#d0e5c2",
    text: "Velvety Roasted Pistachio"
  }, {
    id: "coconut",
    name: "Creamy Coconut Milk",
    price: 0.9,
    color: "#faf5ee",
    text: "Tropical Subtlety"
  }, {
    id: "none",
    name: "No Milk (Black Coffee)",
    price: 0.0,
    color: "transparent",
    text: "Pure & Intense"
  }
];

export const SUGAR_LEVELS = [
  {
    id: "0",
    name: "0% Unsweetened",
    percent: "0%"
  }, {
    id: "25",
    name: "25% Light Touch",
    percent: "25%"
  }, {
    id: "50",
    name: "50% Perfectly Balanced",
    percent: "50%"
  }, {
    id: "75",
    name: "75% Sweet Indulgence",
    percent: "75%"
  }, {
    id: "100",
    name: "100% Extra Sweet",
    percent: "100%"
  }
];

export const SYRUP_OPTIONS = [
  {
    id: "vanilla",
    name: "Madagascar Vanilla",
    price: 0.6,
    flavorNote: "warm vanilla bean aroma"
  }, {
    id: "caramel",
    name: "Salted Amber Caramel",
    price: 0.7,
    flavorNote: "buttery salted caramel sweetness"
  }, {
    id: "hazelnut",
    name: "Roasted Hazelnut",
    price: 0.6,
    flavorNote: "toasted nutty depth"
  }, {
    id: "lavender",
    name: "French Wild Lavender",
    price: 0.8,
    flavorNote: "delicate botanical lavender essence"
  }, {
    id: "mocha",
    name: "Belgian Dark Mocha",
    price: 0.75,
    flavorNote: "rich 70% dark cocoa velvet"
  }, {
    id: "none",
    name: "No Added Syrup",
    price: 0.0,
    flavorNote: "unadulterated roast notes"
  }
];

export const EXTRA_BOOSTS = [
  {
    id: "extra-shot",
    name: "Extra Espresso Shot (+1.20)",
    price: 1.2
  }, {
    id: "collagen",
    name: "Beauty Collagen Peptide (+1.50)",
    price: 1.5
  }, {
    id: "cinnamon",
    name: "Ceylon Cinnamon Dust (+0.30)",
    price: 0.3
  }, {
    id: "vanilla-protein",
    name: "Organic Plant Protein (+1.80)",
    price: 1.8
  }
];

export const WHIPPED_CREAM = [
  {
    id: "none",
    name: "No Cream Top",
    price: 0.0,
    color: "transparent"
  }, {
    id: "vanilla-whip",
    name: "Fluffy Vanilla Whipped Cream",
    price: 0.7,
    color: "#ffffff"
  }, {
    id: "lavender-foam",
    name: "Lavender Sweet Cold Foam",
    price: 0.9,
    color: "#e8dbed"
  }, {
    id: "chocolate-foam",
    name: "Dark Cocoa Cold Foam",
    price: 0.85,
    color: "#6e473b"
  }
];

// Local Gemma 4 Model Endpoint Configuration (Ollama / Local LLM REST API)
const OLLAMA_CHAT_ENDPOINT = "http://localhost:11434/api/chat";
const OLLAMA_COMPLETIONS_ENDPOINT = "http://localhost:11434/v1/chat/completions";
const LOCAL_MODEL_NAMES = ["gemma4", "gemma:4b", "gemma:latest", "gemma"];

// Exact Refusal Message required for any non-café questions
export const EXACT_REFUSAL_MESSAGE = "Sorry, I can only help with questions about our café, menu, drinks, food, reservations, and services.";

// Build System Context for Gemma 4
const CAFE_SYSTEM_PROMPT = `You are Oak & Bean's knowledgeable, friendly AI Barista assistant. You speak like a warm, experienced barista.

YOUR STRICT DOMAIN & BOUNDARIES:
You MUST ONLY answer questions related to Oak & Bean café, including:
- Menu items (coffee, teas, beverages, bakery, desserts, light bites)
- Coffee recommendations, food and beverages
- Prices, ingredient details, allergens, dietary options (vegan, gluten-free, nut-free, organic)
- Opening hours, café location, address, directions, parking, seating capacity, Wi-Fi speed, power outlets
- Table reservations, seating availability, booking policies
- Contact information (phone: ${CAFE_INFO.phone}, email: ${CAFE_INFO.email})
- Events, active special offers and discount promo codes (OAK15: 15% off, BREW20: 20% off custom coffee, MORNINGCOMBO: free pastry)
- Delivery and takeaway, express pickup, delivery partners (UberEats, DoorDash, GrubHub)
- Payment methods, loyalty rewards program, and general café FAQs

CRITICAL INSTRUCTION:
If the user asks ANY question that is NOT related to the café (such as general knowledge, coding, programming, mathematics, science, politics, news, personal advice, entertainment, history, etc.), YOU MUST NOT ANSWER IT. Instead, YOU MUST ALWAYS REPLY WITH EXACTLY THIS RESPONSE AND NOTHING ELSE:
"${EXACT_REFUSAL_MESSAGE}"

CAFÉ INFORMATION:
Name: ${CAFE_INFO.name}
Address: ${CAFE_INFO.address}
Phone: ${CAFE_INFO.phone}
Email: ${CAFE_INFO.email}
Hours: Weekdays (${CAFE_INFO.hours.weekdays}), Weekends (${
CAFE_INFO.hours.weekends}), Holidays (${CAFE_INFO.hours.holidays})
Seating: Total ${CAFE_INFO.seating.totalCapacity} (Indoor ${
CAFE_INFO.seating.indoorSeats}, Patio ${CAFE_INFO.seating.patioSeats}), Wi-Fi: ${CAFE_INFO.seating.wifiSpeed}
parking: ${CAFE_INFO.parking}

Delivery: Express 15-min delivery within 3 miles ($2.99 fee, FREE on orders > $25). Express pickup available.
Active Promo Codes: OAK15 (15% off orders > $10), BREW20 (20% off custom coffee builder), MORNINGCOMBO (Free pastry with large latte)

MENU ITEMS:
${MENU_ITEMS.map(i => `- ${i.name} ($${i.price.toFixed(2)}): ${i.description}. Ingredients: ${i.ingredients.join(", ")}. Allergens: ${i.allergens.join(", ")}. Category: ${i.category}. Tags: ${i.tags.join(", ")}`).join("\n")}`;

// Domain relevance guardrail check
export function isCafeRelatedQuery(query) {
  if (!query || typeof query !== "string") 
    return false;
  const q = query.toLowerCase().trim();
  if (!q) 
    return false;
  
  // Check greetings & cafe conversational phrases first
  const greetingPhrases = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good evening",
    "good afternoon",
    "how are you",
    "who are you",
    "what are you",
    "help"
  ];
  if (greetingPhrases.some(g => q === g || q.startsWith(g))) {
    return true;
  }

  // Explicit non-café topics check
  const nonCafePatterns = [
    /\b(python|javascript|typescript|react|vue|angular|node|java|c\+\+|c#|ruby|golang|rust|php|html|css|sql|git|github|npm|vite|webpack|coding|code|programmer|programming|script|function|class|method|variable|array|object|loop|algorithm|database|api|endpoint|syntax|bug|debug|error|stacktrace)\b/i,
    /\b(math|mathematics|algebra|geometry|calculus|derivative|integral|equation|solve|formula|multiplication|division)\b/i,
    /^\s*\d+\s*[\+\-\*\/\^=]\s*\d+/,
    /\b(president|prime minister|governor|senator|election|politics|political|democrat|republican|capital of|country|war|world war|history|historical|century|parliament|congress)\b/i,
    /\b(quantum|physics|relativity|astronomy|galaxy|planet|orbit|chemistry|atom|molecule|element|photosynthesis|biology|dna|rna|genetics|gravity)\b/i,
    /\b(movie|film|actor|actress|cinema|director|song|lyrics|singer|album|band|music|game|gaming|playstation|xbox|nintendo|football|soccer|basketball|cricket|baseball|tennis|messi|ronaldo|game of thrones|marvel|dc|anime)\b/i,
    /\b(who is|who was|who created|who invented|tell me a joke|tell a story|write an essay|translate|weather in|stock market|crypto|bitcoin|ethereum)\b/i
  ];

  for (const pattern of nonCafePatterns) {
    if (pattern.test(q)) {
      // If query also explicitly mentions café/oak & bean context in a non-coding way, evaluate carefully
      const hasCafeBrand = q.includes("oak") || q.includes("bean") || q.includes("barista") || q.includes("coffee") || q.includes("cafe") || q.includes("café");
      const isCodingOrMath = /\b(python|javascript|code|coding|script|function|html|css|react|java|c\+\+|math|solve|algebra|calculus|capital of|president)\b/i.test(q) || /^\s*\d+\s*[\+\-\*\/\^=]\s*\d+/.test(q);
      if (isCodingOrMath || !hasCafeBrand) {
        return false;
      }
    }
  }

  // Allowed café keywords / short queries
  const cafeKeywords = [
    "coffee",
    "café",
    "cafe",
    "barista",
    "oak",
    "bean",
    "drink",
    "drinks",
    "beverage",
    "beverages",
    "latte",
    "lattes",
    "espresso",
    "espressos",
    "cappuccino",
    "macchiato",
    "americano",
    "flat white",
    "cold brew",
    "nitro",
    "frappe",
    "mocha",
    "matcha",
    "tea",
    "teas",
    "hibiscus",
    "croissant",
    "danish",
    "pastry",
    "pastries",
    "bakery",
    "cake",
    "cakes",
    "dessert",
    "desserts",
    "sweet",
    "sweets",
    "sourdough",
    "toast",
    "avocado",
    "bites",
    "food",
    "snack",
    "snacks",
    "menu",
    "price",
    "prices",
    "cost",
    "hours",
    "time",
    "timing",
    "open",
    "close",
    "location",
    "address",
    "where",
    "wifi",
    "wi-fi",
    "internet",
    "seat",
    "seats",
    "seating",
    "table",
    "tables",
    "reserve",
    "reservation",
    "booking",
    "vegan",
    "plant",
    "dairy",
    "gluten",
    "allergen",
    "allergens",
    "ingredient",
    "ingredients",
    "calorie",
    "calories",
    "strong",
    "caffeine",
    "cheap",
    "cheapest",
    "expensive",
    "priciest",
    "best",
    "recommend",
    "recommendation",
    "suggestion",
    "suggest",
    "delivery",
    "takeaway",
    "pickup",
    "ubereats",
    "doordash",
    "contact",
    "phone",
    "email",
    "payment",
    "card",
    "cash",
    "discount",
    "promo",
    "code",
    "offer",
    "offers",
    "coupon",
    "deal",
    "deals",
    "loyalty",
    "reward",
    "bestseller",
    "bestsellers",
    "hi",
    "hello",
    "hey",
    "help",
    "hot",
    "cold",
    "bitter",
    "surprise"
  ];

  const normalized = normalizeQuery(q);
  const words = normalized.split(/\s+/);

  return words.some(w => cafeKeywords.includes(w) || cafeKeywords.some(k => k.includes(w)));
}

// Normalize common typos and variations
function normalizeQuery(str) {
  let q = str.toLowerCase();

  const typos = [
    {
      regex: /\blati\b|\blate\b|\blatten\b/g,
      replacement: "latte"
    }, {
      regex: /\bcofee\b|\bcoffe\b|\bcofe\b|\bkafe\b|\bkaffee\b|\bcaffee\b/g,
      replacement: "coffee"
    }, {
      regex: /\bexpresso\b|\bespreso\b/g,
      replacement: "espresso"
    }, {
      regex: /\bcappucino\b|\bcapuchino\b/g,
      replacement: "cappuccino"
    }, {
      regex: /\bmacha\b|\bmatca\b/g,
      replacement: "matcha"
    }, {
      regex: /\bcrosant\b|\bcroisant\b|\bcroisaint\b/g,
      replacement: "croissant"
    }, {
      regex: /\bvgan\b|\bvegen\b|\bvegin\b/g,
      replacement: "vegan"
    }, {
      regex: /\bdesert\b|\bdsert\b/g,
      replacement: "dessert"
    }, {
      regex: /\brecomnd\b|\brecomended\b|\brecomend\b|\brecomendation\b/g,
      replacement: "recommend"
    }, {
      regex: /\bbestseler\b|\bpopuler\b|\bfav\b/g,
      replacement: "bestseller"
    }, {
      regex: /\bexpsnsive\b|\bexpensiv\b|\bpricy\b|\bpriciest\b/g,
      replacement: "expensive"
    }, {
      regex: /\bcheep\b/g,
      replacement: "cheap"
    }, {
      regex: /\bdelivry\b|\bdelvery\b/g,
      replacement: "delivery"
    }, {
      regex: /\bresrvation\b|\breserv\b/g,
      replacement: "reservation"
    }, {
      regex: /\blocatrion\b|\baddres\b|\badrss\b/g,
      replacement: "location"
    }, {
      regex: /\bhrs\b|\btimings\b|\bopning\b/g,
      replacement: "hours"
    }, {
      regex: /\bstrng\b|\bcafine\b|\bcaffein\b/g,
      replacement: "strong"
    }, {
      regex: /\bprce\b|\bprces\b/g,
      replacement: "price"
    }
  ];

  for (const {regex, replacement}
  of typos) {
    q = q.replace(regex, replacement);
  }

  return q;
}

function hasWords(query, wordsList) {
  return wordsList.some(word => query.includes(word));
}

// Extract relevant menu items for product card display
export function getMatchingMenuItems(query) {
  if (!query || typeof query !== "string") 
    return null;
  const q = normalizeQuery(query.toLowerCase().trim());

  // Direct specific item matching by exact name or key phrase
  if (hasWords(q, ["croissant"])) {
    return MENU_ITEMS.filter(i => i.id === "item-7");
  }
  if (hasWords(q, ["danish"])) {
    return MENU_ITEMS.filter(i => i.id === "item-8");
  }
  if (hasWords(q, ["flat white"])) {
    return MENU_ITEMS.filter(i => i.id === "item-3");
  }
  if (hasWords(q, ["uji", "matcha latte"])) {
    return MENU_ITEMS.filter(i => i.id === "item-4");
  }
  if (hasWords(q, ["spanish tea"])) {
    return MENU_ITEMS.filter(i => i.id === "item-5");
  }
  if (hasWords(q, ["mocha", "frappe"])) {
    return MENU_ITEMS.filter(i => i.id === "item-6");
  }
  if (hasWords(q, ["hibiscus", "iced tea"])) {
    return MENU_ITEMS.filter(i => i.id === "item-9");
  }
  if (hasWords(q, ["avocado", "sourdough", "toast"])) {
    return MENU_ITEMS.filter(i => i.id === "item-10");
  }
  if (hasWords(q, ["peanut cup", "chocolate cup"])) {
    return MENU_ITEMS.filter(i => i.id === "item-11");
  }
  if (hasWords(q, ["affogato"])) {
    return MENU_ITEMS.filter(i => i.id === "item-12");
  }
  if (hasWords(q, ["nitro", "cold foam"])) {
    return MENU_ITEMS.filter(i => i.id === "item-2");
  }

  // Multiple item drink types
  if (hasWords(q, ["latte", "lattes"])) {
    return MENU_ITEMS.filter(i => i.name.toLowerCase().includes("latte"));
  }
  if (hasWords(q, ["cappuccino", "espresso", "americano"])) {
    return MENU_ITEMS.filter(i => i.category === "espresso").slice(0, 3);
  }
  if (hasWords(q, ["cold brew", "cold-brew"])) {
    return MENU_ITEMS.filter(i => i.category === "cold-brew" || i.name.toLowerCase().includes("cold brew"));
  }

  // Categories
  if (hasWords(q, [
    "dessert",
    "desserts",
    "sweet coffee",
    "sweet drink",
    "sweet",
    "sweets",
    "cake",
    "cakes"
  ])) {
    return MENU_ITEMS.filter(i => i.category === "bakery" || i.category === "dessert" || i.id === "item-12" || i.id === "item-11" || i.id === "item-5").slice(0, 3);
  }
  if (hasWords(q, ["bakery", "pastry", "pastries", "baked", "baking"])) {
    return MENU_ITEMS.filter(i => i.category === "bakery").slice(0, 3);
  }
  if (hasWords(q, ["vegan", "plant based", "plant-based", "dairy free", "dairy-free"])) {
    return MENU_ITEMS.filter(i => i.category === "vegan" || i.tags.some(t => t.toLowerCase().includes("vegan") || t.toLowerCase().includes("dairy-free"))).slice(0, 3);
  }
  if (hasWords(q, ["tea", "matcha", "teas"])) {
    return MENU_ITEMS.filter(i => i.category === "matcha-tea");
  }
  if (hasWords(q, [
    "cold coffee",
    "cold drink",
    "cold drinks",
    "cold",
    "iced",
    "ice",
    "chilled",
    "refresher"
  ])) {
    return MENU_ITEMS.filter(i => i.category === "cold-brew" || i.category === "matcha-tea" || i.name.toLowerCase().includes("iced")).slice(0, 3);
  }
  if (hasWords(q, ["hot coffee", "hot drink", "hot drinks", "hot"])) {
    return MENU_ITEMS.filter(i => i.category === "espresso").slice(0, 3);
  }
  if (hasWords(q, ["coffee", "coffees", "espresso", "brew", "brews"])) {
    return MENU_ITEMS.filter(i => i.category === "espresso" || i.category === "cold-brew").slice(0, 3);
  }
  if (hasWords(q, [
    "food",
    "breakfast",
    "snack",
    "snacks",
    "bites",
    "eat",
    "hungry"
  ])) {
    return MENU_ITEMS.filter(i => i.category === "bakery" || i.category === "vegan").slice(0, 3);
  }

  // Attributes / Special queries
  if (hasWords(q, [
    "strong",
    "strongest",
    "caffeine",
    "kick",
    "bold",
    "bitter"
  ])) {
    return [
      MENU_ITEMS.find(i => i.id === "item-2"),
      MENU_ITEMS.find(i => i.id === "item-1"),
      MENU_ITEMS.find(i => i.id === "item-3")
    ].filter(Boolean);
  }
  if (hasWords(q, ["expensive", "costly", "priciest", "premium", "highest price"])) {
    const sorted = [...MENU_ITEMS].sort((a, b) => b.price - a.price);
    return [sorted[0]];
  }
  if (hasWords(q, [
    "cheap",
    "cheapest",
    "affordable",
    "budget",
    "lowest price",
    "under $5",
    "under 5"
  ])) {
    const sorted = [...MENU_ITEMS].sort((a, b) => a.price - b.price);
    return sorted.slice(0, 3);
  }
  if (hasWords(q, ["under 6", "under $6", "under 300", "under rs 300", "under ₹300"])) {
    return MENU_ITEMS.filter(i => i.price <= 6.0).slice(0, 3);
  }
  if (hasWords(q, [
    "best",
    "bestseller",
    "best seller",
    "popular",
    "top",
    "favorite",
    "fav",
    "recommend",
    "recommendation",
    "suggestion",
    "special",
    "specials",
    "signature",
    "surprise"
  ])) {
    return MENU_ITEMS.filter(i => i.popular).slice(0, 1);
  }

  // Generic keyword search matching across all items
  const keywordMatches = MENU_ITEMS.filter(item => {
    const nameLower = item.name.toLowerCase();
    const descLower = item.description.toLowerCase();
    const ingredientsLower = item.ingredients.map(ing => ing.toLowerCase()).join(" ");
    const tagsLower = item.tags.map(t => t.toLowerCase()).join(" ");

    const words = q.split(/\s+/).filter(w => w.length > 2);
    return words.some(w => nameLower.includes(w) || descLower.includes(w) || ingredientsLower.includes(w) || tagsLower.includes(w));
  });

  if (keywordMatches.length > 0) {
    return keywordMatches.slice(0, 3);
  }

  return null;
}

// Query local Gemma 4 model via Ollama / REST API
export async function queryGemmaLocalModel(userMessage, chatHistory = []) {
  if (!isCafeRelatedQuery(userMessage)) {
    return {text: EXACT_REFUSAL_MESSAGE, items: null, source: "guardrail"};
  }

  const formattedMessages = [
    {
      role: "system",
      content: CAFE_SYSTEM_PROMPT
    },
    ...chatHistory.slice(-6).map(m => ({
      role: m.sender === "user"
        ? "user"
        : "assistant",
      content: m.text
    })), {
      role: "user",
      content: userMessage
    }
  ];

  for (const modelName of LOCAL_MODEL_NAMES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(OLLAMA_CHAT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: modelName,
          messages: formattedMessages,
          stream: false,
          options: {
            temperature: 0.3
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.message && data.message.content) {
          const content = data.message.content.trim();
          if (content.toLowerCase().includes("python") || content.toLowerCase().includes("programming") || content.toLowerCase().includes("capital of")) {
            return {text: EXACT_REFUSAL_MESSAGE, items: null, source: "guardrail"};
          }
          return processResponseWithItemMatching(content, userMessage);
        }
      }
    } catch (e) {}

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(OLLAMA_COMPLETIONS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({model: modelName, messages: formattedMessages, temperature: 0.3}),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          const content = data.choices[0].message.content.trim();
          return processResponseWithItemMatching(content, userMessage);
        }
      }
    } catch (e) {}
  }

  return processUserChatQuery(userMessage);
}

function processResponseWithItemMatching(responseText, originalQuery) {
  const matchingItems = getMatchingMenuItems(originalQuery);

  return {text: responseText, items: matchingItems, source: "gemma4"};
}

export function processUserChatQuery(query) {
  if (!query || typeof query !== "string") {
    return {text: EXACT_REFUSAL_MESSAGE, items: null, source: "guardrail"};
  }

  if (!isCafeRelatedQuery(query)) {
    return {text: EXACT_REFUSAL_MESSAGE, items: null, source: "guardrail"};
  }

  const rawQ = query.toLowerCase().trim();
  const q = normalizeQuery(rawQ);
  const items = getMatchingMenuItems(q);

  // 1. Identity & Greeting Queries
  if (hasWords(q, ["who are you", "what is your name", "who made you", "what are you"])) {
    return {
      text: `☕ I'm your AI Barista at Oak & Bean Artisanal Café! I'm here to assist you with our specialty coffee menu, 5:00 AM freshly baked pastries, dietary options, store location, opening hours, table reservations, and active promo codes!`
      // items: MENU_ITEMS.filter(i => i.popular).slice(0, 3)
    };
  }

  if (hasWords(q, ["how are you", "how are u", "how do you do", "whats up", "what's up"])) {
    return {
      text: `☕ I'm doing fantastic and ready to help you find your perfect coffee or fresh pastry! How can I assist you at Oak & Bean today?`
      // items: MENU_ITEMS.filter(i => i.popular).slice(0, 3)
    };
  }

  if (hasWords(q, [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good evening",
    "good afternoon",
    "greetings"
  ])) {
    return {
      text: `☕ Welcome to Oak & Bean! As your AI Barista, I'd love to help you explore our specialty coffees, fresh 5:00 AM bakery items, dietary choices, opening hours, location, or table reservations! What can I get started for you today?`
      // items: MENU_ITEMS.filter(i => i.popular).slice(0, 3)
    };
  }

  // 2. Surprise me / Signature / Recommendation
  if (hasWords(q, ["surprise me", "surprise"])) {
    const signature = MENU_ITEMS.find(i => i.id === "item-1") || MENU_ITEMS[0];
    return {text: `✨ **Barista Surprise Pick!**\n\nI recommend trying our signature **${signature.name}** ($${signature.price.toFixed(2)})!\n\n*${signature.description}* Paired with a warm 5:00 AM French Butter Croissant, it's a true crowd favorite!`, items: [signature]};
  }

  // 3. Sweet / Bitter / Hot / Cold Coffee variations
  if (hasWords(q, ["sweet coffee", "which coffee is sweet", "sweet drink", "sweetest", "sweet"])) {
    const sweetItems = [
      MENU_ITEMS.find(i => i.id === "item-5"),
      MENU_ITEMS.find(i => i.id === "item-1"),
      MENU_ITEMS.find(i => i.id === "item-6")
    ].filter(Boolean);
    return {text: `🍯 **Our Sweetest & Most Indulgent Coffee Drinks:**\n\n1. **Smoked Vanilla Spanish Tea** ($5.90) – Folded with condensed milk & bourbon vanilla bean.\n2. **Oak & Bean Velvet Caramel Latte** ($5.80) – Ethiopian espresso with house salted amber caramel.\n3. **Cloud Nine Iced Mocha Frappe** ($6.75) – Blended espresso & Belgian 70% dark chocolate sauce topped with whipped cream!`, items: sweetItems};
  }

  if (hasWords(q, ["bitter coffee", "which coffee is bitter", "bitter", "black coffee", "bold brew"])) {
    const boldItems = [
      MENU_ITEMS.find(i => i.id === "item-2"),
      MENU_ITEMS.find(i => i.id === "item-3")
    ].filter(Boolean);
    return {text: `☕ **Bold, Unsweetened & Deep Roast Coffees:**\n\nIf you love pure, intense coffee flavor with subtle cocoa and roast notes:\n\n1. **Nitro Lavender Cold Foam Brew** ($6.20) – 20-hour slow-steeped unsweetened cold brew.\n2. **Artisanal Golden Oat Flat White** ($5.40) – Concentrated ristretto shots with rich oat micro-foam.`, items: boldItems};
  }

  if (hasWords(q, ["hot coffee", "which coffee is hot", "hot drink", "hot drinks", "hot"])) {
    const hotItems = [
      MENU_ITEMS.find(i => i.id === "item-1"),
      MENU_ITEMS.find(i => i.id === "item-3"),
      MENU_ITEMS.find(i => i.id === "item-5")
    ].filter(Boolean);
    return {text: `🔥 **Handcrafted Hot Specialty Coffees:**\n\nOur baristas craft these hot drinks with micro-foamed milks and freshly pulled Ethiopian espresso shots:\n\n1. **Oak & Bean Velvet Caramel Latte** ($5.80)\n2. **Artisanal Golden Oat Flat White** ($5.40)\n3. **Smoked Vanilla Spanish Tea** ($5.90)`, items: hotItems};
  }

  if (hasWords(q, [
    "cold coffee",
    "which coffee is cold",
    "cold drink",
    "cold drinks",
    "iced coffee",
    "chilled",
    "cold"
  ])) {
    const coldItems = [
      MENU_ITEMS.find(i => i.id === "item-2"),
      MENU_ITEMS.find(i => i.id === "item-6"),
      MENU_ITEMS.find(i => i.id === "item-9")
    ].filter(Boolean);
    return {text: `🧊 **Refreshing Cold Brews & Iced Drinks:**\n\nServed over crystal ice spheres or nitrogen-infused micro-foam:\n\n1. **Nitro Lavender Cold Foam Brew** ($6.20)\n2. **Cloud Nine Iced Mocha Frappe** ($6.75)\n3. **Organic Wild Berry Hibiscus Iced Tea** ($4.80)`, items: coldItems};
  }

  // 4. Specific drink type checks (espresso, cappuccino, americano, mocha)
  if (hasWords(q, ["espresso", "do you have espresso"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-1");
    return {text: `☕ **Direct-Trade Ethiopian Espresso:**\n\nWe pull direct-trade Ethiopian single-origin espresso shots as the foundation for all our drinks! Single shot: $3.50 | Double shot: $4.20.`, items: [item]};
  }

  if (hasWords(q, ["cappuccino", "do you have cappuccino", "how much is cappuccino", "price of cappuccino"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-3");
    return {text: `☕ **Cappuccinos & Flat Whites ($5.40):**\n\nWe serve velvety cappuccinos and flat whites crafted with double shots of Ethiopian espresso and silky hand-poured micro-foam milk art.`, items: [item]};
  }

  if (hasWords(q, ["americano", "do you have americano"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-3");
    return {text: `☕ **Classic Americano ($4.20):**\n\nPrepared with fresh double shots of direct-trade Ethiopian single-origin espresso diluted over hot filtered water or served iced over crystal ice spheres.`, items: [item]};
  }

  if (hasWords(q, ["mocha", "do you have mocha"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-6");
    return {text: `🍫 **Cloud Nine Iced Mocha Frappe ($6.75):**\n\nBlended espresso, Belgian 70% dark chocolate sauce, crushed ice, topped with house whipped cream and dark chocolate shavings!`, items: [item]};
  }

  // 5. Most expensive / priciest coffee
  if (hasWords(q, ["most expensive", "highest price", "costliest", "priciest", "expensive"])) {
    const sorted = [...MENU_ITEMS].sort((a, b) => b.price - a.price);
    const topItem = sorted[0];
    return {text: `☕ **Our Most Premium Specialty Drink:**\n\nOur highest priced coffee beverage is the **${topItem.name}** priced at **$${topItem.price.toFixed(2)}**.\n\n*${topItem.description}* It's crafted with premium ingredients and topped with shaved dark chocolate curls—a true signature indulgence!`, items: [topItem]};
  }

  // 6. Strongest coffee / highest caffeine
  if (hasWords(q, [
    "strongest",
    "strong",
    "highest caffeine",
    "boldest",
    "most caffeine",
    "extra strong",
    "kick"
  ])) {
    const nitro = MENU_ITEMS.find(i => i.id === "item-2");
    const latte = MENU_ITEMS.find(i => i.id === "item-1");
    const flatWhite = MENU_ITEMS.find(i => i.id === "item-3");

    return {
      text: `⚡ **Looking for a serious caffeine boost?**\n\nHere are our strongest brews handcrafted for maximum kick:\n\n1. **${nitro.name}** ($${nitro.price.toFixed(2)}) – 20-hour slow-steeped cold brew infused with nitrogen for an intense, silky kick.\n2. **${latte.name}** ($${latte.price.toFixed(2)}) – Features a bold double shot of direct-trade Ethiopian single-origin espresso.\n3. **${flatWhite.name}** ($${flatWhite.price.toFixed(2)}) – Concentrated ristretto shots combined with micro-foamed oat milk.`,
      items: [nitro, latte, flatWhite].filter(Boolean)
    };
  }

  // 7. Best seller / Most popular
  if (hasWords(q, [
    "best seller",
    "bestseller",
    "best",
    "most popular",
    "top seller",
    "crowd favorite",
    "famous",
    "top",
    "signature"
  ])) {
    const bestSellers = MENU_ITEMS.filter(i => i.popular || i.tags.includes("Best Seller"));
    return {
      text: `⭐ **Oak & Bean Crowd Favorites & Bestsellers:**\n\nOur most loved item is the **Oak & Bean Velvet Caramel Latte** ($5.80), featuring direct-trade Ethiopian espresso and house salted caramel. Paired with our 5:00 AM fresh **Golden Flaky French Butter Croissant** ($4.20), it's the ultimate morning ritual!`,
      items: bestSellers.slice(0, 3)
    };
  }

  // 8. Budget / Under $5 / Under $6 / Cheap
  if (hasWords(q, ["coffee under $5", "coffee under 5", "drinks under $5", "drinks under 5"])) {
    const cheapItems = MENU_ITEMS.filter(i => i.price <= 5.0);
    return {text: `💰 **Coffee & Beverages Under $5.00:**\n\n1. **Golden Flaky French Butter Croissant** – **$4.20**\n2. **Vegan Salted Chocolate Peanut Cup** – **$4.50**\n3. **Organic Wild Berry Hibiscus Iced Tea** – **$4.80**`, items: cheapItems};
  }

  if (hasWords(q, [
    "cheap",
    "cheapest",
    "lowest price",
    "least expensive",
    "budget",
    "affordable"
  ])) {
    const sorted = [...MENU_ITEMS].sort((a, b) => a.price - b.price);
    const cheapItems = sorted.slice(0, 3);
    return {text: `💰 **Budget-Friendly Picks:**\n\nOur most affordable beverage options start at just **$${cheapItems[0].price.toFixed(2)}**! We also offer fresh croissants for **$4.20** and vegan peanut cups for **$4.50**.`, items: cheapItems};
  }

  if (hasWords(q, [
    "under 6",
    "under $6",
    "under 300",
    "under rs 300",
    "under ₹300",
    "cold coffee under"
  ])) {
    const coldItemsUnderBudget = MENU_ITEMS.filter(i => i.price <= 6.5);
    return {
      text: `🧊 **Cold Coffee & Refreshers under $6.00:**\n\nHere are our top refreshing cold brews and artisanal iced teas crafted within your budget:\n\n1. **Organic Wild Berry Hibiscus Iced Tea** - **$4.80**\n2. **Artisanal Golden Oat Flat White** - **$5.40**\n3. **Affogato al Caffe with Vanilla** - **$6.00**`,
      items: coldItemsUnderBudget.slice(0, 3)
    };
  }

  // 9. Pastry & Coffee Pairing
  if (hasWords(q, ["pastry with coffee", "pair", "pairing", "recommend a pastry"])) {
    const coffee = MENU_ITEMS.find(i => i.id === "item-1");
    const pastry = MENU_ITEMS.find(i => i.id === "item-7");
    return {
      text: `🥐☕ **Perfect Coffee & Pastry Pairing:**\n\nWe recommend pairing our **Oak & Bean Velvet Caramel Latte** ($5.80) with a warm 5:00 AM **Golden Flaky French Butter Croissant** ($4.20). The buttery layers elevate the salted caramel notes!`,
      items: [coffee, pastry]
    };
  }

  // 10. Desserts, Pastries, Bakery
  if (hasWords(q, [
    "dessert",
    "desserts",
    "sweet",
    "sweets",
    "cake",
    "cakes"
  ])) {
    const desserts = MENU_ITEMS.filter(i => i.category === "bakery" || i.category === "dessert" || i.id === "item-12" || i.id === "item-11");
    return {
      text: `🥐 **Handcrafted Desserts & Sweets:**\n\nOur sweet bakery counter and Italian coffee desserts are prepared fresh daily using Normandy butter, Belgian dark chocolate, and organic ingredients:`,
      items: desserts.slice(0, 3)
    };
  }

  if (hasWords(q, [
    "bakery",
    "pastry",
    "pastries",
    "croissant",
    "danish",
    "baking"
  ])) {
    const pastries = MENU_ITEMS.filter(item => item.category === "bakery");
    return {
      text: `🥐 **Fresh Artisanal Bakery Counter:**\n\nOur bakery counter is updated every morning at 5:00 AM with 27-layer French butter croissants, pistachio cardamom danishes, and vegan treats:`,
      items: pastries.slice(0, 3)
    };
  }

  // 11. Recommendations
  if (hasWords(q, [
    "recommend",
    "recommendation",
    "suggestion",
    "suggest",
    "what to order",
    "what should i get",
    "special",
    "specials",
    "try"
  ])) {
    const recommended = MENU_ITEMS.filter(item => item.popular);
    return {
      text: `☕ **Barista Recommendations:**\n\nIf you're in the mood for coffee, I recommend our **Velvet Caramel Latte** ($5.80) or **Nitro Lavender Cold Foam Brew** ($6.20). If you want something caffeine-free, try our **Ceremonial Uji Matcha Latte** ($6.50)!`,
      items: recommended.slice(0, 3)
    };
  }

  // 12. Healthy & Dietary
  if (hasWords(q, ["healthy", "is it healthy"])) {
    const healthyItems = [
      MENU_ITEMS.find(i => i.id === "item-9"),
      MENU_ITEMS.find(i => i.id === "item-4"),
      MENU_ITEMS.find(i => i.id === "item-10")
    ].filter(Boolean);
    return {text: `🥗 **Healthy & Nutrient-Rich Options:**\n\n• **Organic Wild Berry Hibiscus Iced Tea** (70 cal, antioxidant-rich, caffeine-free)\n• **Ceremonial Uji Matcha Latte** (110 cal, superfood matcha & almond milk)\n• **Vegan Avocado Truffle Sourdough Toast** (290 cal, healthy fats & protein seeds)`, items: healthyItems};
  }

  if (hasWords(q, [
    "vegan",
    "plant",
    "gluten",
    "dairy free",
    "dairy-free",
    "allergen",
    "allergens",
    "ingredient",
    "ingredients",
    "calories",
    "cal",
    "nuts"
  ])) {
    const veganItems = MENU_ITEMS.filter(i => i.category === "vegan" || i.tags.some(t => t.toLowerCase().includes("vegan") || t.toLowerCase().includes("dairy-free")));
    return {
      text: `🌿 **Dietary Options & Plant-Based Choices:**\n\nWe offer Organic Oat, Unsweetened Almond, Creamy Coconut, & Roasted Pistachio milk alternatives, alongside 100% vegan sourdough toast and gluten-free pastries:`,
      items: veganItems.slice(0, 3)
    };
  }

  // 13. Product-Specific Questions & Item lookup
  if (hasWords(q, ["matcha latte vegan", "is matcha latte vegan"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-4");
    return {text: `🍵 **Ceremonial Uji Matcha Latte ($6.50):**\n\nOur Uji Matcha Latte is crafted with organic Kyoto ceremonial matcha, unsweetened almond milk, raw honey, and vanilla bean paste. It can be made **100% vegan** upon request by substituting raw honey with organic maple syrup!`, items: [item]};
  }

  if (hasWords(q, ["velvet caramel latte", "tell me about the velvet caramel latte"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-1");
    return {text: getItemDetailText(item), items: [item]};
  }

  if (hasWords(q, ["nitro cold brew", "what's in nitro cold brew", "nitro"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-2");
    return {text: getItemDetailText(item), items: [item]};
  }

  if (hasWords(q, ["croissant"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-7");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["danish"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-8");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["flat white"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-3");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["uji", "matcha"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-4");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["spanish tea"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-5");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["frappe", "iced mocha"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-6");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["hibiscus", "iced tea"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-9");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["avocado", "toast", "sourdough"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-10");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["peanut cup", "chocolate cup"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-11");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["affogato"])) {
    const item = MENU_ITEMS.find(i => i.id === "item-12");
    return {text: getItemDetailText(item), items: [item]};
  }
  if (hasWords(q, ["latte", "lattes", "how much is a latte"])) {
    const lattes = MENU_ITEMS.filter(i => i.name.toLowerCase().includes("latte"));
    return {text: `☕ **Our Signature Lattes:**\n\nWe feature handcrafted lattes using single-origin espresso and organic ceremonial tea:`, items: lattes};
  }

  // Generic Item match by name
  const matchedItem = MENU_ITEMS.find(item => q.includes(item.name.toLowerCase()) || item.name.toLowerCase().split(" ").some(w => w.length > 3 && q.includes(w)));
  if (matchedItem) {
    return {text: getItemDetailText(matchedItem), items: [matchedItem]};
  }

  // 14. Store Location, Address, Parking
  if (hasWords(q, [
    "address",
    "location",
    "where",
    "direction",
    "directions",
    "map",
    "parking",
    "landmark"
  ])) {
    return {text: `📍 **Oak & Bean Store Location & Directions:**\n\n• **Address:** ${CAFE_INFO.address}\n•
     **Landmark:** Located in the Coffee District near Crema Park.\n• 
     **Parking:** Free 2-hour underground guest parking behind the cafe.${CAFE_INFO.parking}\n• **Phone:** ${CAFE_INFO.phone}`, items: null};
  }

  // 15. Opening Hours
  if (hasWords(q, [
    "hour",
    "hours",
    "open",
    "close",
    "time",
    "timing",
    "schedule",
    "when"
  ])) {
    return {text: `⏰ **Café Opening Hours:**\n\n• **Weekdays:** ${CAFE_INFO.hours.weekdays}\n• **Weekends:** ${CAFE_INFO.hours.weekends}\n• **Holidays:** ${CAFE_INFO.hours.holidays}\n\n🟢 *We are open daily for dine-in, takeaway, and express pickup!*`, items: null};
  }

  // 16. Student Discount, Loyalty, Discounts & Offers
  if (hasWords(q, ["student", "student discount", "loyalty", "rewards"])) {
    return {text: `🎟️ **Student Discounts & Loyalty Program:**\n\n• **Student Discount:** Show a valid student ID at checkout for 10% off your entire order!\n• **Loyalty Program:** Earn 1 point per $1 spent. Redeem 50 points for any free specialty drink!\n• **Promo Codes:** Use **OAK15** for 15% off orders > $10 or **BREW20** for 20% off custom coffee builder.`, items: null};
  }

  if (hasWords(q, [
    "price",
    "prices",
    "cost",
    "how much",
    "deal",
    "deals",
    "discount",
    "discounts",
    "promo",
    "code",
    "offer",
    "offers",
    "coupon"
  ])) {
    return {
      text: `💵 **Menu Pricing & Active Special Offers:**\n\n• **Specialty Brews:** ${CAFE_INFO.pricing.coffeeRange}\n• **Fresh Bakery:** ${CAFE_INFO.pricing.pastryRange}\n• **Average Per Person:** ${CAFE_INFO.pricing.averagePerPerson}\n\n🎁 **Active Promo Codes:**\n- **OAK15**: 15% off orders > $10\n- **BREW20**: 20% off custom coffee builder\n- **MORNINGCOMBO**: Free pastry with large latte (7 AM - 10 AM)`,
      items: items || MENU_ITEMS.filter(i => i.popular).slice(0, 2)
    };
  }

  // 17. Seating, Table Reservation, Wi-Fi, Outlets
  if (hasWords(q, [
    "seat",
    "seats",
    "seating",
    "table",
    "tables",
    "reserve",
    "reservation",
    "booking",
    "wifi",
    "wi-fi",
    "internet",
    "outlet",
    "outlets",
    "plug"
  ])) {
    return {text: `🪑 **Seating & Amenities:**\n\n• **Available Seats:** ${CAFE_INFO.seating.currentAvailable} open seats out of ${CAFE_INFO.seating.totalCapacity} (30 indoor, 15 patio).\n• **Wi-Fi:** ${CAFE_INFO.seating.wifiSpeed}.\n• **Power Outlets:** ${CAFE_INFO.seating.powerOutlets}.\n\nYou can click **Reserve a Table** in our top menu to book your spot!`, items: null};
  }

  // 18. Delivery, Takeaway, Pickup
  if (hasWords(q, [
    "delivery",
    "takeaway",
    "pickup",
    "ubereats",
    "doordash",
    "express"
  ])) {
    return {text: `🛵 **Delivery & Express Pickup:**\n\n• **15-Min Delivery:** ${CAFE_INFO.delivery.inHouse}.\n• **Express Pickup:** ${CAFE_INFO.delivery.pickup}\n• **Partners:** ${CAFE_INFO.delivery.partners}`, items: null};
  }

  // 19. Contact & Payments
  if (hasWords(q, [
    "contact",
    "phone",
    "email",
    "payment",
    "card",
    "pay",
    "loyalty",
    "cash"
  ])) {
    return {text: `💳 **Contact & Payment Options:**\n\n• **Phone:** ${CAFE_INFO.phone}\n• **Email:** ${CAFE_INFO.email}\n• **Accepted Payments:** Apple Pay, Google Pay, Visa, Mastercard, Cash.\n• **Loyalty Program:** Earn 1 point per $1 spent towards free specialty drinks!`, items: null};
  }

  //  if (hasWords(q, [
  //   "pariking",

  // ])) {
  //   return {text: "**Parking:** Free 2-hour underground guest parking behind the cafe" ${CAFE_INFO.parking}\n, }
  // }

  // 20. General Coffee/Menu Query
  if (hasWords(q, ["coffee", "menu", "drink", "food", "order"])) {
    return {
      text: `☕ Welcome to Oak & Bean! As your AI Barista, I'd love to help you explore our specialty coffees, fresh 5:00 AM bakery items, dietary choices, opening hours, location, or table reservations! What can I get started for you today?`,
      items: items || MENU_ITEMS.filter(i => i.popular).slice(0, 3)
    };
  }

  // Fallback for any other café query
  return {
    text: `☕ I'd be delighted to tell you more about our menu! Here are some of our popular customer favorites:`,
    items: items || MENU_ITEMS.filter(i => i.popular).slice(0, 3)
  };
}

function getItemDetailText(item) {
  return `☕ **${item.name}** ($${item.price.toFixed(2)}):\n\n*${
  item.description}*\n\n• **Ingredients:** ${item.ingredients.join(", ")}\n• **Allergens:** ${item.allergens.join(", ")}\n• **Prep Time:** ${item.prepTime || "2-3 mins"}\n• **Recommended Pairing:** ${item.pairingRecommendation}`;
}

export function calculateCustomCoffee(config) {
  const base = COFFEE_BASES.find(b => b.id === config.base) || COFFEE_BASES[0];
  const milk = MILK_OPTIONS.find(m => m.id === config.milk) || MILK_OPTIONS[0];
  const syrup = SYRUP_OPTIONS.find(s => s.id === config.syrup) || SYRUP_OPTIONS[0];
  const whip = WHIPPED_CREAM.find(w => w.id === config.whip) || WHIPPED_CREAM[0];

  let totalPrice = base.basePrice + milk.price + syrup.price + whip.price;

  if (config.boosts && config.boosts.length > 0) {
    config.boosts.forEach(bId => {
      const boostObj = EXTRA_BOOSTS.find(b => b.id === bId);
      if (boostObj) 
        totalPrice += boostObj.price;
      }
    );
  }

  const prefix = syrup.id !== "none"
    ? syrup.name.replace("Madagascar ", "").replace("Salted Amber ", "").replace("French Wild ", "").replace("Belgian Dark ", "")
    : milk.id !== "none"
      ? milk.name.replace("Organic ", "").replace("Barista ", "").replace("Artisanal ", "").replace("Unsweetened ", "")
      : "Artisanal";

  const baseNamePart = base.name.replace("Single Shot ", "").replace("Double Shot ", "").replace("Artisanal ", "").replace("Swiss Water ", "");
  const whipPart = whip.id !== "none"
    ? "Cloud"
    : "Mist";

  const generatedName = `Oak & Bean ${prefix} ${baseNamePart} ${whipPart}`;
  const flavorDesc = `A ${sugarLevelDescription(config.sugarLevel)} brew featuring ${base.name.toLowerCase()} blended with ${milk.text.toLowerCase()}. Elevated by ${
  syrup.flavorNote}${whip.id !== "none"
    ? ` and topped with ${whip.name.toLowerCase()}`
    : ""}.`;

  let pastryRecommendation = "Golden Flaky French Butter Croissant";
  if (config.syrup === "caramel" || config.syrup === "mocha") {
    pastryRecommendation = "Artisanal Pistachio Cardamom Danish";
  } else if (config.milk === "oat" || config.milk === "almond") {
    pastryRecommendation = "Vegan Salted Chocolate Peanut Cup";
  } else if (base.id.includes("nitro") || base.id.includes("cold-brew")) {
    pastryRecommendation = "Vegan Avocado Truffle Sourdough Toast";
  }

  return {
    name: generatedName,
    price: Number(totalPrice.toFixed(2)),
    flavorProfile: flavorDesc,
    pastryPairing: pastryRecommendation,
    baseObj: base,
    milkObj: milk,
    syrupObj: syrup,
    whipObj: whip,
    story: generateDrinkStory(generatedName, base.name)
  };
}

function sugarLevelDescription(sugarId) {
  switch (sugarId) {
    case "0":
      return "crisp and bold unsweetened";
    case "25":
      return "subtly sweet, roast-forward";
    case "50":
      return "harmoniously balanced and silky";
    case "75":
      return "lusciously rich and sweet";
    case "100":
      return "deeply sweet and dessert-like";
    default:
      return "wonderfully balanced";
  }
}

export function generateDrinkStory(drinkName, categoryOrBase = "Coffee") {
  const stories = [`Your ${drinkName} is tailored for a peaceful morning, offering warmth as you dive into your favorite book or creative work.`, `Crafted with precision, your ${drinkName} brings an invigorating boost of velvety energy to conquer your day with focus.`, `A match made in heaven: your ${drinkName} carries subtle artisanal notes that pair beautifully with quiet reflections and sunshine.`, `Every sip of your ${drinkName} tells a story of ethically sourced beans, master roast precision, and pure coffee bliss.`, `Designed for moments of inspiration—your ${drinkName} delivers a silky, luxurious taste that turns your coffee break into an experience.`];
  const index = Math.abs(hashCode(drinkName)) % stories.length;
  return stories[index];
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
