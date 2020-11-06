import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import XIcon from 'assets/images/x-icon.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import { deviceWidth } from 'lib/commonData'

interface ValueComponentProps {
  value: number
}

const ValueComponentContainer = styled.div`
  background: #143f54;
  padding-left: 2em;
  position: relative;
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  img {
    margin-right: 1em;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.5rem 0;
  }
`

const StyledEyeContainer = styled.div`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #107591;
  width: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Value: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <ValueComponentContainer>
    <StyledValueContainer>
      <img src={XIcon} alt="close" />
      {value}
    </StyledValueContainer>
    <StyledEyeContainer>
      <img src={EyeIcon} alt="view" />
    </StyledEyeContainer>
  </ValueComponentContainer>
)

export default Value
