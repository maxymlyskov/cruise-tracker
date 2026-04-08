export interface CruiseDeal {
  id: string;
  shipName: string;
  cruiseLine: string;
  imageUrl: string;
  images?: string[];
  departureDate: string; // ISO date
  returnDate: string;
  nights: number;
  departurePort: string;
  itinerary: PortStop[];
  pricing: Pricing;
  ship: ShipDetails;
  reviews: ReviewSummary;
  foodDetails: FoodDetails;
  score: DealScore;
  lastUpdated: string; // ISO datetime
  sourceUrls: string[];
  description?: string;
  pros?: string[];
  cons?: string[];
  flights?: FlightInfo;
  status: 'available' | 'sold_out' | 'price_drop' | 'new';
}

export interface FlightInfo {
  outbound: FlightLeg;
  returnFlight: FlightLeg;
  totalPerPerson: number;
  totalForTwo: number;
  searchUrl: string;
}

export interface FlightLeg {
  from: string;
  to: string;
  airlines: string[];
  flightNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
  date?: string;
  duration: string;
  pricePerPerson: number;
  directAvailable: boolean;
  frequency: string;
  notes?: string;
}

export interface FoodDetails {
  mainDiningHighlights: string[];
  specialtyRestaurants: string[];
  menuStyle: string; // e.g. "International buffet + à la carte"
  dietaryOptions: string[]; // e.g. ["Vegetarian", "Vegan", "Gluten-free", "Kosher"]
  foodScore: number; // 1-10
  comparisonNotes: string; // brief comparison to other lines
}

export interface PortStop {
  port: string;
  country: string;
  arrivalTime?: string;
  departureTime?: string;
  isOvernight?: boolean;
}

export interface Pricing {
  balconyPerPerson: number;
  insidePerPerson?: number;
  suitePerPerson?: number;
  currency: string;
  originalPrice?: number; // for showing discounts
  bookingUrl: string;
}

export interface ShipDetails {
  yearBuilt: number;
  yearRefurbished?: number;
  tonnage: number;
  passengerCapacity: number;
  crewCount?: number;
  rating: number; // 1-5
}

export interface ReviewSummary {
  overallRating: number; // 1-5
  foodRating: number;
  serviceRating: number;
  cabinRating: number;
  entertainmentRating: number;
  valueRating: number;
  totalReviews: number;
  highlights: string[];
  concerns: string[];
  evidenceUrls: string[];
}

export interface DealScore {
  total: number; // 0-100
  breakdown: {
    price: number; // 0-25
    food: number; // 0-20
    itinerary: number; // 0-20
    shipModernity: number; // 0-15
    ratings: number; // 0-10
    balconyValue: number; // 0-10
  };
  rank: number;
  recommendation: string;
}

export interface TripBudget {
  flightCostPerPerson: number;
  cruiseCostPerPerson: number;
  totalPerPerson: number;
  totalForTwo: number;
  budgetRemaining: number;
  withinBudget: boolean;
}
