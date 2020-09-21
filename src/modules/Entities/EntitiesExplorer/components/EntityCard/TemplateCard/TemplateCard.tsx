import * as React from 'react'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardBottom,
  CardBottomHeadingContainer,
  ShieldContainer,
  ShieldLabel,
  Shield,
  ShieldText,
  ShieldColor,
  MainContent,
  Title,
  StatisticsContainer,
} from '../EntityCard.styles'
import {
  Logo,
  StatisticLabel,
  StatisticValue,
  CardBottomLogoContainer,
} from './TemplateCard.styles'
import Star from 'assets/icons/Star'

interface Props {
  did: string
  name: string
  logo: string
}

const TemplateCard: React.FunctionComponent<Props> = ({ name, logo }) => {
  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: '/', // TODO
        }}
      >
        <CardBottom>
          <CardBottomHeadingContainer>
            <ShieldContainer>
              <ShieldLabel>
                <ShieldText>Template</ShieldText>
              </ShieldLabel>
              <Shield className={ShieldColor.Maroon}>
                <ShieldText>Project</ShieldText>
              </Shield>
            </ShieldContainer>
          </CardBottomHeadingContainer>
          <MainContent>
            <Title>{excerptText(name, 10)}</Title>
          </MainContent>
          <StatisticsContainer className="row">
            <div className="col-4">
              <StatisticValue>1.1</StatisticValue>
              <StatisticLabel>Version</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>123</StatisticValue>
              <StatisticLabel>Instances</StatisticLabel>
            </div>
            <div className="col-4">
              <StatisticValue>
                4 <Star fill="#E8EDEE" width="20" />
              </StatisticValue>
              <StatisticLabel>Rating (380)</StatisticLabel>
            </div>
          </StatisticsContainer>
          <CardBottomLogoContainer className="row">
            <div className="col-6">foo</div>
            <div className="col-6">
              <Logo src={logo} />
            </div>
          </CardBottomLogoContainer>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default TemplateCard
