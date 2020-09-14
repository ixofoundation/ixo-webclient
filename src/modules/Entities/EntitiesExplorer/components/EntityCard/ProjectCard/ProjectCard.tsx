import * as React from 'react'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText } from 'common/utils/formatters'
import {
  MainContent,
  Title,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Impact,
  /*   StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue, */
  Logo,
  Flag,
} from './ProjectCard.styles'
import { EntityCardContainer } from '../EntityCardContainer'
import { ShieldColor } from '../EntityCardContainer.styles'
// import Star from 'assets/icons/Star'
import flagged from '../../../../../../assets/images/flagged.svg'

export interface Props {
  did: string
  name: string
  description: string
  image: string
  logo: string
  sdgs: string[]
  requiredClaims: number
  successfulClaims: number
  rejectedClaims: number
  goal: string
  // TODO when data exists
  /*   fundedCount: number
  version: string
  activeUsage: number
  ratingScore: number
  ratingCount: number */
}

export const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  description,
  image,
  logo,
  sdgs,
  requiredClaims,
  successfulClaims,
  rejectedClaims,
  goal: impactAction,
  /*   fundedCount,
  version,
  activeUsage,
  ratingScore,
  ratingCount, */
}) => {
  return (
    <EntityCardContainer
      did={did}
      name={name}
      description={description}
      image={image}
      logo={logo}
      status=""
      sdgs={sdgs}
      shield="Project"
      shieldLabel="Template"
      shieldColor={ShieldColor.Blue}
    >
      <MainContent>
        <Title>{excerptText(name, 10)}</Title>
      </MainContent>

      <Flag src={flagged} />

      {/*       <StatisticsContainer>
        <Statistic>
          <StatisticValue>{version}</StatisticValue>
          <StatisticLabel>Funded ({fundedCount})</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{activeUsage}</StatisticValue>
          <StatisticLabel>Alpha</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>
            {ratingScore}
            <Star fill="#E8EDEE" width="20" />
          </StatisticValue>
          <StatisticLabel>Rating ({ratingCount})</StatisticLabel>
        </Statistic>
      </StatisticsContainer> */}
      <ProgressBar
        total={requiredClaims}
        approved={successfulClaims}
        rejected={rejectedClaims}
      />
      <Progress>
        <ProgressSuccessful>{successfulClaims}</ProgressSuccessful>
        <ProgressRequired>/{requiredClaims}</ProgressRequired>
      </Progress>
      <Logo src={logo} />
      <Impact>{impactAction}</Impact>
    </EntityCardContainer>
  )
}
