import React from 'react';
import LocationMap from 'common/components/LocationMap/LocationMap';
import { GeoLocation } from 'common/components/LocationMap/types';

interface Props {
  value: string
  onChange: (value: string) => void
}

const LocationSelector: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const { lat, lng }: GeoLocation = value
    ? JSON.parse(value)
    : {
      lat: 51.596692,
      lng: -0.153783,
    };

  return (
    <LocationMap
      lat={lat}
      lng={lng}
      zoom={15}
      height={300}
      onLocationChange={(geoLocation): void =>
        onChange(JSON.stringify(geoLocation))}
    />
  );
};

export default LocationSelector;
