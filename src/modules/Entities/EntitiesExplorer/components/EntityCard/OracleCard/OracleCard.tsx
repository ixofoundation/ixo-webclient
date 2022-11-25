import * as React from 'react'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardBottom,
  MainContent,
  Title,
  StatisticsContainer,
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
  Description,
  CardTop,
  CardTopContainer,
} from '../EntityCard.styles'
import { TermsOfUseType } from 'modules/Entities/types'
import { termsOfUseTypeStrategyMap } from 'modules/Entities/strategy-map'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import SDGIcons from '../SDGIcons/SDGIcons'
import Star from 'assets/icons/Star'
import Shield, { ShieldColor } from '../Shield/Shield'
import Badges from '../Badges/Badges'

interface Props {
  did: string
  name: string
  logo: string
  sdgs: string[]
  image: string
  description: string
  termsType: TermsOfUseType
  badges: string[]
}

const OracleCard: React.FunctionComponent<Props> = ({
  did,
  name,
  logo,
  image,
  sdgs,
  description,
  termsType,
  badges,
}) => {
  const termsOfUseMap = termsOfUseTypeStrategyMap[termsType]

  return (
    <CardContainer className='col-xl-4 col-md-6 col-sm-12 col-12'>
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg').default})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <div className='row'>
            <div className='col-6'>
              <Shield label='Oracle' text='Verification' color={ShieldColor.Maroon} />
            </div>
            <div className='col-6 text-right'>
              <Badges badges={badges} />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className='row'>
            <div className='col-4'>
              <StatisticValue>4.3k</StatisticValue>
              <StatisticLabel>Calls</StatisticLabel>
            </div>
            <div className='col-4'>
              <StatisticValue>99%</StatisticValue>
              <StatisticLabel>Success</StatisticLabel>
            </div>
            <div className='col-4'>
              <StatisticValue>
                3.5 <Star fill='#E8EDEE' width='20' />
              </StatisticValue>
              <StatisticLabel>Rating (380)</StatisticLabel>
            </div>
          </StatisticsContainer>
          <CardBottomLogoContainer className='row'>
            <div className='col-6'>
              {termsOfUseMap && (
                <Tooltip text={termsOfUseMap.title} position={TooltipPosition.Bottom}>
                  {React.createElement(termsOfUseMap.icon, {
                    width: 34,
                    fill: 'black',
                  })}
                </Tooltip>
              )}
            </div>
            <div className='col-6 text-right'>
              <Logo src={logo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default OracleCard
