import { FunctionComponent } from 'react'
import { ContentContainer } from '../Splash.styles'

import { SectionHeading, CollectionContainer, CardsContainer, Card, CardImage } from './SplashPartnersSection.styles'

import splashConfig from '../splash-config.json'
import { requireCheckDefault } from 'utils/images'
const PARTNERS = splashConfig.partners

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SplashPartnersSection: FunctionComponent<Props> = () => {
  const isImageExternalLink = (imageSource: string): boolean => {
    return imageSource.trim().startsWith('http')
  }

  return (
    <ContentContainer>
      <CollectionContainer>
        <SectionHeading>Launchpad Sponsors and Partners</SectionHeading>
        <CardsContainer>
          {PARTNERS.length > 0 &&
            PARTNERS.map((sponsor) => {
              return (
                <Card
                  key={sponsor.title}
                  href={sponsor.url!}
                  target='_blank'
                  rel='noopener noreferrer'
                  backgroundcolor={sponsor.color}
                >
                  <CardImage
                    src={
                      isImageExternalLink(sponsor.image)
                        ? sponsor.image
                        : `/public/assets/images/splash/partners/${sponsor.image}`
                    }
                    alt={sponsor.title}
                    loading='lazy'
                  />
                </Card>
              )
            })}
        </CardsContainer>
      </CollectionContainer>
    </ContentContainer>
  )
}

export default SplashPartnersSection
