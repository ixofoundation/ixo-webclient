import React from 'react'
import styled from 'styled-components'
import { ProgressBar } from 'common/components/ProgressBar'

import IMG_message from 'assets/images/funding/message.svg'
import IMG_file_copy from 'assets/images/funding/file_copy.svg'
import IMG_wait from 'assets/images/eco/wait.svg'

import IMG_decision_textfile from 'assets/images/eco/decision/textfile.svg'
import IMG_decision_pdf from 'assets/images/eco/decision/pdf.svg'
import {
  gridSizes,
  WidgetWrapper,
} from 'common/components/Wrappers/WidgetWrapper'
import {
  ClaimsLabels,
  ClaimsWidget,
  ProgressContainer,
  SectionHeader,
} from 'modules/Entities/SelectedEntity/EntityImpact/Overview/components/Dashboard/Dashboard.styles'
import { CircleProgressbar } from 'common/components/Widgets/CircleProgressbar/CircleProgressbar'
import moment from 'moment'

const Container = styled.div`
  background: linear-gradient(180deg, #012639 0%, #002D42 97.29%);
  border: 1px solid #0C3549;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  border-radius: 4px;
  padding: 20px;
  margin: 0px 0px 30px 0px;

  p {
    color: #FFFFFF;
  }

  strong {
    color: #FFFFFF;
  }

  .claims {
    margin-top: 40px;
  }

  .progress-container span {
    color: #FFFFFF;
  }

  .circle {
    height: 205px;
  }

  .container-fluid {
    min-height: unset! important;
  }
`

const NumberBadget = styled.span`
  background: #e9edf5;
  border-radius: 9px;
  padding: 5px;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 16px;
`
const TypeBadget = styled.span`
  background: #033C50;
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  color: #39C3E6;
  padding: 5px 10px;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.3px;
  color: #FFFFFF;
`

const LabelSM = styled.span`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #688EA0;

  &.bold {
    font-weight: bold;
  }
`
const LabelLG = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: #FFFFFF;
`
const Action = styled.button`
  border-radius: 4px;
  padding: 10px 30px;
  border: #39c3e6 1px solid;
  color: #FFFFFF;
  background-color: transparent;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  &.disable {
    border: transparent 1px solid;
    background-color: #E9EDF5;
    color: #BDBDBD;
  }
`

const DecisionIMG = styled.img`
  height: 30px;
`

export enum ProposalType {
  Membership = 'Membership',
  Budget = 'Budget',
}

interface OutcomeTargetProps {
  type: string
  announce: string
  remain: number // will be a number by min
  proposedBy: string
  submissionDate: string
  closeDate: string
  votes: number
  available: number
  myVote: boolean
}

const OutcomeTarget: React.FunctionComponent<OutcomeTargetProps> = ({
  type,
  announce,
  remain,
  proposedBy,
  submissionDate,
  closeDate,
  votes,
  available,
  myVote,
}) => {
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
              <img src={IMG_message} alt='message' height='22px' style={{marginLeft: 10}} />
            </div>
          </div>

          <Title className='pb-3'>{announce}</Title>

          <div className='d-flex align-items-center'>
            <img src={IMG_wait} alt='remain' height='20px' />
            <div className='d-inline-block w-100 pl-3'>
              <ProgressBar
                total={1000}
                approved={remain}
                rejected={0}
                height={22}
                activeBarColor='linear-gradient(270deg, #04D0FB 0%, #49BFE0 100%);'
                closedText='Closed'
              />
            </div>
          </div>

          <div className='text-right'>
            <LabelSM className='bold'>{remain > 0 && '5d 6h 23m '}</LabelSM>
            <LabelSM>{remain > 0 ? 'remaining' : 'Voting period is now closed'}</LabelSM>
          </div>

          <div className='row'>
            <div className='col-6 pb-3'>
              <LabelSM>Submission Date</LabelSM>
              <br />
              <LabelLG>{moment(submissionDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
            <div className='col-6 pb-3'>
              <LabelSM>Due Date</LabelSM>
              <br />
              <LabelLG>{moment(closeDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6'>
          <WidgetWrapper
            title=''
            gridHeight={gridSizes.standard}
            light={true}
            padding={false}
          >
            <ClaimsWidget className="p-0 m-0">
              <ClaimsLabels>
                <div className="pl-0">
                  <div className="pl-4 claims">
                    <p>
                      <strong>{567}</strong> claims approved
                    </p>
                    <p>
                      <strong>{362}</strong> claims pending approval
                    </p>
                    <p>
                      <strong>{58}</strong> claims rejected
                    </p>
                    <p>
                      <strong>{0}</strong> remaining claims
                    </p>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer className='progress-container'>
                <CircleProgressbar
                  approved={767}
                  rejected={95}
                  pending={88}
                  totalNeeded={1298}
                  descriptor={<>water systems built</>}
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
