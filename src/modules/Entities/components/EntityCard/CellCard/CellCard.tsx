import * as React from 'react'
import { excerptText } from '../../../../../common/utils/formatters'
import {
  Title,
  Founded,
  FoundedDate,
  MainContent,
  StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from './CellCard.styles'
import { Moment } from 'moment'
import { EntityCardContainer } from '../EntityCardContainer'

export interface Props {
  dateCreated: Moment
  memberCount: number
  projectCount: number
  projectData: any
  projectDid: string
  title: string
  shortDescription: string
  imageUrl: string
  founderLogoUrl: string
  status: string
  sdgs: number[]
}

export const CellCard: React.FunctionComponent<Props> = ({
  dateCreated,
  memberCount,
  projectCount,
  projectData,
  projectDid,
  title,
  shortDescription,
  imageUrl,
  founderLogoUrl,
  status,
  sdgs,
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
        <Founded>
          Founded in{' '}
          <FoundedDate>{dateCreated.format('DD MMM YYYY')}</FoundedDate>
        </Founded>
      </MainContent>
      <StatisticsContainer>
        <Statistic>
          <StatisticValue>{memberCount}</StatisticValue>{' '}
          <StatisticLabel>members</StatisticLabel>
        </Statistic>
        <Statistic>
          <StatisticValue>{projectCount}</StatisticValue>{' '}
          <StatisticLabel>projects</StatisticLabel>
        </Statistic>
      </StatisticsContainer>
    </EntityCardContainer>
  )
}
