import type { CruiseDeal } from '../types/cruise';

// Seed data collected from live searches — April 2026
// All prices are per person, double occupancy, balcony cabin unless noted.
// Sources are listed per entry. Prices reflect late-July / early-August 2026 peak season.

export const cruiseDeals: CruiseDeal[] = [
  // ─────────────────────────────────────────────
  // 1. Royal Caribbean — Brilliance of the Seas
  // ─────────────────────────────────────────────
  {
    id: 'rci-brilliance-aug24-2026',
    shipName: 'Brilliance of the Seas',
    cruiseLine: 'Royal Caribbean',
    imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/ships/brilliance-of-the-seas/brilliance-of-the-seas-ship-hero.jpg',
    departureDate: '2026-08-24',
    returnDate: '2026-08-31',
    nights: 7,
    departurePort: 'Athens (Piraeus), Greece',
    itinerary: [
      { port: 'Athens (Piraeus)', country: 'Greece' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '08:00', departureTime: '22:00' },
      { port: 'Istanbul', country: 'Turkey', arrivalTime: '07:00', departureTime: '18:00' },
      { port: 'Ephesus (Kusadasi)', country: 'Turkey', arrivalTime: '09:00', departureTime: '19:00' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '07:00', departureTime: '21:00' },
      { port: 'Athens (Piraeus)', country: 'Greece' },
    ],
    pricing: {
      balconyPerPerson: 1950,
      insidePerPerson: 1299,
      currency: 'USD',
      bookingUrl: 'https://www.royalcaribbean.com/cruises/itinerary/7-night-greek-isles-turkey-from-athens-on-brilliance/BR07ATH-2230924814',
    },
    ship: {
      yearBuilt: 2002,
      yearRefurbished: 2020,
      tonnage: 90090,
      passengerCapacity: 2112,
      crewCount: 859,
      rating: 4.1,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Windjammer Marketplace buffet with live cooking stations',
        'Main Dining Room with rotating nightly menu — included',
        'Solarium Bistro — healthy options for adults',
      ],
      specialtyRestaurants: ["Chops Grille", "Giovanni's Table", 'Izumi (Asian fusion)'],
      menuStyle: 'International buffet + à la carte MDR',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free', 'Kosher (pre-order)'],
      foodScore: 7,
      comparisonNotes: 'Solid variety but a step below Celebrity. Specialty restaurants are the highlight — worth booking in advance.',
    },
    reviews: {
      overallRating: 4.1,
      foodRating: 3.9,
      serviceRating: 4.2,
      cabinRating: 4.0,
      entertainmentRating: 4.3,
      valueRating: 3.8,
      totalReviews: 4680,
      highlights: [
        '5 port days, only 1 sea day — maximum time ashore',
        'Santorini overnight stop is unusually long (07:00–21:00)',
        'Rock climbing wall, spa, outdoor cinema, casino, solarium',
        'Strong entertainment programme',
      ],
      concerns: [
        'Older ship — some areas show wear',
        'Peak-summer crowds at Greek island ports',
        'Extra costs add up (specialty dining, excursions)',
      ],
      evidenceUrls: [
        'https://www.cruisecritic.com/find-a-cruise/destination-eastern-mediterranean/cruise-line-royal-caribbean',
        'https://cruisesheet.com/royal-caribbean-brilliance-of-the-seas-7-night-athens-roundtrip-august-24-2026',
        'https://www.royalcaribbean.com/itinerary/7-night-greek-isles-turkey-cruise-from-athens-piraeus-on-brilliance-BR07ATH-2230924814',
      ],
    },
    score: {
      total: 78,
      breakdown: {
        price: 18,       // solid mid-range for 7 nights
        food: 16,        // above average
        itinerary: 20,   // excellent ports — Greece + Istanbul + Ephesus
        shipModernity: 11,
        ratings: 8,
        balconyValue: 5,
      },
      rank: 2,
      recommendation: 'Best overall itinerary for Greece + Turkey. Roundtrip Athens means no extra positioning flights.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.royalcaribbean.com/itinerary/7-night-greek-isles-turkey-cruise-from-athens-piraeus-on-brilliance-BR07ATH-2230924814',
      'https://www.royalcaribbean.com/cruise-deals/cruises/itinerary/7-night-greek-isles-turkey-from-athens-on-brilliance/BR07ATH-2230924814?sail-date=2026-08-24&currency=EUR&country=EST',
      'https://cruisesheet.com/royal-caribbean-brilliance-of-the-seas-7-night-athens-roundtrip-august-24-2026',
    ],
    status: 'available',
  },

  // ─────────────────────────────────────────────
  // 2. Royal Caribbean — Odyssey of the Seas
  // ─────────────────────────────────────────────
  {
    id: 'rci-odyssey-jul19-2026',
    shipName: 'Odyssey of the Seas',
    cruiseLine: 'Royal Caribbean',
    imageUrl: 'https://www.royalcaribbean.com/content/dam/royal/ships/odyssey-of-the-seas/odyssey-of-the-seas-ship-hero.jpg',
    departureDate: '2026-07-19',
    returnDate: '2026-07-26',
    nights: 7,
    departurePort: 'Rome (Civitavecchia), Italy',
    itinerary: [
      { port: 'Rome (Civitavecchia)', country: 'Italy' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '10:00', departureTime: '23:00' },
      { port: 'Ephesus (Kusadasi)', country: 'Turkey', arrivalTime: '09:00', departureTime: '19:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '17:00' },
      { port: 'Naples', country: 'Italy', arrivalTime: '07:00', departureTime: '18:00' },
      { port: 'Rome (Civitavecchia)', country: 'Italy' },
    ],
    pricing: {
      balconyPerPerson: 1901,
      insidePerPerson: 1859,
      suitePerPerson: 3662,
      currency: 'USD',
      bookingUrl: 'https://www.royalcaribbean.com/cruise-ships/cruises/itinerary/7-night-greek-isles-from-rome-on-odyssey/OY07ROM-3274971603',
    },
    ship: {
      yearBuilt: 2021,
      tonnage: 169116,
      passengerCapacity: 4180,
      crewCount: 1551,
      rating: 4.3,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Coastal Kitchen (suite guests) — elevated farm-to-table menu',
        'Windjammer Café buffet with global stations',
        'Café Promenade — 24h snacks and coffee',
      ],
      specialtyRestaurants: ['Chops Grille', 'Jamie\'s Italian', 'Izumi Hibachi', 'Hooked Seafood'],
      menuStyle: 'International buffet + specialty à la carte',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free', 'Halal (select items)', 'Kosher (pre-order)'],
      foodScore: 8,
      comparisonNotes: 'Best Royal Caribbean dining experience — Quantum class has the widest specialty restaurant selection. Closer to Celebrity quality than older RCI ships.',
    },
    reviews: {
      overallRating: 4.3,
      foodRating: 4.1,
      serviceRating: 4.4,
      cabinRating: 4.3,
      entertainmentRating: 4.5,
      valueRating: 3.9,
      totalReviews: 2840,
      highlights: [
        'Ultra-modern 2021-built Quantum Ultra Class ship',
        'FlowRider surf simulator, North Star observation capsule, skydiving simulator',
        'First Quantum class ship in Europe — top-tier entertainment',
        'Santorini evening stay (10:00–23:00) — sunset viewing from ship',
      ],
      concerns: [
        'Very large ship — busy feel in peak season',
        'Rome departure means additional travel if flying into Athens',
        'Higher price point for suites',
      ],
      evidenceUrls: [
        'https://www.cruisetimetables.com/cruisesonodysseyoftheseas-jul2026.html',
        'https://www.royalcaribbean.com/cruise-ships/odyssey-of-the-seas',
        'https://cruisegalore.com/cruise-lines-ranked-2025/',
      ],
    },
    score: {
      total: 82,
      breakdown: {
        price: 19,
        food: 17,
        itinerary: 18,
        shipModernity: 15,
        ratings: 8,
        balconyValue: 5,
      },
      rank: 1,
      recommendation: 'Newest ship in the search — perfect for those who want top-tier onboard amenities alongside Greek islands.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.cruisetimetables.com/cruisesonodysseyoftheseas-jul2026.html',
      'https://www.royalcaribbean.com/cruise-ships/odyssey-of-the-seas',
      'https://www.cruisemapper.com/ships/Odyssey-Of-The-Seas-1862',
    ],
    status: 'available',
  },

  // ─────────────────────────────────────────────
  // 3. Celebrity Cruises — Celebrity Equinox
  // ─────────────────────────────────────────────
  {
    id: 'celebrity-equinox-jul18-2026',
    shipName: 'Celebrity Equinox',
    cruiseLine: 'Celebrity Cruises',
    imageUrl: 'https://www.celebritycruises.com/content/dam/celebrity/ship-pages/equinox/celebrity-equinox-ship-hero.jpg',
    departureDate: '2026-07-18',
    returnDate: '2026-07-28',
    nights: 10,
    departurePort: 'Barcelona, Spain',
    itinerary: [
      { port: 'Barcelona', country: 'Spain' },
      { port: 'Valletta', country: 'Malta', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Athens (Piraeus)', country: 'Greece', arrivalTime: '07:00', departureTime: '19:00' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Ephesus (Kusadasi)', country: 'Turkey', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Olympia (Katakolon)', country: 'Greece', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Rome (Civitavecchia)', country: 'Italy' },
    ],
    pricing: {
      balconyPerPerson: 2706,
      insidePerPerson: 1890,
      suitePerPerson: 5200,
      currency: 'USD',
      originalPrice: 3100,
      bookingUrl: 'https://www.celebritycruises.com/itinerary/10-night-greek-isles-turkey-from-barcelona-on-equinox-EQ10M377',
    },
    ship: {
      yearBuilt: 2009,
      yearRefurbished: 2019,
      tonnage: 122000,
      passengerCapacity: 2850,
      crewCount: 1253,
      rating: 4.4,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Grand Cuvée MDR — multi-course fine dining included nightly',
        'Oceanview Café — premium buffet with made-to-order stations',
        'Afternoon tea with pastries and finger sandwiches — complimentary',
        'In-suite dining available around the clock',
      ],
      specialtyRestaurants: ['Murano (French fine dining)', 'Qsine (avant-garde)', 'Tuscan Grille', 'Sushi on Five'],
      menuStyle: 'Upscale à la carte MDR + premium buffet',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free', 'Kosher', 'Dairy-free', 'Nut-free'],
      foodScore: 9,
      comparisonNotes: 'Best food quality in this comparison — Celebrity consistently outranks RCI and MSC for dining. Murano rivals land-based fine dining.',
    },
    reviews: {
      overallRating: 4.4,
      foodRating: 4.5,
      serviceRating: 4.6,
      cabinRating: 4.3,
      entertainmentRating: 4.0,
      valueRating: 4.0,
      totalReviews: 3200,
      highlights: [
        'Voted Best Premium Cruise Line — Celebrity Cruises',
        'Exceptional dining quality — highest food ratings in the segment',
        'Solstice-class ship with real grass lawn on deck 15',
        '10 nights covers Malta, Greece and Turkey — most ports of any deal here',
        'Barcelona departure allows easy pre-cruise city break',
      ],
      concerns: [
        'Older ship — refurbed 2019 but not ultra-modern',
        'Barcelona departure requires positioning from Eastern Europe',
        'Premium price point',
      ],
      evidenceUrls: [
        'https://cruiseable.com/cruise-line/celebrity-cruises/celebrity-equinox/sailings/15479883',
        'https://www.taoticket.co.uk/co/celebrity-cruises/de/mediterranean/july',
        'https://www.tipsfortravellers.com/best-and-worst-cruise-lines-right-now-according-to-cruisers/',
        'https://cruisegalore.com/cruise-lines-ranked-2025/',
      ],
    },
    score: {
      total: 80,
      breakdown: {
        price: 15,       // premium price
        food: 20,        // best food rating
        itinerary: 19,   // 10 nights, Malta + Greece + Turkey
        shipModernity: 11,
        ratings: 10,     // highest overall rating
        balconyValue: 5,
      },
      rank: 3,
      recommendation: 'Best food and service quality. 10-night itinerary covering the most ports. Worth the premium for foodies and couples.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.celebritycruises.com/itinerary/10-night-greek-isles-turkey-from-barcelona-on-equinox-EQ10M377',
      'https://cruiseable.com/cruise-line/celebrity-cruises/celebrity-equinox/sailings/15479883',
      'https://www.cruisekings.co.uk/cruise-lines/celebrity-cruises/celebrity-equinox/',
      'https://www.taoticket.co.uk/co/celebrity-cruises/de/mediterranean/july',
    ],
    status: 'price_drop',
  },

  // ─────────────────────────────────────────────
  // 4. Norwegian Cruise Line — Norwegian Pearl
  // ─────────────────────────────────────────────
  {
    id: 'ncl-pearl-jul26-2026',
    shipName: 'Norwegian Pearl',
    cruiseLine: 'Norwegian Cruise Line',
    imageUrl: 'https://www.ncl.com/sites/default/files/ship-hero/norwegian-pearl-ship-exterior.jpg',
    departureDate: '2026-07-26',
    returnDate: '2026-08-02',
    nights: 7,
    departurePort: 'Ravenna (Venice), Italy',
    itinerary: [
      { port: 'Ravenna (Venice)', country: 'Italy' },
      { port: 'Corfu', country: 'Greece', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Kotor', country: 'Montenegro', arrivalTime: '08:00', departureTime: '17:00' },
      { port: 'Athens (Piraeus)', country: 'Greece' },
    ],
    pricing: {
      balconyPerPerson: 1680,
      insidePerPerson: 1350,
      currency: 'USD',
      originalPrice: 1820,
      bookingUrl: 'https://www.ncl.com/vacations?ships=Norwegian_Pearl&destinations=Greek_Isles_Cruises',
    },
    ship: {
      yearBuilt: 2006,
      yearRefurbished: 2018,
      tonnage: 93530,
      passengerCapacity: 2394,
      crewCount: 1084,
      rating: 4.0,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Aqua dining room — open seating, no fixed times',
        'Garden Café buffet — extensive hot and cold stations',
        'Great Outdoors — alfresco dining, burger bar, pizza',
      ],
      specialtyRestaurants: ['Cagney\'s Steakhouse', 'Teppanyaki', 'Le Bistro (French)', 'La Cucina (Italian)'],
      menuStyle: 'Freestyle — any restaurant, any time, no dress code',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free'],
      foodScore: 7,
      comparisonNotes: 'Freestyle dining is the differentiator — no set meal times suits independent travellers. Quality is comparable to Royal Caribbean but specialty restaurants book up fast.',
    },
    reviews: {
      overallRating: 4.0,
      foodRating: 3.9,
      serviceRating: 4.1,
      cabinRating: 3.9,
      entertainmentRating: 4.2,
      valueRating: 4.1,
      totalReviews: 2100,
      highlights: [
        'Zero sea days — every day is a port day',
        'Freestyle dining — no fixed dinner times or dress codes',
        'Rock climbing wall, bowling alley, 7 jacuzzis, 3 pools',
        'Venice (Ravenna) departure — iconic start to the cruise',
        'Strong value for balcony cabins vs Celebrity/Royal',
      ],
      concerns: [
        'Older ship built 2006',
        'One-way Venice to Athens requires booking return flights from Athens',
        'Freestyle approach means specialty restaurants book up fast',
      ],
      evidenceUrls: [
        'https://www.planetcruise.com/en/norwegian-cruise-line-cruises/norwegian-pearl/26-july-2026/377166',
        'https://cruisesheet.com/norwegian-pearl-7-night-venice-to-athens-july-12-2026',
        'https://www.ncl.com/ca/en/travel-blog/norwegian-european-2026-itineraries',
      ],
    },
    score: {
      total: 75,
      breakdown: {
        price: 20,       // best value balcony price
        food: 15,
        itinerary: 18,   // great ports, Venice departure
        shipModernity: 10,
        ratings: 7,
        balconyValue: 5,
      },
      rank: 4,
      recommendation: 'Best value pick — lowest balcony price with zero sea days. Freestyle dining suits independent travellers.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.planetcruise.com/en/norwegian-cruise-line-cruises/norwegian-pearl/26-july-2026/377166',
      'https://cruisesheet.com/norwegian-pearl-7-night-venice-to-athens-july-12-2026',
      'https://www.ncl.com/travel-blog/2026-greek-isles-cruises',
      'https://www.globaljourneys.com/ncl/greece',
    ],
    status: 'available',
  },

  // ─────────────────────────────────────────────
  // 5. MSC Cruises — MSC Armonia
  // ─────────────────────────────────────────────
  {
    id: 'msc-armonia-jul12-2026',
    shipName: 'MSC Armonia',
    cruiseLine: 'MSC Cruises',
    imageUrl: 'https://www.msccruises.com/content/dam/msc/ships/msc-armonia/msc-armonia-exterior.jpg',
    departureDate: '2026-07-12',
    returnDate: '2026-07-19',
    nights: 7,
    departurePort: 'Athens (Piraeus), Greece',
    itinerary: [
      { port: 'Athens (Piraeus)', country: 'Greece' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '08:00', departureTime: '20:00' },
      { port: 'Rhodes', country: 'Greece', arrivalTime: '07:00', departureTime: '18:00' },
      { port: 'Heraklion (Crete)', country: 'Greece', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Athens (Piraeus)', country: 'Greece' },
    ],
    pricing: {
      balconyPerPerson: 1190,
      insidePerPerson: 699,
      currency: 'USD',
      bookingUrl: 'https://www.msccruises.com/int/our-cruises/destinations/mediterranean/greece-greek-islands',
    },
    ship: {
      yearBuilt: 2003,
      yearRefurbished: 2014,
      tonnage: 65542,
      passengerCapacity: 2087,
      crewCount: 760,
      rating: 3.7,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Il Covo and La Bussola MDRs — European-style fixed menu',
        'Cafeteria Lido — buffet breakfast and lunch',
        'Gelateria — complimentary gelato',
      ],
      specialtyRestaurants: ['L\'Olivo (Mediterranean fine dining)', 'Sushi Bar'],
      menuStyle: 'European set menu + buffet',
      dietaryOptions: ['Vegetarian', 'Gluten-free', 'Dairy-free'],
      foodScore: 6,
      comparisonNotes: 'Adequate but the weakest food offering in this comparison. Works well for budget-conscious travellers who spend most time ashore. Limited specialty dining vs RCI or Celebrity.',
    },
    reviews: {
      overallRating: 3.7,
      foodRating: 3.6,
      serviceRating: 3.8,
      cabinRating: 3.7,
      entertainmentRating: 3.9,
      valueRating: 4.2,
      totalReviews: 1890,
      highlights: [
        'Cheapest balcony price in the Eastern Mediterranean this season',
        'Pure Greece itinerary — 4 Greek islands roundtrip Athens',
        'Mediterranean atmosphere — predominantly European passengers',
        'MSC rated 80-90% of Celebrity/Princess quality at a fraction of the cost',
      ],
      concerns: [
        'Older, smaller ship — limited onboard amenities vs competitors',
        'Balcony is only ~5 m² (53 sq ft) — very small',
        'Food and service rated lower than Celebrity or Royal Caribbean',
        'Crowded during school holidays',
      ],
      evidenceUrls: [
        'https://www.cruisecritic.com/msc-mediterranean-cruises_cl80-de149/mra',
        'https://www.cruisecritic.com/find-a-cruise/itinerary/7-night-msc-armonia-to-eastern-mediterranean-on-july-12-2026?section=itinerary&vendorId=44',
        'https://www.taoticket.com/en_US/co/msc-cruises/na/msc-armonia',
        'https://cruiseweb.com/cruise-lines/msc-cruises/ship-msc-armonia/7-night-mediterranean-eastern-cruise-departs-piraeus-(athens)-greece',
      ],
    },
    score: {
      total: 68,
      breakdown: {
        price: 24,       // excellent price
        food: 13,
        itinerary: 16,   // all-Greece, roundtrip Athens
        shipModernity: 8,
        ratings: 5,
        balconyValue: 2, // balcony very small
      },
      rank: 5,
      recommendation: 'Budget pick — best price by far but older ship and small balconies. Good if the itinerary matters more than the ship.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.cruisecritic.com/find-a-cruise/itinerary/7-night-msc-armonia-to-eastern-mediterranean-on-july-12-2026?section=itinerary&vendorId=44',
      'https://www.msccruisesusa.com/cruise/ships/msc-armonia',
      'https://www.taoticket.com/en_US/co/msc-cruises/na/msc-armonia',
      'https://www.cruisemapper.com/ships/MSC-Armonia-607',
    ],
    status: 'available',
  },

  // ─────────────────────────────────────────────
  // 6. Costa Cruises — Costa Fortuna
  // ─────────────────────────────────────────────
  {
    id: 'costa-fortuna-aug16-2026',
    shipName: 'Costa Fortuna',
    cruiseLine: 'Costa Cruises',
    imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/costa-fortuna/costa-fortuna-exterior.jpg',
    departureDate: '2026-08-16',
    returnDate: '2026-08-23',
    nights: 7,
    departurePort: 'Istanbul, Turkey',
    itinerary: [
      { port: 'Istanbul', country: 'Turkey', isOvernight: true },
      { port: 'Izmir', country: 'Turkey', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Volos', country: 'Greece', arrivalTime: '08:00', departureTime: '17:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '08:00', departureTime: '20:00' },
      { port: 'Athens (Piraeus)', country: 'Greece', arrivalTime: '07:00', departureTime: '23:00' },
      { port: 'Istanbul', country: 'Turkey' },
    ],
    pricing: {
      balconyPerPerson: 1850,
      insidePerPerson: 1551,
      suitePerPerson: 2800,
      currency: 'USD',
      bookingUrl: 'https://www.allcruisesfromturkey.com/en/tour/7-nights-greek-islands-with-costa-fortuna-from-istanbul',
    },
    ship: {
      yearBuilt: 2003,
      yearRefurbished: 2017,
      tonnage: 102587,
      passengerCapacity: 2720,
      crewCount: 1027,
      rating: 3.8,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Michelangelo and Raffaello MDRs — authentic Italian multi-course dinners',
        'Buffet Bolero — themed lunch stations daily',
        'Pizzeria on deck — Neapolitan-style, complimentary',
      ],
      specialtyRestaurants: ['Club Fortuna (premium à la carte)', 'Samsara Restaurant (wellness menu)'],
      menuStyle: 'Italian-focused set menu + buffet',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free'],
      foodScore: 7,
      comparisonNotes: 'Italian-style dining is the highlight — authentic pasta and pizza beats Royal Caribbean on those specific dishes. Overall breadth is lower than Celebrity but better than MSC.',
    },
    reviews: {
      overallRating: 3.8,
      foodRating: 3.9,
      serviceRating: 3.8,
      cabinRating: 3.7,
      entertainmentRating: 3.9,
      valueRating: 4.0,
      totalReviews: 1560,
      highlights: [
        'Istanbul departure — fly directly from Kyiv/Warsaw to IST with no positioning',
        'Includes Izmir (near Ephesus) and Volos — off-the-beaten-path ports',
        'Italian ship atmosphere — excellent pasta and pizza onboard',
        'Strong value for a balcony cabin departing from Turkey',
        'Weekly Friday departures confirmed for full summer 2026 season',
      ],
      concerns: [
        'Costa has restructured its booking system — Basic tier has no cabin selection',
        'Older ship, less modern amenities',
        'Need to pay €20/person Santorini & Mykonos port fees separately in peak season',
      ],
      evidenceUrls: [
        'https://www.cruisetimetables.com/cruisesoncostafortuna-jun2026.html',
        'https://www.ntxtravelpeople.com/CruiseSearch/view/7-nights-costa-cruises-fortuna-8-16-26/1',
        'https://www.cruisemapper.com/cruise-lines/Costa-Cruises-4',
        'https://www.allcruisesfromturkey.com/en/tour/7-nights-greek-islands-with-costa-fortuna-from-istanbul',
      ],
    },
    score: {
      total: 72,
      breakdown: {
        price: 19,
        food: 15,
        itinerary: 17,   // Istanbul start + Greece islands
        shipModernity: 9,
        ratings: 7,
        balconyValue: 5,
      },
      rank: 6,
      recommendation: 'Ideal if flying into Istanbul — unique itinerary with Volos and Izmir alongside classic islands. Italian dining flair onboard.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.ntxtravelpeople.com/CruiseSearch/view/7-nights-costa-cruises-fortuna-8-16-26/1',
      'https://www.allcruisesfromturkey.com/en/tour/7-nights-greek-islands-with-costa-fortuna-from-istanbul',
      'https://www.cruisetimetables.com/cruisesoncostafortuna-jun2026.html',
      'https://mbonesteel.dreamvacations.com/sc.do?i=959572&c=14&v=433',
      'https://www.cruisemapper.com/cruise-lines/Costa-Cruises-4',
    ],
    status: 'available',
  },

  // ─────────────────────────────────────────────
  // 7. Costa Cruises — Costa Deliziosa
  // ─────────────────────────────────────────────
  {
    id: 'costa-deliziosa-jul18-2026',
    shipName: 'Costa Deliziosa',
    cruiseLine: 'Costa Cruises',
    imageUrl: 'https://www.costacruises.com/content/dam/costa/ships/costa-deliziosa/costa-deliziosa-exterior.jpg',
    departureDate: '2026-07-18',
    returnDate: '2026-08-01',
    nights: 14,
    departurePort: 'Marghera (Venice), Italy',
    itinerary: [
      { port: 'Marghera (Venice)', country: 'Italy' },
      { port: 'Bari', country: 'Italy', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Santorini', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Mykonos', country: 'Greece', arrivalTime: '07:00', departureTime: '20:00' },
      { port: 'Athens (Piraeus)', country: 'Greece', arrivalTime: '07:00', departureTime: '19:00' },
      { port: 'Heraklion (Crete)', country: 'Greece', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Katakolon (Olympia)', country: 'Greece', arrivalTime: '08:00', departureTime: '17:00' },
      { port: 'Dubrovnik', country: 'Croatia', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Split', country: 'Croatia', arrivalTime: '08:00', departureTime: '18:00' },
      { port: 'Marghera (Venice)', country: 'Italy' },
    ],
    pricing: {
      balconyPerPerson: 2490,
      insidePerPerson: 1680,
      suitePerPerson: 4800,
      currency: 'USD',
      bookingUrl: 'https://www.iglucruise.com/costa-deliziosa/18th-july-2026_c396266',
    },
    ship: {
      yearBuilt: 2010,
      tonnage: 92720,
      passengerCapacity: 2260,
      crewCount: 924,
      rating: 4.0,
    },
    foodDetails: {
      mainDiningHighlights: [
        'Club Deliziosa MDR — formal Italian dining, rotating menus',
        'Lido Buffet — extensive breakfast spread with regional specialties',
        'Gelateria and patisserie — complimentary throughout the day',
      ],
      specialtyRestaurants: ['Ristorante Club (premium fine dining)', 'Samsara Restaurant (spa cuisine)'],
      menuStyle: 'Italian fine dining MDR + buffet',
      dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free'],
      foodScore: 7,
      comparisonNotes: 'Similar Italian-focused dining to Costa Fortuna with slightly more refined presentation on this newer ship. Better than MSC but below Celebrity for variety and quality.',
    },
    reviews: {
      overallRating: 4.0,
      foodRating: 4.1,
      serviceRating: 3.9,
      cabinRating: 4.1,
      entertainmentRating: 3.8,
      valueRating: 3.9,
      totalReviews: 890,
      highlights: [
        '662 cabins with balcony — best balcony availability of any Costa ship',
        '14 nights — Greece, Croatia and Italy all in one cruise',
        'Venice roundtrip — no one-way logistics',
        'Katakolon stop lets you visit ancient Olympia by coach',
        'Italian marble interiors — beautiful public spaces',
      ],
      concerns: [
        'Long 14-night commitment',
        'Higher total price (though price-per-night is reasonable)',
        'Cruise Critic shows 14-night Eastern Mediterranean sold on this date — verify cabin availability early',
      ],
      evidenceUrls: [
        'https://www.iglucruise.com/costa-deliziosa/18th-july-2026_c396266',
        'https://www.cruisecritic.com/find-a-cruise/itinerary/14-night-costa-deliziosa-to-eastern-mediterranean-on-july-18-2026?vendorId=71',
        'https://www.taoticket.com/en_US/co/costa-cruises/na/costa-deliziosa',
      ],
    },
    score: {
      total: 74,
      breakdown: {
        price: 17,
        food: 16,
        itinerary: 20,   // most comprehensive — Greece + Croatia + Italy
        shipModernity: 12,
        ratings: 7,
        balconyValue: 2, // pricier per night
      },
      rank: 7,
      recommendation: 'Best for travellers who want Greece + Croatia combined. Most port stops of any deal. Roundtrip Venice is logistically simple.',
    },
    lastUpdated: '2026-04-08T00:00:00Z',
    sourceUrls: [
      'https://www.iglucruise.com/costa-deliziosa/18th-july-2026_c396266',
      'https://www.cruisecritic.com/find-a-cruise/itinerary/14-night-costa-deliziosa-to-eastern-mediterranean-on-july-18-2026?vendorId=71',
      'https://www.taoticket.com/en_US/co/costa-cruises/na/costa-deliziosa',
    ],
    status: 'available',
  },
];

export default cruiseDeals;
