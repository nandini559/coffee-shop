export const CATEGORIES = [
  {
    id: "all",
    name: "All Brews & Bites",
    icon: "Sparkles"
  }, {
    id: "espresso",
    name: "Espresso & Classics",
    icon: "Coffee"
  }, {
    id: "cold-brew",
    name: "Cold Brew & Iced",
    icon: "Zap"
  }, {
    id: "matcha-tea",
    name: "Artisanal Teas & Matcha",
    icon: "Leaf"
  }, {
    id: "bakery",
    name: "Pastries & Bakery",
    icon: "Cookie"
  }, {
    id: "vegan",
    name: "Vegan & Plant-Based",
    icon: "Heart"
  }
];

export const MENU_ITEMS = [
  {
    id: "item-1",
    name: "Oak & Bean Velvet Caramel Latte",
    category: "espresso",
    price: 5.8,
    rating: 5,
    reviewsCount: 142,
    image: "/asset/coffeepic4.jpg",
    description: "Double shot of direct-trade Ethiopian espresso poured over velvety steamed oat milk, infused with house-made salted amber caramel.",
    ingredients: [
      "Ethiopian Single Origin Espresso", "Organic Oat Milk", "House-made Salted Caramel", "Madagascar Vanilla Bean"
    ],
    allergens: ["None (Dairy-free on request)"],
    tags: [
      "Best Seller", "Signature", "Dairy-Free Option"
    ],

    popular: true,
    pairingRecommendation: "Golden Butter Croissant"
  }, {
    id: "item-2",
    name: "Nitro Lavender Cold Foam Brew",
    category: "cold-brew",
    price: 6.2,
    rating: 5,
    reviewsCount: 198,
    image: "/asset/coffeepic7.jpg",
    description: "Slow-steeped 20-hour cold brew infused with nitrogen for a silky cascading micro-foam, topped with organic French lavender cold cream.",
    ingredients: [
      "20-Hr Cold Brew Blend", "Nitrogen Infusion", "French Lavender Syrup", "Sweet Cream Cold Foam"
    ],
    allergens: ["Dairy (Foam)"],
    tags: [
      "Cold Brew", "Customer Favorite", "Low Calorie Base"
    ],
    calories: 140,
    prepTime: "2 mins",
    popular: true,
    pairingRecommendation: "Lemon Blueberry Scone"
  }, {
    id: "item-3",
    name: "Artisanal Golden Oat Flat White",
    category: "espresso",
    price: 5.4,
    rating: 5,
    reviewsCount: 96,
    image: "/asset/coffeepic5.png",
    description: "Ristretto espresso shots combined with silky micro-foamed Minor Figures Oat Milk, featuring intricate hand-poured latte art.",
    ingredients: [
      "Ristretto Blend Espresso", "Barista Oat Milk", "Touch of Cinnamon Dust"
    ],
    allergens: ["Gluten (Oat)"],
    tags: [
      "Vegan", "Sugar-Free", "Classic"
    ],
    calories: 130,
    prepTime: "3 mins",
    popular: false,
    pairingRecommendation: "Almond Biscotti"
  }, {
    id: "item-4",
    name: "Ceremonial Uji Latte",
    category: "matcha-tea",
    price: 6.5,
    rating: 5,
    reviewsCount: 115,
    image: "/asset/coffeepic3.jpg",
    description: "First-harvest ceremonial grade Kyoto matcha whisked to perfection with warm almond milk and a touch of raw wild wildflower honey.",
    ingredients: [
      "Uji Ceremonial Matcha", "Unsweetened Almond Milk", "Raw Honey", "Vanilla Bean Paste"
    ],
    allergens: ["Tree Nuts (Almond)"],
    tags: [
      "Antioxidant-Rich", "Organic", "Superfood"
    ],
    calories: 110,
    prepTime: "4 mins",
    popular: true,
    pairingRecommendation: "Matcha White Chocolate Muffin"
  }, {
    id: "item-5",
    name: "Smoked Vanilla Spanish Tea",
    category: "espresso",
    price: 5.9,
    rating: 5,
    reviewsCount: 88,
    image: "/asset/coffeepic2.jpg",
    description: "Rich espresso folded with condensed milk, whole cream, and smoked bourbon vanilla bean, dusted with cocoa.",
    ingredients: [
      "Espresso Blend", "Condensed Whole Milk", "Bourbon Vanilla Bean", "Valrhona Cocoa Powder"
    ],
    allergens: ["Dairy"],
    tags: [
      "Sweet & Rich", "Chef Choice"
    ],
    calories: 260,
    prepTime: "3 mins",
    popular: true,
    pairingRecommendation: "Pain au Chocolat"
  }, {
    id: "item-6",
    name: "Cloud Nine Iced Mocha Frappe",
    category: "cold-brew",
    price: 6.75,
    rating: 4,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
    description: "Blended espresso, Belgian dark chocolate sauce, crushed ice, and topped with house whipped cream and shaved dark chocolate curls.",
    ingredients: [
      "Espresso", "Belgian Dark Chocolate (70%)", "Whole Milk", "Whipped Cream", "Dark Chocolate Shavings"
    ],
    allergens: [
      "Dairy", "Soy (Chocolate)"
    ],
    tags: [
      "Indulgent", "Iced Blended"
    ],
    calories: 340,
    prepTime: "4 mins",
    popular: false,
    pairingRecommendation: "Double Fudge Brownie"
  }, {
    id: "item-7",
    name: "Golden Flaky French Butter Croissant",
    category: "bakery",
    price: 4.2,
    rating: 5,
    reviewsCount: 230,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    description: "Baked fresh every morning at 5:00 AM using 84% butterfat Normandy butter, featuring 27 paper-thin golden crispy layers.",
    ingredients: [
      "Normandy Butter", "French T55 Flour", "Organic Cane Sugar", "Sea Salt"
    ],
    allergens: [
      "Gluten", "Dairy"
    ],
    tags: [
      "Freshly Baked", "Classic French", "Top Morning Pick"
    ],
    calories: 280,
    prepTime: "Instant / Warmed 1 min",
    popular: true,
    pairingRecommendation: "Oak & Bean Velvet Caramel Latte"
  }, {
    id: "item-8",
    name: "Artisanal Pistachio Cardamom Danish",
    category: "bakery",
    price: 5.1,
    rating: 4,
    reviewsCount: 104,
    image: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&w=800&q=80",
    description: "Flaky pastry crown filled with Sicilian pistachio frangipane, crushed green pistachios, and aromatic cardamom sugar glaze.",
    ingredients: [
      "Sicilian Pistachio Paste", "Green Cardamom", "Puff Pastry", "Rose Petal Dust"
    ],
    allergens: [
      "Gluten", "Dairy", "Tree Nuts (Pistachio)"
    ],
    tags: [
      "Gourmet Pastry", "Chef Special"
    ],
    calories: 320,
    prepTime: "Instant / Warmed 1 min",
    popular: true,
    pairingRecommendation: "Artisanal Golden Oat Flat White"
  }, {
    id: "item-9",
    name: "Organic Wild Berry Hibiscus Iced Tea",
    category: "matcha-tea",
    price: 4.8,
    rating: 5,
    reviewsCount: 62,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    description: "Refreshing cold-infused blend of Egyptian hibiscus, wild blueberries, mint leaves, and elderflower syrup over crystal ice spheres.",
    ingredients: [
      "Egyptian Hibiscus Flowers", "Wild Blueberries", "Mint", "Elderflower Syrup"
    ],
    allergens: ["None"],
    tags: [
      "Vegan", "Caffeine-Free", "Gluten-Free"
    ],
    calories: 70,
    prepTime: "2 mins",
    popular: false,
    pairingRecommendation: "Lemon Glazed Poppy Cake"
  }, {
    id: "item-10",
    name: "Vegan Avocado Truffle Sourdough Toast",
    category: "vegan",
    price: 8.5,
    rating: 4,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80",
    description: "Hass avocado smashed with lime, white truffle oil, toasted pumpkin seeds, and chili flakes on warm artisanal sourdough.",
    ingredients: [
      "Organic Sourdough", "Hass Avocado", "White Truffle Oil", "Toasted Pepitas", "Flaky Maldon Sea Salt"
    ],
    allergens: ["Gluten (Sourdough)"],
    tags: [
      "100% Vegan", "Organic", "Savory Delights"
    ],
    calories: 290,
    prepTime: "5-6 mins",
    popular: true,
    pairingRecommendation: "Nitro Lavender Cold Foam Brew"
  }, {
    id: "item-11",
    name: "Vegan Salted Chocolate Peanut Cup",
    category: "vegan",
    price: 4.5,
    rating: 5,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    description: "Rich dark chocolate cup filled with creamy roasted peanut butter, maple syrup, and sprinkled with Himalayan pink sea salt.",
    ingredients: [
      "70% Dark Fair Trade Chocolate", "Roasted Peanuts", "Maple Syrup", "Himalayan Salt"
    ],
    allergens: ["Peanuts"],
    tags: [
      "Vegan", "Gluten-Free", "Keto-Friendly Option"
    ],
    calories: 220,
    prepTime: "Instant",
    popular: false,
    pairingRecommendation: "Ceremonial Uji Matcha Latte"
  }, {
    id: "item-12",
    name: "Affogato al Caffe with Madagascar Vanilla",
    category: "espresso",
    price: 6.0,
    rating: 4,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80",
    description: "A scoop of handcrafted Madagascar vanilla bean gelato drowned in a hot shot of freshly extracted espresso.",
    ingredients: [
      "Artisanal Vanilla Bean Gelato", "Fresh Double Shot Espresso", "Dark Chocolate Curl"
    ],
    allergens: ["Dairy"],
    tags: [
      "Italian Classic", "Dessert & Coffee"
    ],
    calories: 190,
    prepTime: "2 mins",
    popular: true,
    pairingRecommendation: "Artisanal Pistachio Cardamom Danish"
  }
];
