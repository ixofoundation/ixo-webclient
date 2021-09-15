import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import EyeIcon from 'assets/images/eye-icon.svg'
import ArrowRight from 'assets/images/exchange/transaction-arrow-right.svg'
import ArrowLeft from 'assets/images/exchange/transaction-arrow-left.svg'

interface ValueComponentProps {
  value: number | string
  txhash?: string
}

interface StyledValueContainerProps {
  visible: boolean
}

const InComponentContainer = styled.div`
  background: #143f54;
  padding: 0.5em 2em;
  position: relative;
  text-align: right;
  line-height: 200%;

  .in {
    color: #83d9f2;
    font-size: 12px;
    font-weight: normal;
  }
`
const OutComponentContainer = styled.div`
  background: #143f54;
  padding: 0.5em 2em;
  position: relative;
  text-align: right;
  padding-right: 70px;
  line-height: 200%;

  .out {
    color: #83d9f2;
    font-size: 12px;
    font-weight: normal;
  }
`

const StyledValueContainer = styled.div<StyledValueContainerProps>`
  display: flex;
  justify-content: flex-end;
  img {
    margin-right: 1em;
  }
  line-height: 100%;
  visibility: ${(props: any): string =>
    props.visible ? 'visibility' : 'hidden'};
`

const StyledEyeContainer = styled.div`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #107591;
  width: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const InComponent: FunctionComponent<ValueComponentProps> = ({ value }) => (
  <InComponentContainer>
    <span className="in">{value ? 'In' : <img src={ArrowRight} alt="" />}</span>
    <StyledValueContainer visible={value ? true : false}>
      {value ?? '.'}
    </StyledValueContainer>
  </InComponentContainer>
)

const OutComponent: FunctionComponent<ValueComponentProps> = ({
  value,
  txhash,
}) => (
  <OutComponentContainer>
    <span className="out">
      {value ? 'Out' : <img src={ArrowLeft} alt="" />}
    </span>
    <StyledValueContainer visible={value ? true : false}>
      {value ?? '.'}
    </StyledValueContainer>
    <StyledEyeContainer
      onClick={(): void => {
        if (txhash) {
          window.open(
            `${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${txhash}`,
          )
        }
      }}
    >
      <img alt="" src={EyeIcon} />
    </StyledEyeContainer>
  </OutComponentContainer>
)

export { InComponent, OutComponent }
