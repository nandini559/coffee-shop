import { MENU_ITEMS } from '../data/menuData';
import { CAFE_INFO } from '../data/faqData';

// --- BUILD YOUR OWN COFFEE AI CONFIG & LOGIC ---

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

// Generate dynamic AI Coffee details based on choices
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

  // AI Name Generator Matrix
  const prefix = syrup.id !== 'none' 
    ? syrup.name.replace('Madagascar ', '').replace('Salted Amber ', '').replace('French Wild ', '').replace('Belgian Dark ', '')
    : (milk.id !== 'none' ? milk.name.replace('Organic ', '').replace('Barista ', '').replace('Artisanal ', '').replace('Unsweetened ', '') : 'Artisanal');
  
  const baseNamePart = base.name.replace('Single Shot ', '').replace('Double Shot ', '').replace('Artisanal ', '').replace('Swiss Water ', '');
  const whipPart = whip.id !== 'none' ? 'Cloud' : 'Mist';

  const generatedName = `Oak & Bean ${prefix} ${baseNamePart} ${whipPart}`;

  // Sensory Flavor Profile Description
  const flavorDesc = `A ${sugarLevelDescription(config.sugarLevel)} brew featuring ${base.name.toLowerCase()} blended with ${milk.text.toLowerCase()}. Elevated by ${syrup.flavorNote}${whip.id !== 'none' ? ` and topped with ${whip.name.toLowerCase()}` : ''}.`;

  // Pastry recommendation engine
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

// AI STORY GENERATOR
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

// --- CHATBOT KNOWLEDGE BASE & INTENT ENGINE ---

export function processUserChatQuery(query) {
  const q = query.toLowerCase().trim();

  // 1. BEST SELLERS / POPULAR / RECOMMENDATIONS
  if (q.includes('best seller') || q.includes('popular') || q.includes('recommend') || q.includes('special') || q.includes('top drink')) {
    const popularItems = MENU_ITEMS.filter(item => item.popular);
    return {
      text: `Here are our **top-rated signature recommendations** at Oak & Bean! Each drink is hand-crafted with direct-trade beans:`,
      items: popularItems.slice(0, 3)
    };
  }

  // 2. VEGAN / GLUTEN FREE / ALLERGENS
  if (q.includes('vegan') || q.includes('gluten') || q.includes('dairy-free') || q.includes('allergen') || q.includes('nut-free') || q.includes('dietary')) {
    const veganItems = MENU_ITEMS.filter(i => i.tags.some(t => t.toLowerCase().includes('vegan')) || i.category === 'vegan');
    return {
      text: `🌿 We take dietary preferences very seriously! We offer **Organic Oat, Almond, Coconut, & Pistachio milks**, plus 100% gluten-free sourdough and vegan bakery items. Check out these popular choices:`,
      items: veganItems.slice(0, 3)
    };
  }

  // 3. ADDRESS / LOCATION / DIRECTIONS / PARKING
  if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('directions') || q.includes('map') || q.includes('parking')) {
    return {
      text: `📍 **Oak & Bean Location & Parking:**\n\n• **Address:** ${CAFE_INFO.address}\n• **Parking:** Free 2-hour underground guest parking behind the cafe, plus street parking.\n• **Phone:** ${CAFE_INFO.phone}\n• **Directions:** Located right in the heart of the Coffee District, near Crema Park!`
    };
  }

  // 4. OPENING HOURS / TIME / SCHEDULE
  if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('schedule') || q.includes('close')) {
    return {
      text: `⏰ **Operating Hours:**\n\n• **Monday – Friday:** ${CAFE_INFO.hours.weekdays}\n• **Saturday & Sunday:** ${CAFE_INFO.hours.weekends}\n• **Holidays:** ${CAFE_INFO.hours.holidays}\n\n🟢 *Status: Open right now with 14 seating spots available!*`
    };
  }

  // 5. PRICING / COST / AVERAGE PRICE
  if (q.includes('price') || q.includes('cost') || q.includes('expensive') || q.includes('menu price') || q.includes('how much')) {
    return {
      text: `💵 **Pricing & Value:**\n\n• **Espresso & Coffee:** ${CAFE_INFO.pricing.coffeeRange}\n• **Fresh Pastries & Bites:** ${CAFE_INFO.pricing.pastryRange}\n• **Average Order Value:** ${CAFE_INFO.pricing.averagePerPerson}\n\n✨ *Tip: Use discount code **OAK15** at checkout for 15% off your first online order!*`
    };
  }

  // 6. SEATING / RESERVATION / TABLE / WIFI / OUTLETS
  if (q.includes('seat') || q.includes('table') || q.includes('reserve') || q.includes('wifi') || q.includes('work') || q.includes('outlet')) {
    return {
      text: `🪑 **Seating & Ambiance:**\n\n• **Current Live Availability:** ${CAFE_INFO.seating.currentAvailable} seats open out of ${CAFE_INFO.seating.totalCapacity}.\n• **Wi-Fi:** ${CAFE_INFO.seating.wifiSpeed}.\n• **Power Outlets:** Accessible at every booth and counter bar.\n• **Patio:** 15 outdoor pet-friendly seats with heated fire pits.\n\nWant to book a table? Use our **Reservation Modal** at the bottom of the page!`
    };
  }

  // 7. OFFERS / DISCOUNTS / PROMO CODES / REWARDS
  if (q.includes('offer') || q.includes('discount') || q.includes('promo') || q.includes('code') || q.includes('coupon') || q.includes('deal')) {
    return {
      text: `🎟️ **Active Exclusive Cafe Offers:**\n\n1. **OAK15** – 15% Off any order over $10\n2. **BREW20** – 20% Off drinks created in our Custom AI Coffee Builder\n3. **MORNINGCOMBO** – Free pastry with any large latte (7 AM – 10 AM)\n\nSimply enter these codes at checkout!`
    };
  }

  // 8. DELIVERY / ONLINE ORDER / PICKUP / SHIPPING
  if (q.includes('delivery') || q.includes('order online') || q.includes('pickup') || q.includes('ubereats') || q.includes('doordash') || q.includes('ship')) {
    return {
      text: `🛵 **Online Ordering & Delivery:**\n\n• **Express In-House Delivery:** Delivered to your door in ~15 minutes within 3 miles (Free for orders > $25!).\n• **Express Pickup:** Order on this website, skip the line, and pick up hot at our designated counter bar.\n• **Delivery Partners:** Also live on UberEats, DoorDash, and GrubHub.`
    };
  }

  // 9. SEARCH SPECIFIC MENU ITEM MATCH
  const matchingItem = MENU_ITEMS.find(item => 
    q.includes(item.name.toLowerCase()) || 
    item.ingredients.some(ing => q.includes(ing.toLowerCase())) ||
    q.includes(item.category.toLowerCase())
  );

  if (matchingItem) {
    return {
      text: `Here is details for **${matchingItem.name}** ($${matchingItem.price.toFixed(2)}): ${matchingItem.description}`,
      items: [matchingItem]
    };
  }

  // 10. DEFAULT / FALLBACK SMART ANSWER
  return {
    text: `I'm happy to help you with anything at Oak & Bean! You can ask me about:\n\n• Our artisanal coffee menu & ingredients\n• Vegan & allergen options\n• Opening hours, address & directions\n• Dynamic pricing & discount promo codes\n• Seating availability & table reservations\n• Online ordering & 15-min delivery!`
  };
}
