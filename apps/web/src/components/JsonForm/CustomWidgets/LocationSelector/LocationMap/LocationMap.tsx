// @ts-nocheck @zach
import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps'
import Autocomplete from 'react-google-autocomplete'
import Geocode, { setDefaults } from 'react-geocode'
import { GeoLocation } from './types'
import { GoogleMapWrapper, InputWrapper } from './LocationMap.styles'


setDefaults({
  key: import.meta.env.VITE_APP_GOOGLE_API_KEY!
})

interface Props {
  zoom: number
  height: number
  lat: number
  lng: number
  onLocationChange: (location: GeoLocation) => void
}

// State is the same as the GeoLocation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State extends GeoLocation {}

class LocationMap extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      lat: this.props.lat,
      lng: this.props.lng,
    }
  }

  componentDidMount(): void {
    this.geoCodeFromLatLng(this.state.lat, this.state.lng)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return (
      this.state.lat !== this.props.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    )
  }

  componentDidUpdate(): void {
    this.props.onLocationChange(this.state)
  }

  geoCodeFromLatLng = (lat: number, lng: number): void => {
    Geocode.fromLatLng(lat, lng).then(
      (response: any) => {
        const addressArray = response.results[0].address_components

        this.setState({
          address: response.results[0].formatted_address || '',
          area: this.getArea(addressArray) || '',
          city: this.getCity(addressArray) || '',
          state: this.getState(addressArray) || '',
        })
      },
      (error: any) => {
        console.error(error)
      },
    )
  }

  getCity = (addressArray: any[]): string => {
    const administrativeAreaL2 = addressArray.find((address) => address.types[0] === 'administrative_area_level_2')

    return administrativeAreaL2 ? administrativeAreaL2.long_name : null
  }

  getArea = (addressArray: any[]): string => {
    const locality = addressArray.find((address) => address.types.includes('sublocality_level_1', 'locality'))

    return locality ? locality.long_name : null
  }

  getState = (addressArray: any[]): string => {
    const administrativeAreaL1 = addressArray.find((address) => address.types[0] === 'administrative_area_level_1')

    return administrativeAreaL1 ? administrativeAreaL1.long_name : null
  }

  onPlaceSelected = (place: any): void => {
    if (!place || !place.address_components || !place.geometry) {
      return
    }

    const addressArray = place.address_components
    const latValue = place.geometry.location.lat()
    const lngValue = place.geometry.location.lng()

    this.setState({
      address: place.formatted_address || '',
      area: this.getArea(addressArray) || '',
      city: this.getCity(addressArray) || '',
      state: this.getState(addressArray) || '',
      lat: latValue,
      lng: lngValue,
    })
  }

  onMarkerDragEnd = (event: any): void => {
    const lat = event.latLng.lat()
    const lng = event.latLng.lng()

    this.geoCodeFromLatLng(lat, lng)
  }

  render(): JSX.Element {
    const AsyncMap = withScriptjs<any>(
      withGoogleMap(() => (
        <>
          <InputWrapper>
            <Autocomplete
              onPlaceSelected={this.onPlaceSelected}
              types={['address']}
              inputAutocompleteValue={this.state.address}
            />
          </InputWrapper>
          <GoogleMap
            defaultZoom={15}
            defaultCenter={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
            defaultOptions={{
              fullscreenControl: false,
            }}
          >
            <Marker
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: this.state.lat,
                lng: this.state.lng,
              }}
            />
            <Marker />
            <InfoWindow
              position={{
                lat: this.state.lat + 0.0018,
                lng: this.state.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.address || 'Drag marker or enter an address'}</span>
              </div>
            </InfoWindow>
          </GoogleMap>
        </>
      )),
    )

    return (
      <GoogleMapWrapper>
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_API_KEY}&libraries=places`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: `${this.props.height}px` }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </GoogleMapWrapper>
    )
  }
}

export default LocationMap
