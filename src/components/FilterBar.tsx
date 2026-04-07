import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  cruiseLineFilter: string;
  onCruiseLineChange: (value: string) => void;
  cruiseLines: string[];
}

const SORT_OPTIONS = [
  { value: "score", label: "Score (Best First)" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "departure", label: "Departure Date" },
  { value: "duration", label: "Duration" },
  { value: "rating", label: "Rating" },
];

export function FilterBar({
  sortBy,
  onSortChange,
  cruiseLineFilter,
  onCruiseLineChange,
  cruiseLines,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2 flex-1">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
        <Select value={cruiseLineFilter} onValueChange={onCruiseLineChange}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="All Lines" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Lines</SelectItem>
            {cruiseLines.map((line) => (
              <SelectItem key={line} value={line}>
                {line}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
