import type { PortStop } from '@/types/cruise';

interface RouteMapProps {
  itinerary: PortStop[];
  className?: string;
}

const PORT_COORDS: Record<string, [number, number]> = {
  // Italy
  'genoa': [44.41, 8.93],
  'venice': [45.44, 12.34],
  'ravenna': [44.42, 12.20],
  'naples': [40.85, 14.27],
  'rome': [41.89, 12.50],
  'civitavecchia': [42.09, 11.80],
  'bari': [41.12, 16.87],

  // Croatia
  'dubrovnik': [42.65, 18.09],
  'split': [43.51, 16.44],

  // Greece
  'piraeus': [37.94, 23.65],
  'piraeus (athens)': [37.94, 23.65],
  'athens': [37.94, 23.65],
  'santorini': [36.39, 25.46],
  'mykonos': [37.45, 25.33],
  'corfu': [39.62, 19.92],
  'katakolon': [37.64, 21.32],
  'argostoli': [38.17, 20.49],
  'crete': [35.34, 24.47],

  // Turkey
  'istanbul': [41.01, 28.98],
  'kusadasi': [37.86, 27.26],
  'izmir': [38.42, 27.14],
  'izmir (ephesus)': [38.42, 27.14],

  // Spain
  'barcelona': [41.38, 2.18],
  'palma': [39.57, 2.65],

  // Other
  'marseille': [43.30, 5.37],
  'kotor': [42.43, 18.77],
};

function getCoords(portName: string): [number, number] | null {
  const key = portName.toLowerCase();
  if (PORT_COORDS[key]) return PORT_COORDS[key];
  for (const [name, coords] of Object.entries(PORT_COORDS)) {
    if (key.includes(name) || name.includes(key)) return coords;
  }
  return null;
}

function latLonToSvg(lat: number, lon: number, bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }, width: number, height: number, padding: number): [number, number] {
  const x = padding + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * (width - padding * 2);
  const y = padding + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * (height - padding * 2);
  return [x, y];
}

export function RouteMap({ itinerary, className = '' }: RouteMapProps) {
  const points = itinerary
    .map((stop) => ({
      ...stop,
      coords: getCoords(stop.port),
    }))
    .filter((s) => s.coords !== null) as (PortStop & { coords: [number, number] })[];

  if (points.length < 2) return null;

  const lats = points.map((p) => p.coords[0]);
  const lons = points.map((p) => p.coords[1]);
  const padding = 30;
  const bounds = {
    minLat: Math.min(...lats) - 1.5,
    maxLat: Math.max(...lats) + 1.5,
    minLon: Math.min(...lons) - 2,
    maxLon: Math.max(...lons) + 2,
  };

  const width = 400;
  const height = 220;

  const svgPoints = points.map((p) => ({
    ...p,
    svgCoords: latLonToSvg(p.coords[0], p.coords[1], bounds, width, height, padding),
  }));

  const pathData = svgPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.svgCoords[0]} ${p.svgCoords[1]}`)
    .join(' ');

  return (
    <div className={`rounded-lg border border-border/40 bg-muted/20 overflow-hidden ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
          >
            <polygon points="0 0, 6 2, 0 4" className="fill-primary" />
          </marker>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className="[stop-color:var(--color-primary)]" stopOpacity="0.4" />
            <stop offset="50%" className="[stop-color:var(--color-primary)]" stopOpacity="1" />
            <stop offset="100%" className="[stop-color:var(--color-primary)]" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Route line */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="2"
          strokeDasharray="6 3"
          markerEnd="url(#arrowhead)"
        />

        {/* Port dots and labels */}
        {svgPoints.map((p, i) => {
          const isFirst = i === 0;
          const isLast = i === svgPoints.length - 1;
          const isEndpoint = isFirst || isLast;

          return (
            <g key={`${p.port}-${i}`}>
              {/* Dot */}
              {isEndpoint && (
                <circle
                  cx={p.svgCoords[0]}
                  cy={p.svgCoords[1]}
                  r="6"
                  className="fill-primary/20"
                />
              )}
              <circle
                cx={p.svgCoords[0]}
                cy={p.svgCoords[1]}
                r={isEndpoint ? 4 : 3}
                className={isEndpoint ? 'fill-primary' : 'fill-primary/70'}
                stroke="var(--color-background)"
                strokeWidth="1.5"
              />

              {/* Label */}
              <text
                x={p.svgCoords[0]}
                y={p.svgCoords[1] - 8}
                textAnchor="middle"
                className="fill-foreground text-[9px] font-medium"
                style={{ paintOrder: 'stroke', stroke: 'var(--color-background)', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }}
              >
                {p.port.replace(/\s*\(.*\)/, '')}
              </text>

              {/* Country label for first/last */}
              {isEndpoint && (
                <text
                  x={p.svgCoords[0]}
                  y={p.svgCoords[1] + 14}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[7px]"
                  style={{ paintOrder: 'stroke', stroke: 'var(--color-background)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  {p.country}
                </text>
              )}

              {/* Day number */}
              {!isFirst && !isLast && (
                <text
                  x={p.svgCoords[0] + 7}
                  y={p.svgCoords[1] + 4}
                  className="fill-muted-foreground text-[7px]"
                >
                  D{i + 1}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
