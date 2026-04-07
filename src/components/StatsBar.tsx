import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsBarProps {
  totalDeals: number;
  averageScore: number;
  priceRange: { min: number; max: number };
  bestDeal: string | null;
  lastFetched: string;
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function useCountdown(lastFetched: string, intervalMinutes = 60): string {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    function compute() {
      const fetched = new Date(lastFetched).getTime();
      const nextUpdate = fetched + intervalMinutes * 60 * 1000;
      const remaining = nextUpdate - Date.now();

      if (remaining <= 0) {
        setCountdown("Now");
        return;
      }

      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setCountdown(`${mins}m ${secs}s`);
    }

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [lastFetched, intervalMinutes]);

  return countdown;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="flex-1 min-w-0">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="text-muted-foreground shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">{label}</p>
          <p className="text-sm font-semibold whitespace-nowrap">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsBar({
  totalDeals,
  averageScore,
  priceRange,
  bestDeal,
  lastFetched,
}: StatsBarProps) {
  const nextUpdate = useCountdown(lastFetched);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard
        icon={<BarChart3 className="h-4 w-4" />}
        label="Total Deals"
        value={totalDeals.toString()}
      />
      <StatCard
        icon={<TrendingUp className="h-4 w-4" />}
        label="Average Score"
        value={`${averageScore.toFixed(1)} / 100`}
      />
      <StatCard
        icon={<DollarSign className="h-4 w-4" />}
        label="Price Range"
        value={`${formatPrice(priceRange.min)} – ${formatPrice(priceRange.max)}`}
      />
      <StatCard
        icon={<Trophy className="h-4 w-4" />}
        label="Best Deal"
        value={bestDeal ?? "—"}
      />
      <StatCard
        icon={<Clock className="h-4 w-4" />}
        label="Next Update"
        value={nextUpdate}
      />
    </div>
  );
}
