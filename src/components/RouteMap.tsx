import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { PortStop } from '@/types/cruise';

interface RouteMapProps {
  itinerary: PortStop[];
  className?: string;
}

const PORT_COORDS: Record<string, [number, number]> = {
  'genoa': [44.41, 8.93],
  'venice': [45.44, 12.34],
  'ravenna': [44.42, 12.20],
  'naples': [40.85, 14.27],
  'rome': [41.89, 12.50],
  'civitavecchia': [42.09, 11.80],
  'bari': [41.12, 16.87],
  'dubrovnik': [42.65, 18.09],
  'split': [43.51, 16.44],
  'piraeus': [37.94, 23.65],
  'piraeus (athens)': [37.94, 23.65],
  'athens': [37.94, 23.65],
  'santorini': [36.39, 25.46],
  'mykonos': [37.45, 25.33],
  'corfu': [39.62, 19.92],
  'katakolon': [37.64, 21.32],
  'argostoli': [38.17, 20.49],
  'crete': [35.34, 24.47],
  'istanbul': [41.01, 28.98],
  'kusadasi': [37.86, 27.26],
  'izmir': [38.42, 27.14],
  'izmir (ephesus)': [38.42, 27.14],
  'barcelona': [41.38, 2.18],
  'palma': [39.57, 2.65],
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

export function RouteMap({ itinerary, className = '' }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const points = itinerary
    .map((stop) => ({ ...stop, coords: getCoords(stop.port) }))
    .filter((s) => s.coords !== null) as (PortStop & { coords: [number, number] })[];

  useEffect(() => {
    if (!mapRef.current || points.length < 2) return;
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });
    mapInstance.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    const latLngs = points.map((p) => L.latLng(p.coords[0], p.coords[1]));

    // Port markers (dots only, no route lines)
    points.forEach((p, i) => {
      const isEndpoint = i === 0 || i === points.length - 1;
      const circle = L.circleMarker(L.latLng(p.coords[0], p.coords[1]), {
        radius: isEndpoint ? 6 : 4,
        color: '#6366f1',
        fillColor: isEndpoint ? '#6366f1' : '#818cf8',
        fillOpacity: 1,
        weight: 2,
      }).addTo(map);

      circle.bindTooltip(
        `<b>${p.port}</b><br/>${p.country}${i > 0 ? `<br/>Day ${i + 1}` : ''}`,
        { direction: 'top', offset: [0, -8] }
      );

      // Permanent label for endpoints
      if (isEndpoint) {
        L.marker(L.latLng(p.coords[0], p.coords[1]), {
          icon: L.divIcon({
            className: 'leaflet-port-label',
            html: `<span style="color:#e2e8f0;font-size:11px;font-weight:600;text-shadow:0 0 4px #000,0 0 4px #000">${p.port.replace(/\s*\(.*\)/, '')}</span>`,
            iconSize: [0, 0],
            iconAnchor: [0, 20],
          }),
        }).addTo(map);
      }
    });

    // Fit bounds with padding
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [itinerary]);

  if (points.length < 2) return null;

  return (
    <div
      ref={mapRef}
      className={`rounded-lg overflow-hidden border border-border/40 ${className}`}
      style={{ minHeight: 200 }}
    />
  );
}
