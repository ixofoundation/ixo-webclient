import * as React from 'react'
import { excerptText } from 'utils/formatters'
import {
  CardContainer,
  CardLink,
  CardBottom,
  StatisticsContainer,
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
  Description,
  CardTop,
  CardTopContainer,
  CardTags,
  CardTag,
  MultiLineTitle,
  MainContent,
} from '../EntityCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import Star from 'assets/icons/Star'
import { requireCheckDefault } from 'utils/images'
import { TEntityDDOTagModel, TEntityProfileModel } from 'types/entities'
import { useTheme } from 'styled-components'

interface Props {
  id: string
  profile: TEntityProfileModel
  tags: TEntityDDOTagModel[]
}

const OracleCard: React.FunctionComponent<Props> = ({ id, profile, tags }) => {
  const theme: any = useTheme()
  const sdgs = tags?.find(({ category }) => category === 'SDG')?.tags ?? []

  return (
    <CardContainer>
      <CardLink
        to={{
          pathname: `/entity/${id}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${profile?.image}),url(${requireCheckDefault(
                require('assets/images/ixo-placeholder-large.jpg'),
              )})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(profile?.description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <CardTags>
            <CardTag tagColor={theme.ixoDarkRed}>Oracle</CardTag>
          </CardTags>
          <MainContent>
            <MultiLineTitle>{excerptText(profile?.name, 10)}</MultiLineTitle>
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
              {/* {termsOfUseMap && (
                <Tooltip text={termsOfUseMap.title} position={TooltipPosition.Bottom}>
                  {React.createElement(termsOfUseMap.icon, {
                    width: 34,
                    fill: 'black',
                  })}
                </Tooltip>
              )} */}
              Terms Of Use
            </div>
            <div className='col-6 text-right'>
              <Logo src={profile?.logo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default OracleCard
