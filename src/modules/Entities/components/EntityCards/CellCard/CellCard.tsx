import * as React from 'react'
import { SDGArray } from '../../../../../lib/commonData'
import {
  excerptText,
  toTitleCase,
} from '../../../../../common/utils/formatters'
import {
  Title,
  Founded,
  FoundedDate,
  Description,
  SDGs,
  CardTop,
  CardTopContainer,
  CardBottom,
  StatusContainer,
  StatusText,
  Status,
  StatusLabel,
  CardContainer,
  CardLink,
  CardBottomTopContainer,
  Logo,
  LogoContainer,
  CardBottomMiddleContainer,
  StatisticsContainer,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from './CellCard.styles'
import { Moment } from 'moment'

export interface Props {
  projectData: any // TEMP until projects gets it's own data from redux instead of storing it in some weird link state
  projectDid: string
  dateCreated: Moment
  title: string
  shortDescription: string
  requiredClaims: number
  successfulClaims: number
  rejectedClaims: number
  impactAction: string
  imageUrl: string
  founderLogoUrl: string
  status: string
  sdgs: number[]
}

export class CellCard extends React.Component<Props, {}> {
  getProjectStatus = (): JSX.Element => {
    const { status } = this.props
    const statusType = status === 'CREATED' ? 'PENDING' : status

    if (status === 'CREATED' || status === 'COMPLETED') {
      return (
        <StatusContainer>
          <StatusLabel>
            <StatusText>Status</StatusText>
          </StatusLabel>
          <Status className={statusType}>
            <StatusText>{toTitleCase(statusType)}</StatusText>
          </Status>
        </StatusContainer>
      )
    }

    return null
  }

  getSDGIcons = (): JSX.Element => {
    return (
      <>
        {this.props.sdgs.map((sdg, index) => {
          if (Math.floor(sdg) > 0 && Math.floor(sdg) <= SDGArray.length) {
            return (
              <i
                key={index}
                className={`icon-sdg-${SDGArray[Math.floor(sdg) - 1].ico}`}
              />
            )
          }

          return null
        })}
      </>
    )
  }

  render(): JSX.Element {
    return (
      <CardContainer className="col-10 offset-1 col-xl-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0">
        <CardLink
          to={{
            pathname: `/projects/${this.props.projectDid}/overview`,
            state: {
              projectPublic: this.props.projectData,
              imageLink: this.props.imageUrl,
              projectStatus: this.props.status,
            },
          }}
        >
          <CardTop>
            <CardTopContainer
              style={{
                backgroundImage: `url(${
                  this.props.imageUrl
                }),url(${require('../../../../../assets/images/ixo-placeholder-large.jpg')})`,
              }}
            >
              <SDGs>{this.getSDGIcons()}</SDGs>
              <Description>
                <p>{excerptText(this.props.shortDescription, 20)}</p>
              </Description>
            </CardTopContainer>
          </CardTop>
          <CardBottom>
            <CardBottomTopContainer>
              {this.getProjectStatus()}
              <LogoContainer>
                <Logo src={this.props.founderLogoUrl} width="34" />
              </LogoContainer>
            </CardBottomTopContainer>
            <CardBottomMiddleContainer>
              <Title>{excerptText(this.props.title, 10)}</Title>
              <Founded>
                Founded in{' '}
                <FoundedDate>
                  {this.props.dateCreated.format('DD MMM YYYY')}
                </FoundedDate>
              </Founded>
            </CardBottomMiddleContainer>
            <StatisticsContainer>
              <Statistic>
                <StatisticValue>162</StatisticValue>{' '}
                <StatisticLabel>members</StatisticLabel>
              </Statistic>
              <Statistic>
                <StatisticValue>3</StatisticValue>{' '}
                <StatisticLabel>projects</StatisticLabel>
              </Statistic>
            </StatisticsContainer>
          </CardBottom>
        </CardLink>
      </CardContainer>
    )
  }
}
