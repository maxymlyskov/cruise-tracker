import { useState, useMemo } from 'react';
import { useDeals } from '@/hooks/useDeals';
import { Header } from '@/components/Header';
import { StatsBar } from '@/components/StatsBar';
import { FilterBar } from '@/components/FilterBar';
import { DealCard } from '@/components/DealCard';
import { EmptyState } from '@/components/EmptyState';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { CruiseDeal } from '@/types/cruise';

function sortDeals(deals: CruiseDeal[], sortBy: string): CruiseDeal[] {
  const sorted = [...deals];
  switch (sortBy) {
    case 'score':
      return sorted.sort((a, b) => b.score.total - a.score.total);
    case 'price-asc':
      return sorted.sort(
        (a, b) => a.pricing.balconyPerPerson - b.pricing.balconyPerPerson
      );
    case 'price-desc':
      return sorted.sort(
        (a, b) => b.pricing.balconyPerPerson - a.pricing.balconyPerPerson
      );
    case 'departure':
      return sorted.sort(
        (a, b) =>
          new Date(a.departureDate).getTime() -
          new Date(b.departureDate).getTime()
      );
    case 'duration':
      return sorted.sort((a, b) => a.nights - b.nights);
    case 'rating':
      return sorted.sort(
        (a, b) => b.reviews.overallRating - a.reviews.overallRating
      );
    default:
      return sorted;
  }
}

function App() {
  const { deals, metadata, lastFetched, loading } = useDeals();
  const [sortBy, setSortBy] = useState('score');
  const [cruiseLineFilter, setCruiseLineFilter] = useState('all');

  const cruiseLines = useMemo(
    () => [...new Set(deals.map((d) => d.cruiseLine))].sort(),
    [deals]
  );

  const filteredDeals = useMemo(() => {
    let result = deals;
    if (cruiseLineFilter !== 'all') {
      result = result.filter((d) => d.cruiseLine === cruiseLineFilter);
    }
    return sortDeals(result, sortBy);
  }, [deals, sortBy, cruiseLineFilter]);

  if (loading) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Header lastFetched="" totalDeals={0} />
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header lastFetched={lastFetched} totalDeals={deals.length} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {deals.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <StatsBar
                totalDeals={deals.length}
                averageScore={Math.round(
                  deals.reduce((s, d) => s + d.score.total, 0) / deals.length
                )}
                priceRange={{
                  min: Math.min(
                    ...deals.map((d) => d.pricing.balconyPerPerson)
                  ),
                  max: Math.max(
                    ...deals.map((d) => d.pricing.balconyPerPerson)
                  ),
                }}
                bestDeal={deals[0]?.shipName ?? null}
                lastFetched={lastFetched}
              />

              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                cruiseLineFilter={cruiseLineFilter}
                onCruiseLineChange={setCruiseLineFilter}
                cruiseLines={cruiseLines}
              />

              <div className="space-y-4">
                {filteredDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>

              {filteredDeals.length === 0 && deals.length > 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No deals match the current filters.
                </div>
              )}
            </>
          )}
        </main>

        <footer className="border-t border-border py-6 mt-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
            Cruise Tracker — Auto-updated 3x daily by AI agents. Prices are
            estimates and may vary. Always verify on the cruise line's website.
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;
