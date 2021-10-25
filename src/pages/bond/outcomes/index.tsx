import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OutcomeTable from './components/OutcomeTable'
import {
  Container,
  SectionTitleContainer,
  SectionTitle,
  StyledButton,
  AlphaSpan,
} from './index.style'
import OutcomeTarget from './components/OutcomeTarget'
import { getOutcomesTargets } from 'modules/BondModules/bond/bond.actions'
import { RootState } from 'common/redux/types'
import { thousandSeparator } from 'common/utils/formatters'

export const Outcomes: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { Targets } = useSelector(
    (state: RootState) => state.activeBond.Outcomes,
  )

  useEffect(() => {
    dispatch(getOutcomesTargets())
  }, [])

  useEffect(() => {
    console.log('Targets', Targets)
  }, [Targets])

  return (
    <Container>
      <SectionTitleContainer>
        <SectionTitle>Outcome Targets</SectionTitle>
        <AlphaSpan>Alpha Forecast</AlphaSpan>
      </SectionTitleContainer>

      {Targets.length > 0 &&
        Targets.map((Target: any, index) => (
          <OutcomeTarget
            key={index}
            type={`Target ${String.fromCharCode('A'.charCodeAt(0) + index)}`}
            announce={`${thousandSeparator(Target.targetMax, ',')} ${
              Target.goal
            }`}
            goal={Target.goal}
            submissionDate={Target.startDate}
            closeDate={Target.endDate}
            claimStats={{
              approved: Target.claimStats.currentSuccessful,
              pending: 0,
              rejected: Target.claimStats.currentRejected,
              remaining: 0,
            }}
          />
        ))}

      {/* <OutcomeTarget
        type={'Target B'}
        announce={'100,000,000 MwH of Clean Energy'}
        remain={0}
        proposedBy={'Shaun Conway'}
        submissionDate={'2020-04-01 10:00'}
        closeDate={'2020-04-21 10:00'}
        votes={230}
        available={280}
        myVote={true}
      /> */}

      <SectionTitleContainer>
        <SectionTitle>Outcome Rewards</SectionTitle>
        <StyledButton>Settle</StyledButton>
      </SectionTitleContainer>
      <OutcomeTable />
    </Container>
  )
}
