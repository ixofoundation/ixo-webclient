import { isoCountriesLatLng } from '../../../lib/commonData'

export const getCountryCoordinates = (countries: any[]): Array<unknown> => {
  const coords = []
  for (const key in isoCountriesLatLng) {
    if (Object.hasOwnProperty.call(isoCountriesLatLng, key)) {
      for (const i in countries) {
        if (countries[i] === key) {
          coords.push([
            isoCountriesLatLng[key].lng,
            isoCountriesLatLng[key].lat,
          ])
        }
      }
    }
  }
  return coords
}
