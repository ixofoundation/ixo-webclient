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
  MainContent,
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

const ProjectCard: React.FunctionComponent = () => {
  const statuses = ['Candidate', 'Selected', 'Not Selected']
  const colors = ['#39C3E6', '#52A675', '#E85E15']
  const buttonTexts = ['VOTE NOW', 'GET REWARD', 'UNSTAKE']
  const index = Math.floor(Math.random() * 10) % 3
  return (
    <CardContainer className="col-xl-4 col-md-6 col-sm-12 col-12">
      <CardLink
        to={{
          pathname: `#`,
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
              text={statuses[index]}
              color={colors[index]}
            />

            <ActionButton>{buttonTexts[index]}</ActionButton>
            <img src={require('assets/images/yoma.png')} className="ml-auto" />
          </div>
          <Title>Yoma</Title>
          <ProgressBar
            total={300}
            approved={100}
            rejected={0}
            activeBarColor="linear-gradient(180deg, #04D0FB 0%, #49BFE0 100%)"
          />
          <Progress>
            <ProgressSuccessful>300k</ProgressSuccessful>
            <ProgressRequired>/300k</ProgressRequired>
          </Progress>
          <Label>Votes</Label>
        </CardBottom>
      </CardLink>
    </CardContainer>
  )
}

export default ProjectCard
