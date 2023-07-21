import React from 'react'
import { TClaimQuestionControlProps } from './types'
import styled from 'styled-components'
import { FlexBox } from 'components/App/App.styles'

const StyledSingleDateSelector = styled.div``

const SingleDateSelector: React.FC<TClaimQuestionControlProps> = ({ onChange, ...rest }) => {
  return (
    <StyledSingleDateSelector>
      <FlexBox></FlexBox>
    </StyledSingleDateSelector>
  )
}

export default SingleDateSelector
