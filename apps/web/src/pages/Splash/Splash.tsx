import React, { FunctionComponent } from 'react'

import SplashLandingSection from './SplashLandingSection/SplashLandingSection'
import SplashLaunchSection from './SplashLaunchSection/SplashLaunchSection'
import SplashFeaturesSection from './SplashFeaturesSection/SplashFeaturesSection'
import SplashPartnersSection from './SplashPartnersSection/SplashPartnersSection'
import { ScrollArea } from '@mantine/core'
// import SplashMarketPlaceSection from './SplashMarketplacesSection/SplashMarketplacesSection'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Splash: FunctionComponent<Props> = () => {
  return (
    <ScrollArea w='100%' h='100vh'>
      <SplashLandingSection />
      <SplashLaunchSection />
      <SplashFeaturesSection />
      {/* <SplashMarketPlaceSection /> */}
      <SplashPartnersSection />
    </ScrollArea>
  )
}

export default Splash
