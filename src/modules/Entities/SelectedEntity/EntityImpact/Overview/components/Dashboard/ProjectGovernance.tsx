import * as React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'
import Wait from 'assets/icons/Wait'

const TotalCampaigns = styled.div`
  color: ${/* eslint-disable-line */ (props) => props.theme.fontSkyBlue};
  font-size: 2.75rem;
  letter-spacing: 0.3px;
  margin-top: 0.5rem;
`

const ExtendSection = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.bg.heavyDarkBlue};
  padding: 0.9rem 1rem;
  border-radius: 0.25rem;
  margin-top: 1.4rem;
  width: 100%;
`
const Index = styled.span`
  background: #033C50;
  width: 2.25rem;
  height: 1.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontSkyBlue};
  margin-right: 0.5rem;
  font-weight: normal;
`

const ExtendHeader = styled.div`
  color: ${/* eslint-disable-line */ (props) => props.theme.fontSkyBlue};
  font-size: 0.865rem;
  display: flex;
  align-items: center;
  font-weight: bold;
`

const TimeContainer = styled.div`
  font-size: 0.75rem;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontBlueDisabled};
  font-weight: bold;
  margin-top: 1rem;
`

const RemainingTime = styled.span`
  font-size: 0.75rem;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontSkyBlue};
`

const ProjectGovernance: React.FunctionComponent = ()  => {
  return (
    <div className="d-flex flex-column align-items-center">
      <TotalCampaigns>
        0
      </TotalCampaigns>
      <div className="text-white">
        Open Campaigns
      </div>
      <ExtendSection>
        <ExtendHeader>
          <Index>#0</Index> Next up
        </ExtendHeader>
        <div className="small mt-2">
          Extend the project end-date to Step 2020
        </div>
        <div className="d-flex align-items-center mt-4 mb-2">
          <Wait fill='#39C3E6' />
          <div className="flex-grow-1 ml-3">
            <ProgressBar
              total={100}
              progress={75}
            />
          </div>
        </div>
      </ExtendSection>
      <TimeContainer>
        <RemainingTime>0d 0h 0m</RemainingTime> before voting closes
      </TimeContainer>
    </div>
  )
};

export default ProjectGovernance;