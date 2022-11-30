import cx from 'classnames'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

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

  &.error {
    border 1px solid #CD1C33;
  }

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
    right: 20px;
    text-transform: uppercase;
    transform: translate(0%, -50%);
    color: white;
  }

  & .placeholder {
    text-transform: uppercase;
  }
`

interface Props {
  placeholder?: string
  amount: BigNumber
  denom: string
  setAmount: (amount: BigNumber) => void
  disable?: boolean
  error?: boolean
}

const LiquidityAmount: React.FunctionComponent<Props> = ({
  placeholder = 'Amount',
  amount,
  denom,
  setAmount,
  disable = false,
  error = false,
}) => {
  return (
    <AmountInput border={!disable} className={cx({ 'text-center': disable }, { error })}>
      {!disable && (
        <>
          <input
            type='number'
            min={0}
            step={0.1}
            value={new BigNumber(amount).toNumber()}
            placeholder={placeholder}
            onChange={(e: any): void => setAmount(new BigNumber(e.target.value))}
          />
          <span className='denom'>{denom}</span>
        </>
      )}
      {disable && (
        <span className='placeholder'>
          {amount.toString()} {denom}
        </span>
      )}
    </AmountInput>
  )
}

export default LiquidityAmount
