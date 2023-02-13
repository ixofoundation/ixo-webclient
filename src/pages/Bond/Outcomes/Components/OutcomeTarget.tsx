import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ProgressBar } from 'components/ProgressBar/ProgressBar'

import IMG_message from 'assets/images/funding/message.svg'
import IMG_file_copy from 'assets/images/funding/file_copy.svg'
import IMG_wait from 'assets/images/eco/wait.svg'

import { gridSizes, WidgetWrapper } from 'components/Wrappers/WidgetWrapper'
import {
  ClaimsLabels,
  ClaimsWidget,
  ProgressContainer,
} from 'components/Entities/SelectedEntity/EntityImpact/Overview/Components/Dashboard/Dashboard.styles'
import { CircleProgressbar } from 'components/Widgets/CircleProgressbar/CircleProgressbar'
import moment from 'moment'

const Container = styled.div`
  background: linear-gradient(180deg, #012639 0%, #002d42 97.29%);
  border: 1px solid #0c3549;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  padding: 20px;
  margin: 0px 0px 30px 0px;

  p {
    color: #ffffff;
  }

  strong {
    color: #ffffff;
  }

  .claims {
    margin-top: 40px;
  }

  .progress-container span {
    color: #ffffff;
  }

  .circle {
    height: 205px;
  }

  .container-fluid {
    min-height: unset !important;
  }
`

const TypeBadget = styled.span`
  background: #033c50;
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  color: ${(props): string => props.theme.highlight.light};
  padding: 5px 10px;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.3px;
  color: #ffffff;
`

const LabelSM = styled.span`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #688ea0;

  &.bold {
    font-weight: bold;
  }
`
const LabelLG = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: #ffffff;
`

export enum ProposalType {
  Membership = 'Membership',
  Budget = 'Budget',
}

interface OutcomeTargetProps {
  type: string
  announce: string
  submissionDate: string
  closeDate: string
  goal: string
  claimStats: {
    approved: number
    pending: number
    rejected: number
    remaining: number
  }
}

const OutcomeTarget: React.FunctionComponent<OutcomeTargetProps> = ({
  type,
  announce,
  submissionDate,
  closeDate,
  goal,
  claimStats = {
    approved: 0,
    pending: 0,
    rejected: 0,
    remaining: 0,
  },
}) => {
  const [targetPeriod, setTargetPeriod] = useState<number>(0)
  const [targetRemain, setTargetRemain] = useState<number>(0)

  const remainDateFormat = (minute: any): string => {
    // 28d 22h 36m
    const duration = moment.duration(minute, 'minutes')

    const days = Math.floor(duration.asDays())
    duration.subtract(moment.duration(days, 'days'))

    const hours = Math.floor(duration.hours())
    duration.subtract(moment.duration(hours, 'hours'))

    const minutes = duration.minutes()
    duration.subtract(moment.duration(minutes, 'minutes'))
    return `${days}d ${hours}h ${minutes}m `
  }

  useEffect(() => {
    setTargetPeriod(moment.utc(closeDate).diff(moment.utc(submissionDate), 'minutes'))
    setTargetRemain(moment.utc(closeDate).diff(moment().utc(), 'minutes'))
    // eslint-disable-next-line
  }, [submissionDate, closeDate])

  return (
    <Container className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-sm-6'>
          <div className='d-flex align-items-center justify-content-between pb-3'>
            <div>
              <TypeBadget>{type}</TypeBadget>
            </div>
            <div>
              <img src={IMG_file_copy} alt='file copy' height='22px' />
              <img src={IMG_message} alt='message' height='22px' style={{ marginLeft: 10 }} />
            </div>
          </div>

          <Title className='pb-3'>{announce}</Title>

          <div className='d-flex align-items-center'>
            <img src={IMG_wait} alt='remain' height='20px' />
            <div className='d-inline-block w-100 pl-3'>
              <ProgressBar
                total={targetPeriod}
                approved={targetPeriod - targetRemain}
                rejected={0}
                height={22}
                activeBarColor='linear-gradient(270deg, #04D0FB 0%, #49BFE0 100%);'
                closedText='Closed'
              />
            </div>
          </div>

          <div className='text-right'>
            <LabelSM className='bold'>{targetRemain > 0 && remainDateFormat(targetRemain)}</LabelSM>
            <LabelSM>{targetRemain > 0 ? 'remaining' : 'Period is now closed'}</LabelSM>
          </div>

          <div className='row'>
            <div className='col-6 pb-3'>
              <LabelSM>Start Date</LabelSM>
              <br />
              <LabelLG>{moment.utc(submissionDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
            <div className='col-6 pb-3'>
              <LabelSM>Due Date</LabelSM>
              <br />
              <LabelLG>{moment.utc(closeDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6'>
          <WidgetWrapper title='' gridHeight={gridSizes.standard} light={true} padding={false}>
            <ClaimsWidget className='p-0 m-0'>
              <ClaimsLabels>
                <div className='pl-0'>
                  <div className='pl-4 claims'>
                    <p>
                      <strong>{claimStats.approved}</strong> claims approved
                    </p>
                    <p>
                      <strong>{claimStats.pending}</strong> claims pending approval
                    </p>
                    <p>
                      <strong>{claimStats.rejected}</strong> claims rejected
                    </p>
                    <p>
                      <strong>{claimStats.remaining}</strong> remaining claims
                    </p>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer className='progress-container'>
                <CircleProgressbar
                  approved={claimStats.approved}
                  rejected={claimStats.rejected}
                  pending={claimStats.pending}
                  totalNeeded={claimStats.approved + claimStats.rejected + claimStats.pending + claimStats.remaining}
                  descriptor={<>{goal}</>}
                  percentageFormat={false}
                />
              </ProgressContainer>
            </ClaimsWidget>
          </WidgetWrapper>
        </div>
      </div>
    </Container>
  )
}

export default OutcomeTarget
