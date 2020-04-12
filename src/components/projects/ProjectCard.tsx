import * as React from 'react'
import { SDGArray } from '../../lib/commonData'
import { ProgressBar } from '../common/ProgressBar'
import { excerptText } from '../../common/utils/formatters'
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
} from './ProjectsCard.styles'

export interface Props {
  project: any
  did: string
  ixo?: any
  status: string
}

export class ProjectCard extends React.Component<Props, {}> {
  state = {}

  fetchImage = (): void => {
    if (this.props.project.imageLink && this.props.project.imageLink !== '') {
      this.setState({
        imageLink:
          this.props.project.serviceEndpoint +
          'public/' +
          this.props.project.imageLink,
      })
    }
  }

  getImageLink = (): string => {
    return (
      this.props.project.serviceEndpoint +
      'public/' +
      this.props.project.imageLink
    )
  }

  projectStatus = (): JSX.Element => {
    let statusType = ''
    let shouldShow = false

    if (this.props.status === 'CREATED') {
      statusType = 'PENDING' // 'WAITING FOR FUNDS'
      shouldShow = true
    } else if (this.props.status === 'COMPLETED') {
      statusType = 'COMPLETED'
      shouldShow = true
    }
    if (shouldShow === true) {
      return (
        <ProjectStatus className={statusType}>
          <StatusText>{statusType}</StatusText>
        </ProjectStatus>
      )
    } else {
      return null
    }
  }

  componentDidMount(): void {
    this.fetchImage()
  }

  render(): JSX.Element {
    return (
      <CardContainer className="col-10 offset-1 col-xl-4 col-md-6 col-sm-10 offset-sm-1 offset-md-0">
        <ProjectLink
          to={{
            pathname: `/projects/${this.props.did}/overview`,
            state: {
              projectPublic: this.props.project,
              imageLink: this.getImageLink(),
              projectStatus: this.props.status,
            },
          }}
        >
          <CardTop
            style={{
              backgroundImage: `url(${this.getImageLink()}),url(${require('../../assets/images/ixo-placeholder-large.jpg')})`,
            }}
          >
            <SDGs>
              {this.props.project.sdgs.map((SDG, SDGi) => {
                if (Math.floor(SDG) > 0 && Math.floor(SDG) <= SDGArray.length) {
                  return (
                    <i
                      key={SDGi}
                      className={`icon-sdg-${
                        SDGArray[Math.floor(SDG) - 1].ico
                      }`}
                    />
                  )
                } else {
                  return null
                }
              })}
            </SDGs>
            <Description>
              <p>{excerptText(this.props.project.shortDescription, 20)}</p>
            </Description>
          </CardTop>
          <CardBottom>
            <StatusContainer>{this.projectStatus()}</StatusContainer>
            <div>
              <Title>{excerptText(this.props.project.title, 10)}</Title>
              <Owner>By {this.props.project.ownerName}</Owner>
            </div>
            {this.props.project.requiredClaims === 0 ? (
              <p>Project is launching in 2019</p>
            ) : (
              <div>
                <ProgressBar
                  total={this.props.project.requiredClaims}
                  approved={this.props.project.claimStats.currentSuccessful}
                  rejected={this.props.project.claimStats.currentRejected}
                />
                <Progress>
                  {this.props.project.claimStats.currentSuccessful} /{' '}
                  <strong>{this.props.project.requiredClaims}</strong>
                </Progress>
                <Impact>{this.props.project.impactAction}</Impact>
              </div>
            )}
          </CardBottom>
        </ProjectLink>
      </CardContainer>
    )
  }
}
