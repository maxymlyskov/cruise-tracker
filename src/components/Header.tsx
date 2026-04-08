import { Ship } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/formatters';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  lastFetched: string;
  totalDeals: number;
}

export function Header({ lastFetched, totalDeals }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: title + subtitle */}
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
              <Ship className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground leading-none">
                Cruise Tracker
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Eastern Mediterranean · Jul–Aug 2026 · $2,000/person budget
              </p>
            </div>
          </div>

          {/* Right: theme toggle + deals badge + last updated */}
          <div className="flex items-center gap-3 sm:shrink-0">
            <ThemeToggle />
            <Badge variant="secondary" className="text-sm px-2.5 py-1">
              {totalDeals} {totalDeals === 1 ? 'deal' : 'deals'}
            </Badge>
            {lastFetched && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Updated {formatDate(lastFetched)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
