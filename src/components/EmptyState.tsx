import { Ship, Clock, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="flex flex-col items-center text-center pt-10 pb-10 gap-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-full animate-pulse" />
            <Ship className="w-16 h-16 text-primary relative" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Scanning the seas...
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Our agents are searching for the best Eastern Mediterranean cruise
              deals for July–August 2026. Check back soon!
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Updates 3x daily</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Waves className="w-4 h-4" />
              <span>5 cruise lines</span>
            </div>
          </div>

          <div className="w-full space-y-3 pt-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Monitoring
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['MSC', 'Costa', 'Celebrity', 'Norwegian', 'Royal Caribbean'].map(
                (line) => (
                  <span
                    key={line}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {line}
                  </span>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
