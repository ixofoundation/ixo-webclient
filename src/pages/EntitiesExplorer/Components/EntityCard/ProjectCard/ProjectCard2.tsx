import * as React from 'react'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'
import { excerptText, thousandSeparator } from 'utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  MainContent,
  Title,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  StatisticLabel,
  Logo,
} from '../EntityCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import Shield, { ShieldColor } from '../Shield/Shield'
import flagged from 'assets/images/flagged.svg'
import { useAppSelector } from 'redux/hooks'
import { selectEntityPrimaryColor } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { requireCheckDefault } from 'utils/images'
import { TEntityClaimModel, TEntityDDOTagModel, TEntityProfileModel } from 'types/entities'

interface Props {
  id: string
  profile: TEntityProfileModel
  tags: TEntityDDOTagModel[]
  claim?: { [id: string]: TEntityClaimModel }
}

const ProjectCard: React.FunctionComponent<Props> = ({ id, profile, tags, claim = {} }) => {
  const sdgs = tags ? tags.find((item) => item && item.category === 'SDG' && Array.isArray(item.tags))?.tags ?? [] : []
  const primaryColor = useAppSelector(selectEntityPrimaryColor)
  // const submittedCount = pendingClaimsCount + successfulClaimsCount + rejectedClaimsCount + disputedClaimsCount
  const headlineMetric: TEntityClaimModel | undefined = Object.values(claim).find((v) => v.isHeadlineMetric)
  const maxSubmissions = headlineMetric?.submissions?.maximum ?? 0

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
          <div className='row'>
            <div className='col-6'>
              <Shield label='Status' text={'Created'} color={primaryColor ?? ShieldColor.Blue} />
            </div>
            <div className='col-6 text-right'>
              <img src={flagged} alt='Flag' />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(profile?.name, 10)}</Title>
          </MainContent>
          {/*  <StatisticsContainer className="row">
            <div className="col-4">
              <StatisticValue>68%</StatisticValue>
              <StatisticLabel>Funded</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>16</StatisticValue>
              <StatisticLabel>Alpha</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>
                3.5 <Star fill="#E8EDEE" width="20" />
              </StatisticValue>
              <StatisticLabel>Rating (380)</StatisticLabel>
            </div>
          </StatisticsContainer> */}
          <ProgressBar total={0} pending={0} approved={0} rejected={0} disputed={0} />
          <Progress>
            <ProgressSuccessful>{thousandSeparator(0, ',')}</ProgressSuccessful>
            <ProgressRequired>/{thousandSeparator(maxSubmissions, ',')}</ProgressRequired>
          </Progress>
          <Logo src={profile?.logo} />
          <StatisticLabel>{'Impact Action'}</StatisticLabel>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
