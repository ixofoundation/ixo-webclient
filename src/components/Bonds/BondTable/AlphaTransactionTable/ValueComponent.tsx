import { FunctionComponent } from 'react'
import styled from 'styled-components'
import AlphaIcon from 'assets/images/alpha-icon.svg'

interface ValueComponentProps {
  value: number
}

const ValueComponentContainer = styled.div`
  background: #143f54;
  padding-left: 2em;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
`

const StyledValueContainer = styled.div`
  padding: 1em 0;
  display: flex;
  align-items: center;
  img {
    margin-right: 1em;
    width: 28px;
    height: 28px;
  }
`

const ValueComponent: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <ValueComponentContainer>
    <StyledValueContainer>
      <img alt='' src={AlphaIcon} />
      {value}
    </StyledValueContainer>
  </ValueComponentContainer>
)

export default ValueComponent
