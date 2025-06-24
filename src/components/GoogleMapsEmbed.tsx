
import { useEffect, useRef } from 'react';

interface GoogleMapsEmbedProps {
  apiKey?: string;
  address: string;
  className?: string;
}

const GoogleMapsEmbed = ({ apiKey, address, className = "w-full h-64" }: GoogleMapsEmbedProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiKey) {
      // Fallback to embedded iframe if no API key
      return;
    }

    // If you have a Google Maps API key, you can implement the interactive map here
    // For now, we'll use the simpler iframe approach
  }, [apiKey, address]);

  // For now, using iframe embed (no API key required)
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey || 'demo'}&q=${encodeURIComponent(address)}`;

  return (
    <div className={className}>
      {apiKey ? (
        <iframe
          ref={mapRef}
          src={embedUrl}
          className="w-full h-full rounded-lg border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Restaurant Location"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="mb-2">📍</div>
            <p className="font-medium">Restaurant Location</p>
            <p className="text-sm">{address}</p>
            <p className="text-xs mt-2">Add Google Maps API key for interactive map</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsEmbed;
