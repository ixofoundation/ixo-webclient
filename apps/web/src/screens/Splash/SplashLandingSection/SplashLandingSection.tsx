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
} from './SplashLandingSection.styles'
import waveAnimation from './wave.lottie.json'

import TypeWriter from '../../../components/TypeWriter/TypeWriter'

const SplashLandingSection: FC = () => {
  const scrollDownRef = useRef<HTMLDivElement>(null)

  const scrollDown = (): void => {
    if (scrollDownRef.current) scrollDownRef.current.scrollIntoView({ behavior: 'smooth' })
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
          height='100%'
          width='100%'
        />
      </BackgroundWaveAnimation>
      <InnerContainer>
        <TopContainer>
          <Heading>
            Impacts{' '}
            <TypeWriter
              text={['Exchange', 'Project', 'Token', 'DAO', 'Investment', 'Oracle']}
              typingSpeed={110}
              eraseSpeed={90}
              typingDelay={100}
              eraseDelay={2000}
              showCursor
            />
            <div className='sentence'>LAUNCHPAD</div>
          </Heading>
          <SubHeading>
            Bring the Internet of Impacts to <strong>Life</strong>
          </SubHeading>
        </TopContainer>
        <BottomContainer>
          <GradientButton href='https://airtable.com/shrl3vCq3yIZZHNF5' target='_blank' rel='noopener noreferrer'>
            APPLY TO LAUNCH
          </GradientButton>
          <div>
            <AppLabel>
              Get your <strong>Impacts X</strong> Wallet
              {'   '}
            </AppLabel>
            <FlexWrapper>
              <GradientAppButton
                marginright={12}
                href='https://play.google.com/store/apps/details?id=com.ixo.mobile'
                target='_blank'
                rel='noopener noreferrer'
                title='Download on Google Play'
              >
                <AppImg src={'/assets/images/home/googlePlay.png'} alt='Get it on Google Play' />
              </GradientAppButton>
              <GradientAppButton
                href='https://apps.apple.com/us/app/impacts-x/id6444948058?mt=8'
                target='_blank'
                rel='noopener noreferrer'
                title='Download on the App Store'
              >
                <AppImg src={'/assets/images/home/appleStore.png'} alt='Download on the App Store' />
              </GradientAppButton>
            </FlexWrapper>
          </div>
        </BottomContainer>
        <NextSectionButton onClick={scrollDown} ref={scrollDownRef}>
          <img src='/assets/images/splash/doublearrow.svg' alt='Scroll down to next section' />
        </NextSectionButton>
      </InnerContainer>
    </SectionContainer>
  )
}

export default SplashLandingSection
