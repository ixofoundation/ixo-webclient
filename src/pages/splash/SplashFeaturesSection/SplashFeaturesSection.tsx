import { FC, MouseEventHandler, useState } from 'react'
import MediaQuery from 'react-responsive'
import Carousel from 'react-bootstrap/Carousel'
import { useTrail, animated as Animated, interpolate } from 'react-spring'

import { deviceWidth } from 'lib/commonData'
import {
  RadialBackgroundContainer,
  RowContainer,
  FeaturesLeft,
  FeaturesRight,
  TabCard,
  SectionHeading,
  Tab,
  TabTitle,
  TabDescription,
  CardIcon,
  CardText,
  CarouselNextButton,
  CarouselPrevButton,
} from './SplashFeaturesSection.components'
import { ContentContainer } from '../Splash.components'

import splashConfig from '../splash-config.json'
const FEATURE_CONTENT = splashConfig.features

const config = { mass: 5, tension: 2000, friction: 200 }

export interface Card {
  icon: string
  text: string
  colors: string[]
}

export interface TabContent {
  title: string
  desc: string
  cards: Card[]
}

interface FeatureCardsProps {
  cards: Card[]
  toggle: boolean
}

const FeatureCards: FC<FeatureCardsProps> = ({ cards, toggle }) => {
  const trail = useTrail(cards.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    from: { opacity: 0, x: 20 },
  })

  return (
    <>
      {trail.map(({ x, ...rest }, index) => {
        const card = cards[index]

        return (
          <Animated.div
            key={card.text}
            className='trails-text'
            style={{
              ...rest,
              transform: interpolate([x], (y) => `translate3d(0,${y}px,0)`),
            }}
          >
            <TabCard key={index} colors={card.colors}>
              <CardIcon loading='lazy' src={require(`assets/images/splash/feature-icons/${card.icon}`)} />
              <CardText>{card.text}</CardText>
            </TabCard>
          </Animated.div>
        )
      })}
    </>
  )
}

interface FeatureTabsProps {
  onTabChange: (index: number) => MouseEventHandler<HTMLDivElement>
  onMobileTabChange: (eventKey: number, direction?: 'left' | 'right') => void
  activeTabIndex: number
}

const FeatureTabs: FC<FeatureTabsProps> = ({ onTabChange, onMobileTabChange, activeTabIndex }) => {
  return (
    <>
      <MediaQuery minWidth={`${deviceWidth.desktop + 1}px`}>
        {FEATURE_CONTENT.map((tab, index) => {
          return (
            <Tab
              key={index}
              className={(activeTabIndex === index && 'active') || undefined}
              onClick={onTabChange(index)}
            >
              <TabTitle>{tab.title}</TabTitle>
              <TabDescription>{tab.desc}</TabDescription>
            </Tab>
          )
        })}
      </MediaQuery>
      <MediaQuery maxWidth={`${deviceWidth.desktop}px`}>
        {
          <Carousel
            indicators={false}
            keyboard
            interval={null}
            onSlid={onMobileTabChange as any}
            nextIcon={<CarouselNextButton aria-hidden='true' className='carousel-control-next-icon' />}
            prevIcon={<CarouselPrevButton aria-hidden='true' className='carousel-control-next-icon' />}
          >
            {FEATURE_CONTENT.map((header, index) => {
              return (
                <Carousel.Item key={index}>
                  <Tab key={index} className={(activeTabIndex === index && 'active') || undefined}>
                    <TabTitle>{header.title}</TabTitle>
                    <TabDescription>{header.desc}</TabDescription>
                  </Tab>
                </Carousel.Item>
              )
            })}
          </Carousel>
        }
        <br />
      </MediaQuery>
    </>
  )
}

const SplashFeaturesSection: FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [toggle, setToggle] = useState(true)

  const handleTabChange: (index: number) => MouseEventHandler<HTMLDivElement> = (tabIndex: number) => {
    return (): void => {
      setToggle(false)
      setTimeout(() => {
        setToggle(true)
        setActiveTabIndex(tabIndex)
      }, 300)
    }
  }

  const handleMobileTabChange: (eventKey: number, direction: 'left' | 'right') => void = (eventKey) => {
    setToggle(false)
    setTimeout(() => {
      setToggle(true)
      setActiveTabIndex(eventKey)
    }, 300)
  }

  return (
    <RadialBackgroundContainer>
      <ContentContainer>
        <RowContainer>
          <SectionHeading>Features</SectionHeading>
        </RowContainer>
        <RowContainer>
          <FeaturesLeft lg={6}>
            <FeatureTabs
              onMobileTabChange={handleMobileTabChange as any}
              onTabChange={handleTabChange}
              activeTabIndex={activeTabIndex}
            />
          </FeaturesLeft>
          <FeaturesRight lg={6}>
            <FeatureCards toggle={toggle} cards={FEATURE_CONTENT[activeTabIndex].cards} />
          </FeaturesRight>
        </RowContainer>
      </ContentContainer>
    </RadialBackgroundContainer>
  )
}

export default SplashFeaturesSection
