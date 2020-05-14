import * as React from 'react'
import { ProgressBar } from '../../../../../components/common/ProgressBar'
import { excerptText } from '../../../../../common/utils/formatters'
import {
  Title,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Impact,
} from './ProjectCard.styles'
import { EntityCardContainer } from '../EntityCardContainer'
import {
  MainContent,
  StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from './ProjectCard.styles'

export interface Props {
  projectData: any
  projectDid: string
  title: string
  shortDescription: string
  imageUrl: string
  founderLogoUrl: string
  status: string
  sdgs: number[]
  requiredClaims: number
  successfulClaims: number
  rejectedClaims: number
  impactAction: string
  version: number
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
  status,
  sdgs,
  requiredClaims,
  successfulClaims,
  rejectedClaims,
  impactAction,
  version,
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
      status={status}
      sdgs={sdgs}
    >
      <MainContent>
        <Title>{excerptText(title, 10)}</Title>
      </MainContent>
      <StatisticsContainer>
        <Statistic>
          <StatisticValue>{version}</StatisticValue>
          <StatisticLabel>Version</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{activeUsage}</StatisticValue>
          <StatisticLabel>Active Usage</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{ratingScore}</StatisticValue>
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
      <Impact>{impactAction}</Impact>
    </EntityCardContainer>
  )
}
