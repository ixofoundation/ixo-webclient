import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import XIcon from 'assets/images/x-icon.svg'
import EyeIcon from 'assets/images/eye-icon.svg'

interface ValueComponentProps {
  value: {
    value: string;
    txhash: string;
  }
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
  cursor: pointer;
`

const ValueComponent: FunctionComponent<ValueComponentProps> = ({value}) => {
  const onClickEyeIcon = (): void => {
    console.log(value)
    if (value.txhash) {
      window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${value.txhash}`);
    }
  }

  return (
    <ValueComponentContainer>
      <StyledValueContainer>
        <img alt="" src={XIcon} />
        {value.value}
      </StyledValueContainer>
      <StyledEyeContainer onClick={onClickEyeIcon}>
        <img alt="" src={EyeIcon}/>
      </StyledEyeContainer>
    </ValueComponentContainer>
  )
}

export default ValueComponent
