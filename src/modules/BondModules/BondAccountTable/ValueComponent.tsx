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

  .in {
    color: #83D9F2;
  }
`
const OutComponentContainer = styled.div`
  background: #143f54;
  padding: 0.5em 2em;
  position: relative;
  text-align: right;
  padding-right: 96px;

  .out {
    color: #83D9F2;
  }
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
    <span className="in">In</span>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
  </InComponentContainer>
)

const OutComponent: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <OutComponentContainer>
    <span className="out">Out</span>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
    <StyledEyeContainer>
      <img src={EyeIcon} alt="view" />
    </StyledEyeContainer>
  </OutComponentContainer>
)

export { InComponent, OutComponent}
