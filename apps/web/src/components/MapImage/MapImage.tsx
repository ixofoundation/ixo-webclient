import { Flex, Image, Loader } from '@mantine/core'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic2VyaGlpLXBlcmVob25jaHVrLXNpZ21hIiwiYSI6ImNsazlyMnRpNjBzbmYzZnJ0MmxqaHJsb3gifQ.2u6dhz1Yd5JJznYzLYKDjg'

export const MapImage = ({ latitude, longitude }: { latitude?: string | number; longitude?: string | number }) => {
  if (!latitude && !longitude) {
    return (
      <Flex w={'100%'} h={300} align='center' justify='center'>
        <Loader />
      </Flex>
    )
  }

  const geoObj = JSON.stringify({
    type: 'Point',
    coordinates: [longitude, latitude],
  })
  const geoJSON = encodeURIComponent(geoObj)

  const url = `https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/static/geojson(${geoJSON})/${longitude},${latitude},3/600x300?access_token=${MAPBOX_ACCESS_TOKEN}`

  return (
    <Image
      pos={'absolute'}
      top={0}
      left={0}
      width='100%'
      src={url}
      alt='map which shows where the cookstove is located'
    />
  )
}
