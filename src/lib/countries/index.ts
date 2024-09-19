import countryLatLng from 'constants/maps/countryLatLng.json'

const isoCountriesTmp: any = {}
const isoCountriesLatLngTmp: any = {}

countryLatLng.forEach((value) => {
  isoCountriesTmp[value.alpha2] = value.country
  isoCountriesLatLngTmp[value.alpha2] = {
    lat: value.latitude,
    lng: value.longitude,
  }
})

export const isoCountries = isoCountriesTmp
export const isoCountriesLatLng = isoCountriesLatLngTmp
