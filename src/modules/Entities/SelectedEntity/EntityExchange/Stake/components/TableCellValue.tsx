import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import AssistantIcon from 'assets/images/icon-assistant.svg'

interface ValueProps {
  value: number
}

const ValueComponentContainer = styled.div`
  background: #e9edf5;
  display: flex;
  align-items: center;
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  line-height: 200%;
  flex-grow: 2;
  justify-content: center;
  img {
    margin-right: 1em;
  }
`

const StyledAssistantContainer = styled.div`
  background-color: #e9edf5;
  width: 4em;
  padding: 1.3em 0;
  border-left: 3px solid #f7f9fd;
  cursor: pointer;
`

const Value: FunctionComponent<ValueProps> = ({ value }) => (
  <ValueComponentContainer>
    <StyledValueContainer>
      {value}
    </StyledValueContainer>
    <StyledAssistantContainer>
      <img alt="" src={AssistantIcon} />
    </StyledAssistantContainer>
  </ValueComponentContainer>
)

export default Value
