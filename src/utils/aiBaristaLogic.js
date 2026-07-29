import { MENU_ITEMS } from '../data/menuData';
import { CAFE_INFO } from '../data/faqData';

// --- BUILD YOUR OWN COFFEE AI CONFIG & LOGIC EXPORTS ---

export const COFFEE_BASES = [
  { id: 'espresso-single', name: 'Single Shot Espresso', basePrice: 3.50, color: '#2b1b17', density: 0.7 },
  { id: 'espresso-double', name: 'Double Shot Espresso', basePrice: 4.20, color: '#1c120c', density: 0.8 },
  { id: 'cold-brew', name: 'Artisanal Cold Brew', basePrice: 4.50, color: '#382218', density: 0.6 },
  { id: 'nitro-brew', name: 'Nitro Cold Brew', basePrice: 5.00, color: '#22150e', density: 0.65 },
  { id: 'decaf-espresso', name: 'Decaf Swiss Water Espresso', basePrice: 4.00, color: '#4a2c20', density: 0.7 },
];

export const MILK_OPTIONS = [
  { id: 'oat', name: 'Organic Oat Milk', price: 0.80, color: '#f1cc9c', text: 'Silky & Nutty Oat' },
  { id: 'whole', name: 'Whole Creamery Milk', price: 0.00, color: '#fff8f0', text: 'Rich & Creamy Dairy' },
  { id: 'almond', name: 'Unsweetened Almond Milk', price: 0.80, color: '#f5dfc3', text: 'Light & Nutty Almond' },
  { id: 'pistachio', name: 'Artisanal Pistachio Milk', price: 1.20, color: '#d0e5c2', text: 'Velvety Roasted Pistachio' },
  { id: 'coconut', name: 'Creamy Coconut Milk', price: 0.90, color: '#faf5ee', text: 'Tropical Subtlety' },
  { id: 'none', name: 'No Milk (Black Coffee)', price: 0.00, color: 'transparent', text: 'Pure & Intense' },
];

export const SUGAR_LEVELS = [
  { id: '0', name: '0% Unsweetened', percent: '0%' },
  { id: '25', name: '25% Light Touch', percent: '25%' },
  { id: '50', name: '50% Perfectly Balanced', percent: '50%' },
  { id: '75', name: '75% Sweet Indulgence', percent: '75%' },
  { id: '100', name: '100% Extra Sweet', percent: '100%' },
];

export const SYRUP_OPTIONS = [
  { id: 'vanilla', name: 'Madagascar Vanilla', price: 0.60, flavorNote: 'warm vanilla bean aroma' },
  { id: 'caramel', name: 'Salted Amber Caramel', price: 0.70, flavorNote: 'buttery salted caramel sweetness' },
  { id: 'hazelnut', name: 'Roasted Hazelnut', price: 0.60, flavorNote: 'toasted nutty depth' },
  { id: 'lavender', name: 'French Wild Lavender', price: 0.80, flavorNote: 'delicate botanical lavender essence' },
  { id: 'mocha', name: 'Belgian Dark Mocha', price: 0.75, flavorNote: 'rich 70% dark cocoa velvet' },
  { id: 'none', name: 'No Added Syrup', price: 0.00, flavorNote: 'unadulterated roast notes' },
];

export const EXTRA_BOOSTS = [
  { id: 'extra-shot', name: 'Extra Espresso Shot (+1.20)', price: 1.20 },
  { id: 'collagen', name: 'Beauty Collagen Peptide (+1.50)', price: 1.50 },
  { id: 'cinnamon', name: 'Ceylon Cinnamon Dust (+0.30)', price: 0.30 },
  { id: 'vanilla-protein', name: 'Organic Plant Protein (+1.80)', price: 1.80 },
];

