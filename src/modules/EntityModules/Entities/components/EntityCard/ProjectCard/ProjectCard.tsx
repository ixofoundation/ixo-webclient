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
  StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue,
  Logo,
  Flag,
} from './ProjectCard.styles'
import { EntityCardContainer } from '../EntityCardContainer'
import { ShieldColor } from '../EntityCardContainer.styles'
import Star from 'assets/icons/Star'
import flagged from '../../../../../../assets/images/flagged.svg'

export interface Props {
  projectData: any
  projectDid: string
  title: string
  shortDescription: string
  imageUrl: string
  founderLogoUrl: string
  sdgs: number[]
  requiredClaims: number
  successfulClaims: number
  rejectedClaims: number
  impactAction: string
  version: number
  fundedCount: number
  activeUsage: number
  ratingScore: number
  ratingCount: number
}

export const ProjectCard: React.FunctionComponent<Props> = ({
  projectData,
  projectDid,
  title,
  shortDescription,
  imageUrl,
  founderLogoUrl,
  sdgs,
  requiredClaims,
  successfulClaims,
  rejectedClaims,
  impactAction,
  version,
  fundedCount,
  activeUsage,
  ratingScore,
  ratingCount,
}) => {
  return (
    <EntityCardContainer
      projectData={projectData}
      projectDid={projectDid}
      title={title}
      shortDescription={shortDescription}
      imageUrl={imageUrl}
      founderLogoUrl={founderLogoUrl}
      status=""
      sdgs={sdgs}
      shield="Project"
      shieldLabel="Template"
      shieldColor={ShieldColor.Blue}
    >
      <MainContent>
        <Title>{excerptText(title, 10)}</Title>
      </MainContent>

      <Flag src={flagged} />

      <StatisticsContainer>
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
      </StatisticsContainer>
      <ProgressBar
        total={requiredClaims}
        approved={successfulClaims}
        rejected={rejectedClaims}
      />
      <Progress>
        <ProgressSuccessful>{successfulClaims}</ProgressSuccessful>
        <ProgressRequired>/{requiredClaims}</ProgressRequired>
      </Progress>
      <Logo src={founderLogoUrl} />
      <Impact>{impactAction}</Impact>
    </EntityCardContainer>
  )
}
