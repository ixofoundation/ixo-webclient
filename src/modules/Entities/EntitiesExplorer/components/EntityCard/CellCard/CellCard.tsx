import * as React from 'react'
import { excerptText, toTitleCase } from 'common/utils/formatters'
import {
  Title,
  Founded,
  FoundedDate,
  MainContent,
  /*   StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue, */
  Logo,
} from './CellCard.styles'
import { Moment } from 'moment'
import { EntityCardContainer } from '../EntityCardContainer'
import { ShieldColor } from '../EntityCardContainer.styles'

export interface Props {
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

export const CellCard: React.FunctionComponent<Props> = ({
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
    <EntityCardContainer
      did={did}
      name={name}
      description={description}
      image={image}
      logo={logo}
      status={status}
      sdgs={sdgs}
      shieldColor={shieldColor}
      shield={shield}
      shieldLabel="Status"
    >
      <MainContent>
        <Logo src={logo} />
        <Title>{excerptText(name, 10)}</Title>
        <Founded>
          Founded in{' '}
          <FoundedDate>{dateCreated.format('DD MMM YYYY')}</FoundedDate>
        </Founded>
      </MainContent>
      {/*       <StatisticsContainer>
        <Statistic>
          <StatisticValue>{memberCount}</StatisticValue>{' '}
          <StatisticLabel>members</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{projectCount}</StatisticValue>{' '}
          <StatisticLabel>projects</StatisticLabel>
        </Statistic>
      </StatisticsContainer> */}
    </EntityCardContainer>
  )
}
