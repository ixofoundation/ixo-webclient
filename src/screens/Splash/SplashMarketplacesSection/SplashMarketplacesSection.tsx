import React, { FunctionComponent } from 'react'

import { CardsContainer, CollectionContainer, SectionHeading, CardImage } from './SplashMarketplacesSection.styles'
import marketplace1 from '/assets/images/splash/marketplace-1.png'
import marketplace2 from '/assets/images/splash/marketplace-2.png'
import marketplace3 from '/assets/images/splash/marketplace-3.png'
import { ContentContainer } from '../Splash.styles'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SplashMarketPlaceSection: FunctionComponent<Props> = () => {
  return (
    <CollectionContainer>
      <ContentContainer className='container'>
        <SectionHeading>Launched Marketplaces</SectionHeading>
        <CardsContainer>
          <CardImage src={marketplace1.src} alt='Marketplace 1' loading='lazy' />
          <CardImage src={marketplace2.src} alt='Marketplace 2' loading='lazy' />
          <CardImage src={marketplace3.src} alt='Marketplace 3' loading='lazy' />
          <CardImage src={marketplace1.src} alt='Marketplace 1' loading='lazy' />
          <CardImage src={marketplace2.src} alt='Marketplace 2' loading='lazy' />
          <CardImage src={marketplace3.src} alt='Marketplace 3' loading='lazy' />
          <CardImage src={marketplace1.src} alt='Marketplace 1' loading='lazy' />
          <CardImage src={marketplace2.src} alt='Marketplace 2' loading='lazy' />
          <CardImage src={marketplace3.src} alt='Marketplace 3' loading='lazy' />
          <CardImage src={marketplace1.src} alt='Marketplace 1' loading='lazy' />
          <CardImage src={marketplace2.src} alt='Marketplace 2' loading='lazy' />
          <CardImage src={marketplace3.src} alt='Marketplace 3' loading='lazy' />
          <CardImage src={marketplace1.src} alt='Marketplace 1' loading='lazy' />
          <CardImage src={marketplace2.src} alt='Marketplace 2' loading='lazy' />
          <CardImage src={marketplace3.src} alt='Marketplace 3' loading='lazy' />
        </CardsContainer>
      </ContentContainer>
    </CollectionContainer>
  )
}

export default SplashMarketPlaceSection
