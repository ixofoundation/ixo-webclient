import React from 'react'
import styled from 'styled-components'
import { ProgressBar } from 'common/components/ProgressBar'

import IMG_message from 'assets/images/eco/message.svg'
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
  background: linear-gradient(180deg, #ffffff 0%, #f2f5fb 100%);
  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 4px;
  padding: 20px;
  margin: 10px 0px;
`

const NumberBadget = styled.div`
  background: #e9edf5;
  border-radius: 9px;
  padding: 5px;
  color: #39c3e6;
  font-size: 14px;
  line-height: 16px;
`
const TypeBadget = styled.div`
  background: #107591;
  border-radius: 24px;
  font-size: 14px;
  line-height: 16px;
  color: #83d9f2;
  padding: 5px 10px;
`

const Title = styled.div`
  font-size: 22px;
  line-height: 28px;
  color: #333333;
`

const LabelSM = styled.span`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #333333;

  &.bold {
    font-weight: bold;
  }
`
const LabelLG = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: #333333;
`
const Action = styled.button`
  border-radius: 4px;
  padding: 10px 30px;
  border: #39c3e6 1px solid;
  color: #333333;
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

export enum ProposalType {
  Membership = 'Membership',
  Budget = 'Budget',
}

interface GovernanceProposalProps {
  no: number
  type: ProposalType
  announce: string
  remain: number // will be a number by min
  proposedBy: string
  submissionDate: string
  closeDate: string
  votes: number
  available: number
  myVote: boolean
}

const GovernanceProposal: React.FunctionComponent<GovernanceProposalProps> = ({
  no,
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
          <div className='d-flex align-items-center pb-3'>
            <NumberBadget style={{ paddingRight: '10px' }}>#{no}</NumberBadget>
            <div className='pl-2'><TypeBadget>{type}</TypeBadget></div>
            <div className='text-right' style={{ flexGrow: 2 }}>
              <img src={IMG_message} alt='message' height='30px' />
            </div>
          </div>

          <Title className='pb-3'>{announce}</Title>

          <div className='d-flex align-itmes-center'>
            <img src={IMG_wait} alt='remain' height='20px' />
            <div
              className='d-inline-block'
              style={{ width: '100%', paddingLeft: '10px' }}
            >
              <ProgressBar
                total={1000}
                approved={remain}
                rejected={0}
                height={22}
                activeBarColor='#39c3e6'
                closedText='Closed'
              />
            </div>
          </div>

          <div className='text-right'>
            <LabelSM className='bold'>{remain > 0 && '5d 6h 23m '}</LabelSM>
            <LabelSM>{remain > 0 ? 'remaining' : 'Voting period is now closed'}</LabelSM>
          </div>

          <div className='row'>
            <div className='col-12 pb-2'>
              <LabelSM>Proposed by</LabelSM>
              <br />
              <LabelLG>{proposedBy}</LabelLG>
            </div>
            <div className='col-6 pb-2'>
              <LabelSM>Submission Date</LabelSM>
              <br />
              <LabelLG>{moment(submissionDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
            <div className='col-6 pb-2'>
              <LabelSM>{remain > 0 ? 'Closes' : 'Closed'}</LabelSM>
              <br />
              <LabelLG>{moment(closeDate).format('YYYY-MM-DD [at] HH:mm [UTC]')}</LabelLG>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center pt-2'>
            <Action className={myVote ? 'disable' : ''}>{myVote ? 'My Vote' : 'New Vote'}</Action>
            <div>
              <img
                src={IMG_decision_textfile}
                alt='decision1'
                height='30px'
                style={{ paddingRight: '10px' }}
              />
              <img
                src={IMG_decision_pdf}
                alt='decision2'
                height='30px'
              />
            </div>
          </div>

          <LabelSM className='bold'>{votes} YES</LabelSM>
          <LabelSM>{`(of ${available} available)`}</LabelSM>
        </div>
        <div className='col-12 col-sm-6'>
          <WidgetWrapper
            title='Current status: Proposal Passes'
            gridHeight={gridSizes.standard}
            light={true}
          >
            <ClaimsWidget>
              <ClaimsLabels>
                <div>
                  <p>
                    <strong>{567}</strong> Yes (64%)
                  </p>
                  <p>
                    <strong>{362}</strong> No (32%)
                  </p>
                  <p>
                    <strong>{58}</strong> No with Veto (8%)
                  </p>
                  <p>
                    <strong>{800}</strong> have not yet voted (44%)
                  </p>
                </div>
                <div className='mt-2'>
                  <SectionHeader>
                    Consensus thresholds
                  </SectionHeader>
                  <div>
                    <div style={{ paddingLeft: '60px' }}>
                      <div>
                        <strong>+ 10</strong>% more than the quorum of 40%
                      </div>
                      <div>
                        <strong>+ 14</strong>% in favour over the 50% required
                      </div>
                      <div>
                        <strong>- 7</strong>% under the 15% required to veto
                      </div>
                    </div>
                  </div>
                </div>
              </ClaimsLabels>
              <ProgressContainer>
                <CircleProgressbar
                  approved={567}
                  rejected={362}
                  pending={58}
                  totalNeeded={800}
                  descriptor={<>In favour of the Proposal</>}
                />
              </ProgressContainer>
            </ClaimsWidget>
          </WidgetWrapper>
        </div>
      </div>
    </Container>
  )
}

export default GovernanceProposal