export const WHIPPED_CREAM = [
  { id: 'none', name: 'No Cream Top', price: 0.00, color: 'transparent' },
  { id: 'vanilla-whip', name: 'Fluffy Vanilla Whipped Cream', price: 0.70, color: '#ffffff' },
  { id: 'lavender-foam', name: 'Lavender Sweet Cold Foam', price: 0.90, color: '#e8dbed' },
  { id: 'chocolate-foam', name: 'Dark Cocoa Cold Foam', price: 0.85, color: '#6e473b' },
];

// Local Gemma 4 Model Endpoint Configuration (Ollama / Local LLM REST API)
const OLLAMA_CHAT_ENDPOINT = 'http://localhost:11434/api/chat';
const OLLAMA_COMPLETIONS_ENDPOINT = 'http://localhost:11434/v1/chat/completions';
const LOCAL_MODEL_NAMES = ['gemma4', 'gemma:4b', 'gemma:latest', 'gemma'];

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
Hours: Weekdays (${CAFE_INFO.hours.weekdays}), Weekends (${CAFE_INFO.hours.weekends}), Holidays (${CAFE_INFO.hours.holidays})
Seating: Total ${CAFE_INFO.seating.totalCapacity} (Indoor ${CAFE_INFO.seating.indoorSeats}, Patio ${CAFE_INFO.seating.patioSeats}), Wi-Fi: ${CAFE_INFO.seating.wifiSpeed}
Delivery: Express 15-min delivery within 3 miles ($2.99 fee, FREE on orders > $25). Express pickup available.
Active Promo Codes: OAK15 (15% off orders > $10), BREW20 (20% off custom coffee builder), MORNINGCOMBO (Free pastry with large latte)

