import type { CruiseDeal } from '../types/cruise';

// --- Price ---

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// --- Dates ---

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth =
    sameYear && startDate.getMonth() === endDate.getMonth();

  const startFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(startDate);

  const endFormatted = new Intl.DateTimeFormat('en-US', {
    month: sameMonth ? undefined : 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(endDate);

  return `${startFormatted} – ${endFormatted}`;
}

export function getDaysUntil(isoDate: string): number {
  const target = new Date(isoDate);
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// --- Score display ---

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-green-600';
  if (score >= 55) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Great';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
}

// --- Status badge ---

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export function getStatusBadgeVariant(
  status: CruiseDeal['status']
): BadgeVariant {
  switch (status) {
    case 'new':
      return 'default';
    case 'price_drop':
      return 'secondary';
    case 'sold_out':
      return 'destructive';
    case 'available':
      return 'outline';
  }
}

export function getStatusLabel(status: CruiseDeal['status']): string {
  switch (status) {
    case 'new':
      return 'New';
    case 'price_drop':
      return 'Price Drop';
    case 'sold_out':
      return 'Sold Out';
    case 'available':
      return 'Available';
  }
}
