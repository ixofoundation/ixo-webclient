import * as React from 'react'
import { Moment } from 'moment'
import { excerptText, toTitleCase } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  CardBottomHeadingContainer,
  ShieldContainer,
  ShieldLabel,
  Shield,
  ShieldText,
  ShieldColor,
  MainContent,
  StatisticsContainer,
} from '../EntityCard.styles'
import {
  FoundedDate,
  Title,
  Founded,
  Statistic,
  StatisticLabel,
  StatisticValue,
  Logo,
} from './CellCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'

interface Props {
  dateCreated: Moment
  // TODO when data exists
  /*   memberCount: number
  projectCount: number */
  did: string
  name: string
  description: string
  image: string
  logo: string
  status: string
  sdgs: string[]
}

const CellCard: React.FunctionComponent<Props> = ({
  dateCreated,
  /*   memberCount,
  projectCount, */
  did,
  name,
  description,
  image,
  logo,
  status,
  sdgs,
}) => {
  const shield = toTitleCase(status)

  let shieldColor
  switch (shield) {
    case 'Created':
      shieldColor = ShieldColor.Orange
      break
    case 'Completed':
      shieldColor = ShieldColor.Grey
      break
  }

  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop>
          <CardTopContainer
            style={{
              backgroundImage: `url(${image}),url(${require('assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGIcons sdgs={sdgs} />
            <Description>
              <p>{excerptText(description, 20)}</p>
            </Description>
          </CardTopContainer>
        </CardTop>
        <CardBottom>
          <CardBottomHeadingContainer>
            <ShieldContainer>
              <ShieldLabel>
                <ShieldText>Status</ShieldText>
              </ShieldLabel>
              <Shield className={shieldColor}>
                <ShieldText>{toTitleCase(shield)}</ShieldText>
              </Shield>
            </ShieldContainer>
          </CardBottomHeadingContainer>
          <MainContent>
            <Logo src={logo} />
            <Title>{excerptText(name, 10)}</Title>
            <Founded>
              Founded in{' '}
              <FoundedDate>{dateCreated.format('DD MMM YYYY')}</FoundedDate>
            </Founded>
          </MainContent>
          <StatisticsContainer className="row">
            <Statistic className="col-6">
              {/* TODO - replace with actual value */}
              <StatisticValue>12</StatisticValue>{' '}
              <StatisticLabel>members</StatisticLabel>
            </Statistic>
            <Statistic className="col-6">
              {/* TODO - replace with actual value */}
              <StatisticValue>22</StatisticValue>{' '}
              <StatisticLabel>projects</StatisticLabel>
            </Statistic>
          </StatisticsContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default CellCard
