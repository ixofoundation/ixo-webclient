import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import XIcon from 'assets/images/x-icon.svg'
import EyeIcon from 'assets/images/icon-eye.svg'

interface ValueProps {
  value: number
}

const ValueComponentContainer = styled.div`
  background: #e9edf5;
  padding-left: 2em;
  position: relative;
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  img {
    margin-right: 1em;
  }
`

const StyledEyeContainer = styled.div`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #e9edf5;
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Value: FunctionComponent<ValueProps> = ({ value }) => (
  <ValueComponentContainer>
    <StyledValueContainer>
      <img alt='' src={XIcon} />
      {value}
    </StyledValueContainer>
    <StyledEyeContainer>
      <img alt='' src={EyeIcon} />
    </StyledEyeContainer>
  </ValueComponentContainer>
)

export default Value
