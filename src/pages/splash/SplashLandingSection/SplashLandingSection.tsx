import React, { FC, useRef } from 'react'
import Lottie from 'react-lottie'

import {
  SectionContainer,
  InnerContainer,
  AppImg,
  TopContainer,
  Heading,
  FlexWrapper,
  SubHeading,
  BottomContainer,
  GradientButton,
  GradientAppButton,
  NextSectionButton,
  AppLabel,
  BackgroundWaveAnimation,
} from './SplashLandingSection.components'
import waveAnimation from './wave.lottie.json'
import doubleArrow from '../../../assets/images/splash/doublearrow.svg'
import googlePlay from '../../../assets/images/splash/GooglePlay.svg'
import appleStore from '../../../assets/images/splash/AppStore.svg'
import TypeWriter from '../components/TypeWriter/TypeWriter'

const SplashLandingSection: FC = () => {
  const scrollDownRef = useRef<HTMLDivElement>(null)

  const scrollDown = (): void => {
    if (scrollDownRef.current)
      scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionContainer>
      <BackgroundWaveAnimation>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: waveAnimation,
          }}
          height="100%"
          width="100%"
        />
      </BackgroundWaveAnimation>
      <InnerContainer>
        <TopContainer>
          <Heading>
            Impact{' '}
            <TypeWriter
              text={[
                'Exchange',
                'Project',
                'Token',
                'DAO',
                'Investment',
                'Oracle',
              ]}
              typingSpeed={110}
              eraseSpeed={90}
              typingDelay={100}
              eraseDelay={2000}
              showCursor
            />
            <div className="sentence">LAUNCHPAD</div>
          </Heading>
          <SubHeading>Bring Web3 to Life</SubHeading>
        </TopContainer>
        <BottomContainer>
          <GradientButton>PREPARE TO LAUNCH</GradientButton>
          <div>
            <AppLabel>
              Get your <strong>Earth X</strong> Mobile Wallet
            </AppLabel>
            <FlexWrapper>
              <GradientAppButton
                marginRight={12}
                href="https://play.google.com/store/apps/details?id=com.ixo&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppImg src={googlePlay} alt="Get it on Google Play" />
              </GradientAppButton>
              <GradientAppButton
                href="https://itunes.apple.com/za/app/ixo/id1441394401?mt=8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppImg src={appleStore} alt="Download on the App Store" />
              </GradientAppButton>
            </FlexWrapper>
          </div>
        </BottomContainer>
        <NextSectionButton onClick={scrollDown} ref={scrollDownRef}>
          <img src={doubleArrow} alt="Scroll down to next section" />
        </NextSectionButton>
      </InnerContainer>
    </SectionContainer>
  )
}

export default SplashLandingSection
