import { useState } from 'react';
import {
  Ship,
  Calendar,
  Users,
  Star,
  ExternalLink,
  MapPin,
  DollarSign,
  Clock,
  Anchor,
  ChevronDown,
  ChevronUp,
  TrendingDown,
  UtensilsCrossed,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { CruiseDeal } from '@/types/cruise';
import { RouteMap } from '@/components/RouteMap';
import {
  formatPrice,
  formatDateRange,
  getScoreColor,
  getScoreLabel,
  getStatusBadgeVariant,
  getStatusLabel,
  getDaysUntil,
} from '@/lib/formatters';

const FLIGHTS_PER_PERSON = 140;
const BUDGET_LIMIT = 4000;

interface DealCardProps {
  deal: CruiseDeal;
}

function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-muted-foreground w-20 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted-foreground/30 fill-muted-foreground/10'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium w-6 text-right">{value}</span>
    </div>
  );
}

export function DealCard({ deal }: DealCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const allImages = deal.images?.length ? deal.images : deal.imageUrl ? [deal.imageUrl] : [];

  const daysUntil = getDaysUntil(deal.departureDate);
  const totalForTwo =
    deal.pricing.balconyPerPerson * 2 + FLIGHTS_PER_PERSON * 2;
  const withinBudget = totalForTwo <= BUDGET_LIMIT;
  const hasDiscount =
    deal.pricing.originalPrice !== undefined &&
    deal.pricing.originalPrice > deal.pricing.balconyPerPerson;
  const discountPct = hasDiscount
    ? Math.round(
        ((deal.pricing.originalPrice! - deal.pricing.balconyPerPerson) /
          deal.pricing.originalPrice!) *
          100
      )
    : 0;

  const shipAgeLabel = deal.ship.yearRefurbished
    ? `Built ${deal.ship.yearBuilt}, refurb ${deal.ship.yearRefurbished}`
    : `Built ${deal.ship.yearBuilt}`;

  return (
    <TooltipProvider>
      <Card className="group relative overflow-hidden border border-border/60 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 bg-card">
        {/* Top accent line colored by score */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 ${
            deal.score.total >= 85
              ? 'bg-emerald-500'
              : deal.score.total >= 70
              ? 'bg-green-500'
              : deal.score.total >= 55
              ? 'bg-yellow-400'
              : 'bg-orange-500'
          }`}
        />

        <CardHeader className="pb-3 pt-5 px-5">
          {/* Header row: rank + names + status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Rank badge */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full font-bold text-sm shrink-0 shadow-sm ${
                      deal.score.rank === 1
                        ? 'bg-amber-400 text-amber-900'
                        : deal.score.rank === 2
                        ? 'bg-slate-300 text-slate-700'
                        : deal.score.rank === 3
                        ? 'bg-orange-300 text-orange-800'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    #{deal.score.rank}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overall rank based on deal score</p>
                </TooltipContent>
              </Tooltip>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-foreground leading-tight truncate">
                    {deal.shipName}
                  </h2>
                  <Badge variant={getStatusBadgeVariant(deal.status)} className="shrink-0 text-[10px]">
                    {deal.status === 'price_drop' && (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {getStatusLabel(deal.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium mt-0.5">
                  {deal.cruiseLine}
                </p>
              </div>
            </div>

            {/* Score pill */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowScoreBreakdown((v) => !v)}
                  className="shrink-0 flex flex-col items-center px-3 py-1.5 rounded-xl border border-border/60 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span
                    className={`text-xl font-extrabold leading-none ${getScoreColor(deal.score.total)}`}
                  >
                    {deal.score.total}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                    {getScoreLabel(deal.score.total)}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see score breakdown</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-5 space-y-4">
          {/* Score breakdown (collapsible) */}
          {showScoreBreakdown && (
            <div className="rounded-lg bg-muted/40 p-3 space-y-2 border border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Score Breakdown
              </p>
              <ScoreBar label="Price" value={deal.score.breakdown.price} max={25} />
              <ScoreBar label="Food" value={deal.score.breakdown.food} max={20} />
              <ScoreBar label="Itinerary" value={deal.score.breakdown.itinerary} max={20} />
              <ScoreBar label="Ship age" value={deal.score.breakdown.shipModernity} max={15} />
              <ScoreBar label="Ratings" value={deal.score.breakdown.ratings} max={10} />
              <ScoreBar label="Balcony value" value={deal.score.breakdown.balconyValue} max={10} />
              <Separator className="my-1" />
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                {deal.score.recommendation}
              </p>
            </div>
          )}

          {/* Itinerary row */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex flex-wrap items-center gap-1 min-w-0">
              {deal.itinerary.map((stop, i) => (
                <span key={`${stop.port}-${i}`} className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-default text-foreground">
                        {stop.port}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stop.port}, {stop.country}</p>
                    </TooltipContent>
                  </Tooltip>
                  {i < deal.itinerary.length - 1 && (
                    <span className="text-muted-foreground/50 text-xs">→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Ship images + Route map side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allImages.length > 0 && (
              <div className="relative">
                <img
                  src={allImages[activeImg]}
                  alt={`${deal.shipName} - photo ${activeImg + 1}`}
                  className="w-full h-52 object-cover rounded-lg"
                />
                {allImages.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === activeImg
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <RouteMap itinerary={deal.itinerary} />
          </div>

          <Separator />

          {/* Key details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-medium">Dates</span>
              </div>
              <p className="text-xs font-semibold text-foreground">
                {formatDateRange(deal.departureDate, deal.returnDate)}
              </p>
              <p className="text-[11px] text-muted-foreground">{deal.nights} nights</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Ship className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-medium">Ship</span>
              </div>
              <p className="text-xs font-semibold text-foreground">
                {(deal.ship.tonnage / 1000).toFixed(0)}k GT
              </p>
              <p className="text-[11px] text-muted-foreground">{shipAgeLabel}</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-medium">Capacity</span>
              </div>
              <p className="text-xs font-semibold text-foreground">
                {deal.ship.passengerCapacity.toLocaleString()}
              </p>
              <p className="text-[11px] text-muted-foreground">passengers</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-medium">Departing</span>
              </div>
              <p
                className={`text-xs font-semibold ${
                  daysUntil <= 30
                    ? 'text-orange-600'
                    : daysUntil <= 90
                    ? 'text-amber-600'
                    : 'text-foreground'
                }`}
              >
                {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
              </p>
              <p className="text-[11px] text-muted-foreground">
                from {deal.departurePort}
              </p>
            </div>
          </div>

          <Separator />

          {/* Pricing section */}
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-foreground tracking-tight">
                  {formatPrice(deal.pricing.balconyPerPerson, deal.pricing.currency)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(deal.pricing.originalPrice!, deal.pricing.currency)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">per person · balcony</span>
                {hasDiscount && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    -{discountPct}% off
                  </Badge>
                )}
              </div>
              {deal.pricing.insidePerPerson && (
                <p className="text-xs text-muted-foreground mt-1">
                  Inside cabin: {formatPrice(deal.pricing.insidePerPerson, deal.pricing.currency)}/pp
                </p>
              )}
            </div>

            {/* Budget indicator */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`flex flex-col items-end px-3 py-2 rounded-lg border ${
                    withinBudget
                      ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                      : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <DollarSign
                      className={`h-3.5 w-3.5 ${withinBudget ? 'text-emerald-600' : 'text-red-600'}`}
                    />
                    <span
                      className={`text-sm font-bold ${withinBudget ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}
                    >
                      {formatPrice(totalForTwo, deal.pricing.currency)}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">total for 2 + flights</span>
                  {withinBudget ? (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Within budget ✓
                    </span>
                  ) : (
                    <span className="text-[10px] text-red-600 dark:text-red-400 font-medium">
                      Over {formatPrice(BUDGET_LIMIT)} budget
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs space-y-1">
                  <p>Cruise: {formatPrice(deal.pricing.balconyPerPerson * 2, deal.pricing.currency)} (2 people)</p>
                  <p>Flights: {formatPrice(FLIGHTS_PER_PERSON * 2, deal.pricing.currency)} (~$140/pp assumed)</p>
                  <p className="font-semibold pt-1 border-t border-border/40">
                    Total: {formatPrice(totalForTwo, deal.pricing.currency)}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Description + Pros/Cons */}
          {(deal.description || deal.pros || deal.cons) && (
            <>
              <Separator />
              <div className="space-y-3">
                {deal.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {deal.description}
                  </p>
                )}
                {(deal.pros || deal.cons) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deal.cons && deal.cons.length > 0 && (
                      <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-red-500 font-semibold mb-1.5">Minuses</p>
                        <ul className="space-y-1">
                          {deal.cons.map((c, i) => (
                            <li key={i} className="text-xs text-foreground flex gap-1.5">
                              <span className="text-red-400 shrink-0">−</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {deal.pros && deal.pros.length > 0 && (
                      <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-semibold mb-1.5">Pluses</p>
                        <ul className="space-y-1">
                          {deal.pros.map((p, i) => (
                            <li key={i} className="text-xs text-foreground flex gap-1.5">
                              <span className="text-emerald-400 shrink-0">+</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Reviews mini-summary */}
          <div>
            <button
              onClick={() => setShowReviews((v) => !v)}
              className="w-full flex items-center justify-between group/reviews"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-foreground">
                  {deal.reviews.overallRating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({deal.reviews.totalReviews.toLocaleString()} reviews)
                </span>
                {deal.reviews.highlights[0] && (
                  <>
                    <span className="text-muted-foreground/30 text-xs">·</span>
                    <span className="text-xs text-muted-foreground italic truncate max-w-40">
                      "{deal.reviews.highlights[0]}"
                    </span>
                  </>
                )}
              </div>
              {showReviews ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground group-hover/reviews:text-foreground transition-colors" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover/reviews:text-foreground transition-colors" />
              )}
            </button>

            {showReviews && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <StarRating rating={deal.reviews.foodRating} label="Food" />
                  <StarRating rating={deal.reviews.serviceRating} label="Service" />
                  <StarRating rating={deal.reviews.cabinRating} label="Cabin" />
                  <StarRating rating={deal.reviews.entertainmentRating} label="Entertainment" />
                  <StarRating rating={deal.reviews.valueRating} label="Value" />
                </div>

                <div className="space-y-2">
                  {deal.reviews.concerns.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-red-500 font-semibold mb-1">
                        Watch Out For
                      </p>
                      <ul className="space-y-0.5">
                        {deal.reviews.concerns.map((c, i) => (
                          <li key={i} className="text-xs text-foreground flex gap-1.5">
                            <span className="text-red-400 shrink-0">!</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deal.reviews.highlights.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mb-1">
                        Highlights
                      </p>
                      <ul className="space-y-0.5">
                        {deal.reviews.highlights.slice(0, 3).map((h, i) => (
                          <li key={i} className="text-xs text-foreground flex gap-1.5">
                            <span className="text-emerald-500 shrink-0">+</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {deal.reviews.evidenceUrls.length > 0 && (
                    <div className="pt-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                        Sources
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {deal.reviews.evidenceUrls.slice(0, 3).map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
                          >
                            Source {i + 1}
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {deal.foodDetails && (
            <>
              <div>
                <button
                  onClick={() => setShowFood((v) => !v)}
                  className="w-full flex items-center justify-between group/food"
                >
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      Food {deal.foodDetails.foodScore}/10
                    </span>
                    <span className="text-xs text-muted-foreground italic truncate max-w-48">
                      {deal.foodDetails.menuStyle}
                    </span>
                  </div>
                  {showFood ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground group-hover/food:text-foreground transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-hover/food:text-foreground transition-colors" />
                  )}
                </button>

                {showFood && (
                  <div className="mt-3 space-y-3">
                    {deal.foodDetails.mainDiningHighlights.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mb-1">
                          Main Dining
                        </p>
                        <ul className="space-y-0.5">
                          {deal.foodDetails.mainDiningHighlights.map((h, i) => (
                            <li key={i} className="text-xs text-foreground flex gap-1.5">
                              <span className="text-emerald-500 shrink-0">•</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {deal.foodDetails.specialtyRestaurants.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Specialty Restaurants
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {deal.foodDetails.specialtyRestaurants.map((r, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px] px-2 py-0.5">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {deal.foodDetails.dietaryOptions.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Dietary Options
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {deal.foodDetails.dietaryOptions.map((d, i) => (
                            <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {deal.foodDetails.comparisonNotes && (
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        {deal.foodDetails.comparisonNotes}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <Separator />
            </>
          )}

          {/* Recommendation + action row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-start gap-2 min-w-0 flex-1">
              <Anchor className={`h-4 w-4 mt-0.5 shrink-0 ${getScoreColor(deal.score.total)}`} />
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {deal.score.recommendation}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {deal.sourceUrls.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={deal.sourceUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="text-xs gap-1.5">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Sources
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View data sources</p>
                  </TooltipContent>
                </Tooltip>
              )}

              <a
                href={deal.pricing.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="text-xs gap-1.5 bg-primary hover:bg-primary/90 shadow-sm"
                  disabled={deal.status === 'sold_out'}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {deal.status === 'sold_out' ? 'Sold Out' : 'View Deal'}
                </Button>
              </a>
            </div>
          </div>

          {/* Last updated footer */}
          <p className="text-[10px] text-muted-foreground/60 text-right">
            Updated {new Date(deal.lastUpdated).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
