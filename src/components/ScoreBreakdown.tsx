import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { DealScore } from '@/types/cruise';
import { getScoreColor, getScoreLabel } from '@/lib/formatters';

interface ScoreBreakdownProps {
  score: DealScore;
}

interface ScoreRow {
  label: string;
  value: number;
  max: number;
}

export function ScoreBreakdown({ score }: ScoreBreakdownProps) {
  const { total, breakdown, recommendation } = score;

  const rows: ScoreRow[] = [
    { label: 'Price',         value: breakdown.price,         max: 25 },
    { label: 'Food',          value: breakdown.food,          max: 20 },
    { label: 'Itinerary',     value: breakdown.itinerary,     max: 20 },
    { label: 'Ship Modernity',value: breakdown.shipModernity, max: 15 },
    { label: 'Ratings',       value: breakdown.ratings,       max: 10 },
    { label: 'Balcony Value', value: breakdown.balconyValue,  max: 10 },
  ];

  const scoreColor = getScoreColor(total);
  const scoreLabel = getScoreLabel(total);

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-5">
      {/* Total score */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted shrink-0">
          <Star className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold leading-none ${scoreColor}`}>
              {total}
            </span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          <span className={`text-sm font-medium ${scoreColor}`}>
            {scoreLabel}
          </span>
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="space-y-3">
        {rows.map(({ label, value, max }) => {
          const pct = Math.round((value / max) * 100);
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground font-medium">{label}</span>
                <span className="text-muted-foreground tabular-nums">
                  {value}/{max}
                </span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      {recommendation && (
        <p className="text-sm text-muted-foreground border-t border-border pt-4 leading-relaxed">
          {recommendation}
        </p>
      )}
    </div>
  );
}
