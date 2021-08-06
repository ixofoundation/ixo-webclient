import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import LocationMap from 'common/components/LocationMap/LocationMap'
import { GeoLocation } from 'common/components/LocationMap/types'

interface Props {
  value: string
  onChange: (value: string) => void
}

const LocationSelector: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    if (value) {
      return
    }

    Axios.get(
      'https://geolocation-db.com/json/afa4d000-8eb9-11eb-a6ff-2538b793e762',
    ).then((response) => {
      setLocation({
        lat: response.data.latitude,
        lng: response.data.longitude,
      })
    })
    // eslint-disable-next-line
  }, [])

  if (value) {
    const { lat, lng }: GeoLocation = JSON.parse(value)
    return (
      <LocationMap
        lat={lat}
        lng={lng}
        zoom={15}
        height={300}
        onLocationChange={(geoLocation): void =>
          onChange(JSON.stringify(geoLocation))
        }
      />
    )
  }

  if (location) {
    const { lat, lng }: GeoLocation = location
    return (
      <LocationMap
        lat={lat}
        lng={lng}
        zoom={15}
        height={300}
        onLocationChange={(geoLocation): void =>
          onChange(JSON.stringify(geoLocation))
        }
      />
    )
  }

  return null
}

export default LocationSelector
