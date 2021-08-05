import * as React from 'react'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardBottom,
  MainContent,
  Title,
  StatisticsContainer,
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
} from '../EntityCard.styles'
// import Star from 'assets/icons/Star'
import { TermsOfUseType } from 'modules/Entities/types'
import { termsOfUseTypeStrategyMap } from 'modules/Entities/strategy-map'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import Shield, { ShieldColor } from '../Shield/Shield'
import Badges from '../Badges/Badges'
import { DDOTagCategory } from 'modules/Entities/EntitiesExplorer/types'

interface Props {
  did: string
  name: string
  creatorLogo: string
  termsType: TermsOfUseType
  badges: string[]
  version: string
  ddoTags: DDOTagCategory[]
}

const TemplateCard: React.FunctionComponent<Props> = ({
  did,
  name,
  creatorLogo,
  termsType,
  badges,
  version,
  ddoTags,
}) => {
  const termsOfUseMap = termsOfUseTypeStrategyMap[termsType]

  let templateType = 'Template'
  if (ddoTags.length) {
    const ddoTag = ddoTags.find((category) => category.name === 'Entity')
    if (ddoTag) {
      templateType = ddoTag.tags[0]
    }
  }

  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `/projects/${did}/overview`,
        }}
      >
        <CardTop
          style={{
            backgroundImage: `url(${require('assets/images/ixo-placeholder-large.jpg')})`,
          }}
        ></CardTop>
        <CardBottom>
          <div className="row">
            <div className="col-6">
              <Shield
                label="Template"
                text={templateType}
                color={ShieldColor.Maroon}
              />
            </div>
            <div className="col-6 text-right">
              <Badges badges={badges} />
            </div>
          </div>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className="row">
            <div className="col-4">
              <StatisticValue>{version}</StatisticValue>
              <StatisticLabel>Version</StatisticLabel>
            </div>
            {/* <div className="col-4">
              <StatisticValue>123</StatisticValue>
              <StatisticLabel>Instances</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>
                4 <Star fill="#E8EDEE" width="20" />
              </StatisticValue>
              <StatisticLabel>Rating (380)</StatisticLabel>
            </div> */}
          </StatisticsContainer>
          <CardBottomLogoContainer className="row">
            <div className="col-6">
              <Tooltip
                text={termsOfUseMap.title}
                position={TooltipPosition.Bottom}
              >
                {React.createElement(termsOfUseMap.icon, {
                  width: 34,
                  fill: 'black',
                })}
              </Tooltip>
            </div>
            <div className="col-6 text-right">
              <Logo src={creatorLogo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default TemplateCard
