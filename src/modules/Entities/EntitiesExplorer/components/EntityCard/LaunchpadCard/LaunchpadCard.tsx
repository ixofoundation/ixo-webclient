import * as React from 'react'
import { ProgressBar } from 'common/components/ProgressBar'
import { excerptText } from 'common/utils/formatters'
import {
  CardContainer,
  CardLink,
  CardTop,
  CardTopContainer,
  CardBottom,
} from '../EntityCard.styles'

import {
  ActionButton,
  Title,
  Progress,
  ProgressSuccessful,
  ProgressRequired,
  Label,
} from './LaunchpadCard.styles'

import Shield from '../Shield/Shield'

interface Props {
  did: string
  name: string
  status: string
  requiredClaimsCount: number
  successfulClaimsCount: number
  rejectedClaimsCount: number
  goal: string
}

const ProjectCard: React.FunctionComponent<Props> = ({
  did,
  name,
  status,
  requiredClaimsCount: requiredClaims,
  successfulClaimsCount: successfulClaims,
  rejectedClaimsCount: rejectedClaims,
}) => {
  // const statuses = ['Candidate', 'Selected', 'Not Selected']
  const colors = {
    CREATED: '#39C3E6',
    Candidate: '#39C3E6',
    Selected: '#52A675',
    'Not Selected': '#E85E15',
  }
  // const colors = ['#39C3E6', '#52A675', '#E85E15']
  const buttonTexts = {
    Candidate: 'VOTE NOW',
    Selected: 'GET REWARD',
    'Not Selected': 'UNSTAKE',
  }
  // const buttonTexts = ['VOTE NOW', 'GET REWARD', 'UNSTAKE']
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
              background: `url(${require('assets/images/launchpad-image.png')})`,
              backgroundColor: '#387F6A',
            }}
          ></CardTopContainer>
        </CardTop>
        <CardBottom>
          <div
            className="row align-items-center"
            style={{ paddingLeft: 16, paddingRight: 16 }}
          >
            <Shield
              label="Status"
              text={status ? status.toLowerCase() : 'Created'}
              color={colors[status]}
            />

            {status !== 'CREATED' && (
              <ActionButton>{buttonTexts[status]}</ActionButton>
            )}

            <img
              alt=""
              src={require('assets/images/yoma.png')}
              className="ml-auto"
            />
          </div>
          <Title>{excerptText(name, 10)}</Title>
          <ProgressBar
            total={requiredClaims}
            approved={successfulClaims}
            rejected={rejectedClaims}
            activeBarColor="linear-gradient(180deg, #04D0FB 0%, #49BFE0 100%)"
          />
          <Progress>
            <ProgressSuccessful>{successfulClaims}</ProgressSuccessful>
            <ProgressRequired>/{requiredClaims}</ProgressRequired>
          </Progress>
          <Label>Votes</Label>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
