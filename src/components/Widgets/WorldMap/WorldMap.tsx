import React from 'react'
// @ts-ignore
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker, Lines, Line } from 'react-simple-maps'
import { MapWrapper, MobileSwipeIconWrapper } from './WorldMap.styles'
import MobileSwipe from 'assets/icons/MobileSwipe'
import { requireCheckDefault } from 'utils/images'

export class LatLng {
  coordinate: any = null
  constructor(lat: number, lon: number) {
    this.coordinate = { lat: lat, lon: lon }
  }

  lon(): number {
    return this.coordinate.lon
  }

  lat(): number {
    return this.coordinate.lat
  }
}

export interface ParentProps {
  markers: LatLng[]
}

export class WorldMap extends React.Component<ParentProps> {
  render(): JSX.Element {
    const countryProps = {
      fill: '#053c53',
      stroke: '#337a8e',
      strokeWidth: 0.3,
      outline: 'none!important',
    }

    const markerProps = {
      fill: '#49BFE0',
    }

    return <></>
  }
}
