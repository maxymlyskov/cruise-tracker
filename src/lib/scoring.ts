import type { CruiseDeal, TripBudget } from '../types/cruise';

const BUDGET_PER_PERSON = 2000;
const BUDGET_TOTAL = BUDGET_PER_PERSON * 2;

// --- Price score (0–25) ---
// $800 or less = 25 pts, linear decline to 0 at $2000+
function scorePriceCategory(balconyPerPerson: number): number {
  const MIN_PRICE = 800;
  const MAX_PRICE = 2000;

  if (balconyPerPerson <= MIN_PRICE) return 25;
  if (balconyPerPerson >= MAX_PRICE) return 0;

  const ratio = (balconyPerPerson - MIN_PRICE) / (MAX_PRICE - MIN_PRICE);
  return Math.round((1 - ratio) * 25);
}

// --- Food score (0–20) ---
// food rating 1–5 scaled to 0–20
function scoreFoodCategory(foodRating: number): number {
  const clamped = Math.min(5, Math.max(1, foodRating));
  return Math.round(((clamped - 1) / 4) * 20);
}

// --- Itinerary score (0–20) ---
// +5 for Istanbul, +5 for Greek islands, +5 for Italy, +5 for multiple unique countries
function scoreItineraryCategory(deal: CruiseDeal): number {
  const ports = deal.itinerary.map((s) => ({
    port: s.port.toLowerCase(),
    country: s.country.toLowerCase(),
  }));

  const countries = new Set(ports.map((s) => s.country));

  const hasIstanbul = ports.some((s) => s.port.includes('istanbul'));
  const hasGreekIslands = ports.some(
    (s) =>
      s.country === 'greece' ||
      s.port.includes('santorini') ||
      s.port.includes('mykonos') ||
      s.port.includes('rhodes') ||
      s.port.includes('corfu') ||
      s.port.includes('crete') ||
      s.port.includes('piraeus')
  );
  const hasItaly = ports.some(
    (s) =>
      s.country === 'italy' ||
      s.port.includes('rome') ||
      s.port.includes('civitavecchia') ||
      s.port.includes('venice') ||
      s.port.includes('naples') ||
      s.port.includes('genoa')
  );
  const hasMultipleCountries = countries.size >= 3;

  let score = 0;
  if (hasIstanbul) score += 5;
  if (hasGreekIslands) score += 5;
  if (hasItaly) score += 5;
  if (hasMultipleCountries) score += 5;

  return score;
}

// --- Ship modernity score (0–15) ---
// Uses the most recent of yearBuilt or yearRefurbished
function scoreShipModernityCategory(deal: CruiseDeal): number {
  const year = Math.max(
    deal.ship.yearBuilt,
    deal.ship.yearRefurbished ?? 0
  );

  if (year >= 2020) return 15;
  if (year >= 2015) return 10;
  if (year >= 2010) return 7;
  return 3;
}

// --- Overall ratings score (0–10) ---
function scoreRatingsCategory(overallRating: number): number {
  const clamped = Math.min(5, Math.max(0, overallRating));
  return Math.round((clamped / 5) * 10);
}

// --- Balcony value score (0–10) ---
// Price per night for balcony. Under $100/night = 10, linear decline to 0 at $200+/night
function scoreBalconyValueCategory(deal: CruiseDeal): number {
  const perNight = deal.pricing.balconyPerPerson / deal.nights;
  const MIN_RATE = 100;
  const MAX_RATE = 200;

  if (perNight <= MIN_RATE) return 10;
  if (perNight >= MAX_RATE) return 0;

  const ratio = (perNight - MIN_RATE) / (MAX_RATE - MIN_RATE);
  return Math.round((1 - ratio) * 10);
}

function buildRecommendation(total: number): string {
  if (total >= 85) return 'Outstanding deal — book immediately.';
  if (total >= 70) return 'Excellent value — highly recommended.';
  if (total >= 55) return 'Good deal — worth serious consideration.';
  if (total >= 40) return 'Decent option — compare with alternatives.';
  return 'Below average — look for better deals.';
}

export function calculateScore(
  deal: CruiseDeal
): CruiseDeal['score'] {
  const price = scorePriceCategory(deal.pricing.balconyPerPerson);
  const food = scoreFoodCategory(deal.reviews.foodRating);
  const itinerary = scoreItineraryCategory(deal);
  const shipModernity = scoreShipModernityCategory(deal);
  const ratings = scoreRatingsCategory(deal.reviews.overallRating);
  const balconyValue = scoreBalconyValueCategory(deal);

  const total = price + food + itinerary + shipModernity + ratings + balconyValue;

  return {
    total,
    breakdown: { price, food, itinerary, shipModernity, ratings, balconyValue },
    rank: 0, // caller is responsible for ranking across all deals
    recommendation: buildRecommendation(total),
  };
}

export function calculateBudget(
  cruisePricePerPerson: number,
  flightPricePerPerson: number
): TripBudget {
  const totalPerPerson = cruisePricePerPerson + flightPricePerPerson;
  const totalForTwo = totalPerPerson * 2;

  return {
    flightCostPerPerson: flightPricePerPerson,
    cruiseCostPerPerson: cruisePricePerPerson,
    totalPerPerson,
    totalForTwo,
    budgetRemaining: BUDGET_TOTAL - totalForTwo,
    withinBudget: totalForTwo <= BUDGET_TOTAL,
  };
}

export function rankDeals(deals: CruiseDeal[]): CruiseDeal[] {
  const scored = deals
    .map((deal) => ({ ...deal, score: calculateScore(deal) }))
    .sort((a, b) => b.score.total - a.score.total);

  return scored.map((deal, index) => ({
    ...deal,
    score: { ...deal.score, rank: index + 1 },
  }));
}
