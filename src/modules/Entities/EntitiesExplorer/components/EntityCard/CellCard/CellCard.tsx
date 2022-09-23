import * as React from 'react'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText, thousandSeparator } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  Description,
  CardBottom,
  MainContent,
  MultiLineTitle,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Logo,
  StatisticLabel,
} from '../EntityCard.styles'
import SDGIcons from '../SDGIcons/SDGIcons'
import Shield from '../Shield/Shield'
import { theme } from 'modules/App/App.styles'

interface Props {
  did: string
  name: string
  description: string
  image: string
  logo: string
  sdgs: string[]
  requiredClaimsCount: number
  pendingClaimsCount: number
  successfulClaimsCount: number
  rejectedClaimsCount: number
  disputedClaimsCount: number
  goal: string
  status: string
  // TODO when data exists
  /*   fundedCount: number
  version: string
  activeUsage: number
  ratingScore: number
  ratingCount: number */
}

const DAOCard: React.FunctionComponent<Props> = ({
  did,
  name,
  description,
  image,
  logo,
  sdgs,
  requiredClaimsCount,
  pendingClaimsCount,
  successfulClaimsCount,
  rejectedClaimsCount,
  disputedClaimsCount,
  goal: impactAction,
  /*   fundedCount,
  version,
  activeUsage,
  ratingScore,
  ratingCount, */
}) => {
  const submittedCount =
    pendingClaimsCount +
    successfulClaimsCount +
    rejectedClaimsCount +
    disputedClaimsCount
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
          <div className="d-flex" style={{ gap: 10 }}>
            <Shield label="DAO" text="Group" color={theme.ixoGreen} />
            <Shield label="DAO" text="Treasury" color={theme.ixoGreen} />
          </div>
          <MainContent>
            <MultiLineTitle fontWeight={700}>{name}</MultiLineTitle>
          </MainContent>
          <ProgressBar
            total={requiredClaimsCount}
            pending={pendingClaimsCount}
            approved={successfulClaimsCount}
            rejected={rejectedClaimsCount}
            disputed={disputedClaimsCount}
          />
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Progress>
                <ProgressSuccessful>
                  {thousandSeparator(submittedCount, ',')}
                </ProgressSuccessful>
                <ProgressRequired>
                  /{thousandSeparator(requiredClaimsCount, ',')}
                </ProgressRequired>
              </Progress>
              <StatisticLabel>{impactAction}</StatisticLabel>
            </div>
            <Logo src={logo} />
          </div>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default DAOCard
