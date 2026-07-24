export const CAFE_INFO = {
  name: 'Oak & Bean Artisanal AI Cafe',
  address: '742 Crema Boulevard, Suite 100, Coffee District, CA 90210',
  phone: '+1 (800) 555-OAKBEAN (6252)',
  email: 'hello@oakandbean.coffee',
  hours: {
    weekdays: '6:30 AM – 9:00 PM',
    weekends: '7:00 AM – 10:00 PM',
    holidays: '8:00 AM – 6:00 PM'
  },
  seating: {
    totalCapacity: 45,
    indoorSeats: 30,
    patioSeats: 15,
    currentAvailable: 14,
    wifiSpeed: '1 Gbps Fiber High Speed (Free for all guests)',
    powerOutlets: 'Available at all tables'
  },
  pricing: {
    coffeeRange: '$3.50 – $6.75',
    pastryRange: '$4.20 – $8.50',
    averagePerPerson: '$9.50'
  },
  delivery: {
    inHouse: 'Express 15-minute neighborhood delivery within 3 miles ($2.99 fee, FREE on orders over $25)',
    partners: 'Available on UberEats, DoorDash, and GrubHub',
    pickup: 'Order online & pick up at our Express Bar without waiting!'
  },
  offers: [
    { code: 'OAK15', discount: '15% Off Your First Online Order', minOrder: 10 },
    { code: 'BREW20', discount: '20% Off Custom Coffee Builder Drinks', minOrder: 0 },
    { code: 'MORNINGCOMBO', discount: 'Free Pastry with any Large Specialty Latte (7 AM - 10 AM)', minOrder: 0 }
  ]
};

export const QUICK_PROMPTS = [
  '☕ What are your top best sellers?',
  '🌱 What vegan & gluten-free options do you have?',
  '📍 What is your address and opening hours?',
  '🎟️ Are there any discount codes right now?',
  '🪑 Can I book a table or check current seating?',
  '🛵 How does online delivery & pickup work?'
];
