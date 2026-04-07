import { useState, useEffect } from 'react';
import type { CruiseDeal } from '@/types/cruise';
import { rankDeals } from '@/lib/scoring';

interface DealsData {
  lastFetched: string;
  deals: CruiseDeal[];
  metadata: {
    totalDeals: number;
    averageScore: number;
    priceRange: { min: number; max: number };
    nextUpdate: string;
  };
}

export function useDeals() {
  const [deals, setDeals] = useState<CruiseDeal[]>([]);
  const [metadata, setMetadata] = useState<DealsData['metadata'] | null>(null);
  const [lastFetched, setLastFetched] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/deals.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load deals');
        return res.json();
      })
      .then((data: DealsData) => {
        const ranked = data.deals.length > 0 ? rankDeals(data.deals) : [];
        setDeals(ranked);
        setMetadata(data.metadata);
        setLastFetched(data.lastFetched);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { deals, metadata, lastFetched, loading, error };
}
