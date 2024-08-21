import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { useMantineTheme } from '@mantine/core'
import '@mantine/carousel/styles.css'
import FeaturedEntityCard from './FeaturedEntityCard'

function Card({ entity }: { entity: any }) {
  return <FeaturedEntityCard entity={entity} />
}

export const FeaturedEntities = ({ entities }: { entities: any[] }) => {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const slides = entities.map((entity: any) => (
    <Carousel.Slide key={entity.id}>
      <Card entity={entity} />
    </Carousel.Slide>
  ))

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '33.333333%' }}
      slideGap={{ base: 'md', sm: 'xl' }}
      align='start'
      slidesToScroll={mobile ? 1 : 3}
      withControls
      containScroll='keepSnaps'
      loop
      // styles={{
      //   container: {
      //     width: '100%',
      //   },
      // }}
      controlsOffset='-300px'
    >
      {slides}
    </Carousel>
  )
}
