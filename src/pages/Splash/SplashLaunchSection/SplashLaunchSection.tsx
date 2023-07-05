import { FC } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import Lottie from 'react-lottie'

import {
  RowContainer,
  Paragraph,
  SectionHeading,
  SectionSubheading,
  ColumnContainer,
  CollectionAnimationContainer,
  AnimationBackgroundImage,
  GreyBackgroundContainer,
  NoPaddingColumnContainer,
  MarketplaceAnimationContainer,
  Card,
  CardIcon,
  NoPaddingRow,
  NoPaddingCol,
  NoPaddingWrapper,
  CampaignAnimationContainer,
} from './SplashLaunchSection.styles'
import { deviceWidth } from 'constants/device'
import { ContentContainer } from '../Splash.styles'
import collectionAnimation from './launch-a-collection.lottie.json'
import marketplaceAnimation from './launch-a-marketplace.lottie.json'
import campaignAnimation from './launch-a-campaign.lottie.json'
import marketplaceBackground from 'assets/images/splash/marketplace-background.png'

import splashConfig from '../splash-config.json'
const SDG_ICONS = splashConfig.sdgIcons

export const SplashCards: FC = () => {
  const sdgIconGroups = [SDG_ICONS.slice(0, 6), SDG_ICONS.slice(6, 12), SDG_ICONS.slice(12, 18)]

  return (
    <NoPaddingWrapper>
      {sdgIconGroups.map((iconGroup, iconGroupIndex) => {
        return (
          <NoPaddingRow key={`icon_group_${iconGroupIndex}`}>
            {iconGroup.map((icon) => {
              return (
                <NoPaddingCol key={icon.class}>
                  <Card iconColor={icon.bgColor} href={icon.url} target='_blank' rel='noopener noreferrer'>
                    {icon.tooltip ? (
                      <OverlayTrigger placement='top' overlay={<Tooltip id={`tooltip-top`}>{icon.tooltip}</Tooltip>}>
                        <CardIcon className={icon.class} />
                      </OverlayTrigger>
                    ) : (
                      <div className='content'>
                        <CardIcon className={icon.class} />
                      </div>
                    )}
                  </Card>
                </NoPaddingCol>
              )
            })}
          </NoPaddingRow>
        )
      })}
    </NoPaddingWrapper>
  )
}

export const SplashLaunchSection: FC = () => {
  return (
    <div id='launch-a-marketplace'>
      <ContentContainer>
        <RowContainer reverseorderonmobile='true'>
          <ColumnContainer md={6}>
            <div>
              <SectionHeading>Launch a Marketplace</SectionHeading>
              <SectionSubheading>Grow you Impact ecosystem</SectionSubheading>
              <Paragraph>
                Host the Earth Portal web application platform and mobile wallet customised for your sector and target
                market.
                <br />
                <br />
                Impact Creators in your ecosystem will gain powerful new capabilities to scale their coordination,
                financing, delivery, and verification of Outcomes.
                <br />
                <br />
                <em>The Launchpad is an example of what you can build!</em>
              </Paragraph>
            </div>
          </ColumnContainer>
          <ColumnContainer md={6}>
            <MarketplaceAnimationContainer>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: marketplaceAnimation,
                }}
                height='100%'
                width='100%'
              />
              <AnimationBackgroundImage src={marketplaceBackground} />
            </MarketplaceAnimationContainer>
          </ColumnContainer>
        </RowContainer>
      </ContentContainer>

      <GreyBackgroundContainer>
        <ContentContainer>
          <RowContainer>
            <ColumnContainer md={6}>
              <CollectionAnimationContainer>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: collectionAnimation,
                  }}
                  height='100%'
                  width='100%'
                />
              </CollectionAnimationContainer>
            </ColumnContainer>
            <ColumnContainer md={6}>
              <div>
                <SectionHeading>Launch a Collection</SectionHeading>
                <SectionSubheading>Tokenise your Impact Assets</SectionSubheading>
                <Paragraph>
                  Impact Assets are dynamic NFTs that digitise real-world devices (such as a clean cookstove) or outcomes.
                  <br />
                  <br />
                  The usage of the device is digitally measured and reported. The data is verified using a causal-AI model,
                  and based on the verified impacts, Impact Tokens are issued. They represent certain verified outcomes, for example
                  1 CARBON = 1 kgCO<sub>2</sub> emissions avoided. The Tokens are backed up by Impact Certificates, which contain all the
                  underlying data like usage time, evaluation methods, fuel usage, project details etc.
                  <br />
                  <br />
                  Impact Assets and Tokens can be sold directly, or traded through interchain decentralised Impact Exchanges.
                  <br />
                  <br />
                  <em>
                    The Launchpad offers a platform for minting and trading first-edition Impact Asset collections.
                  </em>
                </Paragraph>
              </div>
            </ColumnContainer>
          </RowContainer>
        </ContentContainer>
      </GreyBackgroundContainer>

      <ContentContainer>
        <RowContainer reverseorderonmobile='true'>
          <ColumnContainer md={6}>
            <div>
              <SectionHeading>Launch a Campaign</SectionHeading>
              <SectionSubheading>Get your Project funded</SectionSubheading>
              <Paragraph>
                Raise capital to build your marketplace and fund the growth of your ecosystem.
                <br />
                <br />
                Invest in the development of innovative products and services, such Impact Oracles, that serve the
                broader ecosystem.
                <br />
                <br />
                <em>
                  The Launchpad aims to connect Founders with investors, developers, marketing agents, legal and
                  regulatory compliance services.
                </em>
              </Paragraph>
            </div>
          </ColumnContainer>
          <NoPaddingColumnContainer md={6}>
            <MediaQuery maxWidth={`${deviceWidth.desktop}px`}>
              <CampaignAnimationContainer>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: campaignAnimation,
                  }}
                  height='100%'
                  width='100%'
                />
              </CampaignAnimationContainer>
            </MediaQuery>
            <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
              <SplashCards />
            </MediaQuery>
          </NoPaddingColumnContainer>
        </RowContainer>
      </ContentContainer>
    </div>
  )
}

export default SplashLaunchSection
