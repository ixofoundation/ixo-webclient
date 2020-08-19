import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import EyeIcon from 'assets/images/eye-icon.svg'

interface ValueComponentProps {
  value: number
}

const InComponentContainer = styled.div`
  background: #143f54;
  padding: 0.5em 2em;
  position: relative;
  text-align: right;
`
const OutComponentContainer = styled.div`
  background: #143f54;
  padding: 0.5em 2em;
  position: relative;
  text-align: right;
  padding-right: 96px;
`

const StyledValueContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  img {
    margin-right: 1em;
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

const InComponent: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <InComponentContainer>
    <span>In</span>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
  </InComponentContainer>
)

const OutComponent: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <OutComponentContainer>
    <span>Out</span>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
    <StyledEyeContainer>
      <img src={EyeIcon} />
    </StyledEyeContainer>
  </OutComponentContainer>
)

export { InComponent, OutComponent}