MENU ITEMS:
${MENU_ITEMS.map(i => `- ${i.name} ($${i.price.toFixed(2)}): ${i.description}. Ingredients: ${i.ingredients.join(', ')}. Allergens: ${i.allergens.join(', ')}. Category: ${i.category}. Tags: ${i.tags.join(', ')}`).join('\n')}`;

// Domain relevance guardrail check
export function isCafeRelatedQuery(query) {
  if (!query || typeof query !== 'string') return false;
  const q = query.toLowerCase().trim();
  
  const nonCafeKeywords = [
    'python', 'javascript', 'react', 'java', 'c++', 'code', 'coding', 'script', 'function', 'class', 'html', 'css',
    'capital of', 'who is', 'president of', 'math', 'calculate', 'quantum', 'physics', 'chemistry', 'biology',
    'politics', 'election', 'movie', 'actor', 'song', 'lyrics', 'crypto', 'bitcoin', 'stock market', 'weather in',
    'tell me a joke', 'who won', 'game of thrones', 'formula', 'algebra', 'solve', 'essay', 'recipe for pizza',
    'how to build', 'translate', 'what is the speed of', 'software', 'hardware', 'npm', 'vite'
  ];

  for (const word of nonCafeKeywords) {
    if (q.includes(word)) {
      return false;
    }
  }

  return true;
}

// Query local Gemma 4 model via Ollama / REST API
export async function queryGemmaLocalModel(userMessage, chatHistory = []) {
  if (!isCafeRelatedQuery(userMessage)) {
    return {
      text: EXACT_REFUSAL_MESSAGE,
      source: 'guardrail'
    };
  }

  const formattedMessages = [
    { role: 'system', content: CAFE_SYSTEM_PROMPT },
    ...chatHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: userMessage }
  ];

  for (const modelName of LOCAL_MODEL_NAMES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(OLLAMA_CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          messages: formattedMessages,
          stream: false,
          options: { temperature: 0.3 }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.message && data.message.content) {
          const content = data.message.content.trim();
          if (content.toLowerCase().includes('python') || content.toLowerCase().includes('programming') || content.toLowerCase().includes('capital of')) {
            return { text: EXACT_REFUSAL_MESSAGE, source: 'guardrail' };
          }
          return processResponseWithItemMatching(content, userMessage);
        }
      }
    } catch (e) {
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(OLLAMA_COMPLETIONS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          messages: formattedMessages,
          temperature: 0.3
        }),
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
    } catch (e) {
    }
  }

  return processUserChatQuery(userMessage);
}

function processResponseWithItemMatching(responseText, originalQuery) {
  const q = originalQuery.toLowerCase();
  let matchingItems = [];

  if (q.includes('dessert') || q.includes('pastry') || q.includes('cake') || q.includes('sweet')) {
    matchingItems = MENU_ITEMS.filter(i => i.category === 'bakery' || i.category === 'dessert').slice(0, 3);
  } else if (q.includes('special') || q.includes('recommend') || q.includes('bestseller') || q.includes('best seller') || q.includes('popular')) {
    matchingItems = MENU_ITEMS.filter(i => i.popular).slice(0, 3);
  } else {
    matchingItems = MENU_ITEMS.filter(item => 
      q.includes(item.name.toLowerCase()) || 
      item.ingredients.some(ing => q.includes(ing.toLowerCase()))
    ).slice(0, 3);
  }

  return {
    text: responseText,
    items: matchingItems.length > 0 ? matchingItems : null,
    source: 'gemma4'
  };
}

export function processUserChatQuery(query) {
  const q = query.toLowerCase().trim();

  if (!isCafeRelatedQuery(query)) {
    return {
      text: EXACT_REFUSAL_MESSAGE,
      source: 'guardrail'
    };
  }

  // 1. Most expensive coffee / highest price coffee item
  if (q.includes('most expensive') || q.includes('highest price') || q.includes('costliest') || q.includes('priciest')) {
    const coffeeItems = MENU_ITEMS.filter(i => i.category === 'espresso' || i.category === 'cold-brew' || i.category === 'matcha-tea');
    const sorted = [...coffeeItems].sort((a, b) => b.price - a.price);
    const topItem = sorted[0];

    return {
      text: `☕ **Our Most Premium Specialty Drink:**\n\nOur most expensive coffee beverage is the **${topItem.name}** priced at **$${topItem.price.toFixed(2)}** (approx ₹540).\n\n*${topItem.description}* It's crafted with premium ingredients and topped with shaved dark chocolate curls—a true signature indulgence!`,
      items: [topItem]
    };
  }

  // 2. Strongest coffee / highest caffeine / double shot / ristretto / boldest brew
  if (q.includes('strongest') || q.includes('highest caffeine') || q.includes('boldest') || q.includes('most caffeine') || q.includes('extra strong')) {
    const nitro = MENU_ITEMS.find(i => i.id === 'item-2'); // Nitro Lavender Cold Foam Brew
    const latte = MENU_ITEMS.find(i => i.id === 'item-1'); // Oak & Bean Velvet Caramel Latte
    const flatWhite = MENU_ITEMS.find(i => i.id === 'item-3'); // Flat White

    return {
      text: `⚡ **Looking for a serious caffeine boost?**\n\nHere are our strongest brews handcrafted for maximum kick:\n\n1. **${nitro.name}** ($${nitro.price.toFixed(2)}) – 20-hour slow-steeped cold brew infused with nitrogen for an intense, silky kick.\n2. **${latte.name}** ($${latte.price.toFixed(2)}) – Features a bold double shot of direct-trade Ethiopian single-origin espresso.\n3. **${flatWhite.name}** ($${flatWhite.price.toFixed(2)}) – Concentrated ristretto shots combined with micro-foamed oat milk.`,
      items: [nitro, latte, flatWhite]
    };
  }

  // 3. Best seller / Most popular coffee
  if (q.includes('best seller') || q.includes('bestseller') || q.includes('most popular') || q.includes('top seller') || q.includes('crowd favorite')) {
    const bestSellers = MENU_ITEMS.filter(i => i.popular || i.tags.includes('Best Seller'));
    
    return {
      text: `⭐ **Oak & Bean Crowd Favorites & Bestsellers:**\n\nOur most loved item is the **Oak & Bean Velvet Caramel Latte** ($5.80), featuring direct-trade Ethiopian espresso and house salted caramel. Paired with our 5:00 AM fresh **Golden Flaky French Butter Croissant** ($4.20), it's the ultimate morning ritual!`,
      items: bestSellers.slice(0, 3)
    };
  }

  // 4. Recommendations under ₹300 / $6 / budget cold coffee
  if (q.includes('under 300') || q.includes('under ₹300') || q.includes('under rs 300') || q.includes('under $6') || q.includes('under 6') || q.includes('cold coffee under')) {
    // ₹300 is approx $3.60 to $6.00 range
    const coldItemsUnderBudget = MENU_ITEMS.filter(i => (i.category === 'cold-brew' || i.category === 'matcha-tea' || i.name.toLowerCase().includes('iced') || i.name.toLowerCase().includes('flat white')) && i.price <= 6.5);

    return {
      text: `🧊 **Cold Coffee & Refreshers under ₹300 ($6.00):**\n\nHere are our top refreshing cold brews and artisanal iced teas crafted within your budget:\n\n1. **Organic Wild Berry Hibiscus Iced Tea** - **$4.80** (approx ₹380)\n2. **Artisanal Golden Oat Flat White** (Iced) - **$5.40** (approx ₹430)\n3. **Nitro Lavender Cold Foam Brew** - **$6.20** (approx ₹490)`,
      items: coldItemsUnderBudget.slice(0, 3)
    };
  }

  // 5. Cheap / Lowest price coffee
  if (q.includes('cheapest') || q.includes('lowest price') || q.includes('least expensive') || q.includes('budget coffee')) {
    const sorted = [...MENU_ITEMS].sort((a, b) => a.price - b.price);
    const cheapDrink = sorted.find(i => i.category === 'espresso' || i.category === 'matcha-tea') || sorted[0];

    return {
      text: `💰 **Budget-Friendly Pick:**\n\nOur most affordable beverage is the **${cheapDrink.name}** at just **$${cheapDrink.price.toFixed(2)}**! We also offer fresh croissants for **$4.20**.`,
      items: [cheapDrink]
    };
  }

  // 6. Desserts, Pastries, Bakery
  if (q.includes('dessert') || q.includes('pastry') || q.includes('cake') || q.includes('bakery') || q.includes('croissant') || q.includes('danish') || q.includes('sweet')) {
    const pastries = MENU_ITEMS.filter(item => item.category === 'bakery' || item.category === 'dessert');
    return {
      text: `🥐 **Fresh Artisanal Desserts & Pastries:**\n\nOur bakery counter is updated every morning at 5:00 AM with 27-layer French butter croissants, pistachio cardamom danishes, and vegan treats:`,
      items: pastries.slice(0, 3)
    };
  }

  // 7. General Recommendations
  if (q.includes('recommend') || q.includes('suggestion') || q.includes('what should i get') || q.includes('special')) {
    const recommended = MENU_ITEMS.filter(item => item.popular);
    return {
      text: `☕ **Barista Recommendations:**\n\nIf you're in the mood for coffee, I recommend our **Velvet Caramel Latte** ($5.80) or **Nitro Lavender Cold Foam Brew** ($6.20). If you want something caffeine-free, try our **Ceremonial Uji Matcha Latte** ($6.50)!`,
      items: recommended.slice(0, 3)
    };
  }

  // 8. Vegan, Dietary, Allergens, Ingredients
  if (q.includes('vegan') || q.includes('gluten') || q.includes('dairy-free') || q.includes('allergen') || q.includes('nut-free') || q.includes('dietary') || q.includes('ingredient') || q.includes('calories')) {
    const veganItems = MENU_ITEMS.filter(i => i.tags.some(t => t.toLowerCase().includes('vegan')) || i.category === 'vegan');
    return {
      text: `🌿 **Dietary Options & Plant-Based Choices:**\n\nWe offer Organic Oat, Unsweetened Almond, Creamy Coconut, & Roasted Pistachio milk alternatives, alongside 100% vegan sourdough toast and gluten-free pastries:`,
      items: veganItems.slice(0, 3)
    };
  }

  // 9. Specific Item lookup by name
  const matchedItemByName = MENU_ITEMS.find(item => q.includes(item.name.toLowerCase()) || item.name.toLowerCase().split(' ').some(word => word.length > 3 && q.includes(word)));
  if (matchedItemByName) {
    return {
      text: `☕ **${matchedItemByName.name}** ($${matchedItemByName.price.toFixed(2)}):\n\n*${matchedItemByName.description}*\n\n• **Ingredients:** ${matchedItemByName.ingredients.join(', ')}\n• **Allergens:** ${matchedItemByName.allergens.join(', ')}\n• **Prep Time:** ${matchedItemByName.prepTime || '2-3 mins'}\n• **Recommended Pairing:** ${matchedItemByName.pairingRecommendation}`,
      items: [matchedItemByName]
    };
  }

  // 10. Store Location, Address, Parking, Directions
  if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('direction') || q.includes('map') || q.includes('parking')) {
    return {
      text: `📍 **Oak & Bean Store Location & Directions:**\n\n• **Address:** ${CAFE_INFO.address}\n• **Parking:** Free 2-hour underground guest parking behind the cafe.\n• **Phone:** ${CAFE_INFO.phone}\n• **Landmark:** Located in the Coffee District near Crema Park!`
    };
  }

  // 11. Opening Hours
  if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('schedule') || q.includes('close')) {
    return {
      text: `⏰ **Café Opening Hours:**\n\n• **Weekdays:** ${CAFE_INFO.hours.weekdays}\n• **Weekends:** ${CAFE_INFO.hours.weekends}\n• **Holidays:** ${CAFE_INFO.hours.holidays}\n\n🟢 *We are open daily for dine-in, takeaway, and express pickup!*`
    };
  }

  // 12. Prices & Offers
  if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('deal') || q.includes('discount') || q.includes('promo') || q.includes('offer') || q.includes('coupon')) {
    return {
      text: `💵 **Menu Pricing & Active Special Offers:**\n\n• **Specialty Brews:** ${CAFE_INFO.pricing.coffeeRange}\n• **Fresh Bakery:** ${CAFE_INFO.pricing.pastryRange}\n\n🎁 **Active Promo Codes:**\n- **OAK15**: 15% off orders > $10\n- **BREW20**: 20% off custom coffee builder`
    };
  }

  // 13. Seating, Table Reservation, Wi-Fi, Outlets
  if (q.includes('seat') || q.includes('table') || q.includes('reserve') || q.includes('booking') || q.includes('wifi') || q.includes('outlet') || q.includes('plug')) {
    return {
      text: `🪑 **Seating & Table Reservations:**\n\n• **Available Seats:** ${CAFE_INFO.seating.currentAvailable} open seats out of ${CAFE_INFO.seating.totalCapacity}.\n• **Wi-Fi:** Free 1 Gbps High-Speed Fiber.\n• **Power Outlets:** Available at all tables and counter bars.\n\nYou can click **Reserve a Table** in our top menu to book your spot!`
    };
  }

  // 14. Delivery, Takeaway, Pickup
  if (q.includes('delivery') || q.includes('takeaway') || q.includes('pickup') || q.includes('ubereats') || q.includes('doordash')) {
    return {
      text: `🛵 **Delivery & Express Pickup:**\n\n• **15-Min Delivery:** Within 3 miles ($2.99 fee, FREE on orders over $25!).\n• **Express Pickup:** Order online and pick up at our counter bar without waiting.`
    };
  }

  // 15. Contact & Payments
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('payment') || q.includes('card') || q.includes('pay') || q.includes('loyalty')) {
    return {
      text: `💳 **Contact & Payment Options:**\n\n• **Phone:** ${CAFE_INFO.phone}\n• **Email:** ${CAFE_INFO.email}\n• **Accepted Payments:** Apple Pay, Google Pay, Visa, Mastercard, Cash.\n• **Loyalty Program:** Earn 1 point per $1 spent towards free specialty drinks!`
    };
  }

  // 16. Polite fallback for unanswerable café queries
  if (q.includes('cafe') || q.includes('coffee') || q.includes('drink') || q.includes('food') || q.includes('menu') || q.includes('oak') || q.includes('bean') || q.includes('order') || q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return {
      text: `☕ Hello! As a barista at Oak & Bean, I'd be happy to help you with anything about our specialty coffee menu, fresh bakery items, opening hours, location, or table reservations! What can I get started for you today?`
    };
  }

  // Default refusal for completely non-café questions
  return {
    text: EXACT_REFUSAL_MESSAGE,
    source: 'guardrail'
  };
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
      if (boostObj) totalPrice += boostObj.price;
    });
  }

  const prefix = syrup.id !== 'none' 
    ? syrup.name.replace('Madagascar ', '').replace('Salted Amber ', '').replace('French Wild ', '').replace('Belgian Dark ', '')
    : (milk.id !== 'none' ? milk.name.replace('Organic ', '').replace('Barista ', '').replace('Artisanal ', '').replace('Unsweetened ', '') : 'Artisanal');
  
  const baseNamePart = base.name.replace('Single Shot ', '').replace('Double Shot ', '').replace('Artisanal ', '').replace('Swiss Water ', '');
  const whipPart = whip.id !== 'none' ? 'Cloud' : 'Mist';

  const generatedName = `Oak & Bean ${prefix} ${baseNamePart} ${whipPart}`;
  const flavorDesc = `A ${sugarLevelDescription(config.sugarLevel)} brew featuring ${base.name.toLowerCase()} blended with ${milk.text.toLowerCase()}. Elevated by ${syrup.flavorNote}${whip.id !== 'none' ? ` and topped with ${whip.name.toLowerCase()}` : ''}.`;

  let pastryRecommendation = 'Golden Flaky French Butter Croissant';
  if (config.syrup === 'caramel' || config.syrup === 'mocha') {
    pastryRecommendation = 'Artisanal Pistachio Cardamom Danish';
  } else if (config.milk === 'oat' || config.milk === 'almond') {
    pastryRecommendation = 'Vegan Salted Chocolate Peanut Cup';
  } else if (base.id.includes('nitro') || base.id.includes('cold-brew')) {
    pastryRecommendation = 'Vegan Avocado Truffle Sourdough Toast';
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
    case '0': return 'crisp and bold unsweetened';
    case '25': return 'subtly sweet, roast-forward';
    case '50': return 'harmoniously balanced and silky';
    case '75': return 'lusciously rich and sweet';
    case '100': return 'deeply sweet and dessert-like';
    default: return 'wonderfully balanced';
  }
}

export function generateDrinkStory(drinkName, categoryOrBase = 'Coffee') {
  const stories = [
    `Your ${drinkName} is tailored for a peaceful morning, offering warmth as you dive into your favorite book or creative work.`,
    `Crafted with precision, your ${drinkName} brings an invigorating boost of velvety energy to conquer your day with focus.`,
    `A match made in heaven: your ${drinkName} carries subtle artisanal notes that pair beautifully with quiet reflections and sunshine.`,
    `Every sip of your ${drinkName} tells a story of ethically sourced beans, master roast precision, and pure coffee bliss.`,
    `Designed for moments of inspiration—your ${drinkName} delivers a silky, luxurious taste that turns your coffee break into an experience.`
  ];
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
