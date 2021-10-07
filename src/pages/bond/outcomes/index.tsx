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

      <OutcomeTarget
        type={'Target A'}
        announce={'1,500 KwH Power Generation Capacity Built'}
        remain={412}
        proposedBy={'Shaun Conway'}
        submissionDate={'2020-06-23 16:23'}
        closeDate={'2020-08-24 16:30'}
        votes={230}
        available={280}
        myVote={false}
      />
      <OutcomeTarget
        type={'Target B'}
        announce={'100,000,000 MwH of Clean Energy'}
        remain={0}
        proposedBy={'Shaun Conway'}
        submissionDate={'2020-04-01 10:00'}
        closeDate={'2020-04-21 10:00'}
        votes={230}
        available={280}
        myVote={true}
      />

      <SectionTitleContainer>
        <SectionTitle>Outcome Rewards</SectionTitle>
        <StyledButton>Settle</StyledButton>
      </SectionTitleContainer>
      <OutcomeTable />
    </Container>
  )
}
