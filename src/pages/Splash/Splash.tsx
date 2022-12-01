import React, { FunctionComponent } from 'react'

import SplashLandingSection from './SplashLandingSection/SplashLandingSection'
import SplashLaunchSection from './SplashLaunchSection/SplashLaunchSection'
import SplashFeaturesSection from './SplashFeaturesSection/SplashFeaturesSection'
import SplashPartnersSection from './SplashPartnersSection/SplashPartnersSection'
// import SplashMarketPlaceSection from './SplashMarketplacesSection/SplashMarketplacesSection'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Splash: FunctionComponent<Props> = () => {
  return (
    <>
      <SplashLandingSection />
      <SplashLaunchSection />
      <SplashFeaturesSection />
      {/* <SplashMarketPlaceSection /> */}
      <SplashPartnersSection />
    </>
  )
}

export default Splash
