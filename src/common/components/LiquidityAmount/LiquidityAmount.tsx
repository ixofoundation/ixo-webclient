import React from 'react'
import cx from 'classnames'
import styled from 'styled-components'

const AmountInput = styled.div<{ border?: boolean }>`
  width: calc(50% - 5px);
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  position: relative;

  border: 1px solid
    ${(props: any): string => (props.border ? '#49bfe0' : 'transparent')};
  border-radius: 4px;
  background: #03324a;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    color: #ffffff;
    background: transparent;
    padding: 15px;
    margin: 0px !important;
    width: 100%;
    border: none;

    &:focus-visible {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::placeholder {
      color: #537b8e;
    }
  }

  & .denom {
    position: absolute;
    top: 50%;
    right: 10px;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    color: white;
  }

  & .placeholder {
    text-transform: uppercase;
  }
`

interface Props {
  placeholder?: string
  amount: number
  denom: string
  setAmounts: (amount: number) => void
  disable?: boolean
}

const LiquidityAmount: React.FunctionComponent<Props> = ({
  placeholder = 'Amount',
  amount,
  denom,
  setAmounts,
  disable = false,
}) => {
  return (
    <AmountInput border={!disable} className={cx({ 'text-center': disable })}>
      {!disable && (
        <>
          <input
            type="number"
            min={0}
            step={0.1}
            value={amount}
            placeholder={placeholder}
            onChange={(e: any): void => setAmounts(e.target.value)}
          />
          <span className="denom">{denom}</span>
        </>
      )}
      {disable && (
        <span className="placeholder">
          {amount} {denom}
        </span>
      )}
    </AmountInput>
  )
}

export default LiquidityAmount
