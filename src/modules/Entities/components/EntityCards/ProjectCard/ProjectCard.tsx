import * as React from 'react'
import { SDGArray } from '../../../../../lib/commonData'
import { ProgressBar } from '../../../../../components/common/ProgressBar'
import { excerptText } from '../../../../../common/utils/formatters'
import {
  Title,
  Owner,
  Description,
  Progress,
  Impact,
  SDGs,
  CardTop,
  CardBottom,
  StatusContainer,
  StatusText,
  ProjectStatus,
  CardContainer,
  ProjectLink,
} from './ProjectCard.styles'

export interface Props {
  projectData: any // TEMP until projects gets it's own data from redux instead of storing it in some weird link state
  projectDid: string
  ownerName: string
  title: string
  shortDescription: string
  requiredClaims: number
  successfulClaims: number
  rejectedClaims: number
  impactAction: string
  imageUrl: string
  status: string
  sdgs: number[]
}

export class ProjectCard extends React.Component<Props, {}> {
  getProjectStatus = (): JSX.Element => {
    const { status } = this.props
    const statusType = status === 'CREATED' ? 'PENDING' : status

    if (status === 'CREATED' || status === 'COMPLETED') {
      return (
        <ProjectStatus className={statusType}>
          <StatusText>{statusType}</StatusText>
        </ProjectStatus>
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

  getProgress = (): JSX.Element => {
    const {
      requiredClaims,
      successfulClaims,
      rejectedClaims,
      impactAction,
    } = this.props

    return requiredClaims === 0 ? (
      <p>Project is launching in 2019</p>
    ) : (
      <div>
        <ProgressBar
          total={requiredClaims}
          approved={successfulClaims}
          rejected={rejectedClaims}
        />
        <Progress>
          {successfulClaims} / <strong>{requiredClaims}</strong>
        </Progress>
        <Impact>{impactAction}</Impact>
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <CardContainer className="col-10 offset-1 col-xl-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0">
        <ProjectLink
          to={{
            pathname: `/projects/${this.props.projectDid}/overview`,
            state: {
              projectPublic: this.props.projectData,
              imageLink: this.props.imageUrl,
              projectStatus: this.props.status,
            },
          }}
        >
          <CardTop
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
          </CardTop>
          <CardBottom>
            <StatusContainer>{this.getProjectStatus()}</StatusContainer>
            <div>
              <Title>{excerptText(this.props.title, 10)}</Title>
              <Owner>By {this.props.ownerName}</Owner>
            </div>
            {this.getProgress()}
          </CardBottom>
        </ProjectLink>
      </CardContainer>
    )
  }
}
