import * as React from 'react'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText } from 'common/utils/formatters'
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
  Title,
} from '../EntityCard.styles'
import {
  Impact,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Logo,
  Flag,
  /*   StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue, */
} from './ProjectCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
// import Star from 'assets/icons/Star'
import flagged from '../../../../../../assets/images/flagged.svg'

interface Props {
  did: string
  name: string
  description: string
  image: string
  logo: string
  sdgs: string[]
  requiredClaimsCount: number
  successfulClaimsCount: number
  rejectedClaimsCount: number
  goal: string
  // TODO when data exists
  /*   fundedCount: number
  version: string
  activeUsage: number
  ratingScore: number
  ratingCount: number */
}

const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  description,
  image,
  logo,
  sdgs,
  requiredClaimsCount: requiredClaims,
  successfulClaimsCount: successfulClaims,
  rejectedClaimsCount: rejectedClaims,
  goal: impactAction,
  /*   fundedCount,
  version,
  activeUsage,
  ratingScore,
  ratingCount, */
}) => {
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
                <ShieldText>Template</ShieldText>
              </ShieldLabel>
              <Shield className={ShieldColor.Blue}>
                <ShieldText>Project</ShieldText>
              </Shield>
            </ShieldContainer>
          </CardBottomHeadingContainer>
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
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
