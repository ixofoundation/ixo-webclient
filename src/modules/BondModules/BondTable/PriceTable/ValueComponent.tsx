import { FunctionComponent, useMemo, useState } from 'react'
import styled from 'styled-components'
// import XIcon from 'assets/images/x-icon.svg'
// import AlphaIcon from 'assets/images/alpha-icon.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import { thousandSeparator } from 'common/utils/formatters'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'

interface ValueComponentProps {
  value: {
    value: string
    txhash: string
    denom: string
    status: string
    log: string
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

const StyledViewLogContainer = styled.div`
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

const ModalBody = styled.div`
  margin: 50px auto;
  font-size: 20px;
  color: ${(props): string => props.theme.red};
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 700;
  text-align: center;
`

const ValueComponent: FunctionComponent<ValueComponentProps> = ({ value }) => {
  const { status, log } = value
  const [errorMessageModalOpen, setErrorMessageModalOpen] = useState(false)

  const handleViewTransactionOnBlockScan = (): void => {
    if (value.txhash) {
      window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${value.txhash}`)
    }
  }

  const handleViewErrorMessage = (): void => {
    setErrorMessageModalOpen(true)
  }

  const displayAmount = useMemo(() => {
    const amount = Number(value.value)
    if (amount >= 1000) {
      return amount.toFixed(0)
    }
    return amount
  }, [value.value])

  return (
    <ValueComponentContainer className='value'>
      <StyledValueContainer>
        {thousandSeparator(displayAmount, ',')}&nbsp;
        {value.denom.toUpperCase()}
      </StyledValueContainer>
      {status === 'succeed' ? (
        <StyledViewLogContainer onClick={handleViewTransactionOnBlockScan}>
          <img alt='' src={EyeIcon} />
        </StyledViewLogContainer>
      ) : (
        <StyledViewLogContainer onClick={handleViewErrorMessage}>
          <img alt='' src={EyeIcon} />
        </StyledViewLogContainer>
      )}

      <ModalWrapper
        isModalOpen={errorMessageModalOpen}
        header={{
          title: 'Failed!',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setErrorMessageModalOpen(false)}
      >
        <ModalBody>{log}</ModalBody>
      </ModalWrapper>
    </ValueComponentContainer>
  )
}

export default ValueComponent
