import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as QRCodeIcon } from '/public/assets/images/icon-qrcode.svg'

import { checkValidAddress } from 'redux/account/account.utils'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { useAccount } from 'hooks/account'
import { ModalInput } from '../common'
import { GetWithdrawAddress, SetWithdrawAddress } from 'lib/protocol'

const Container = styled.div`
  padding: 3rem 1rem 1rem;
  min-width: 32rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
    border-radius: 0.25rem;
    background: transparent;
    color: white;
    outline: none;
    padding: 10px 20px;
    line-height: 100%;

    &:hover {
      border: 1px solid #fff;
    }
  }
`

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const SetWithdrawAddressModal: FunctionComponent<Props> = ({ open, setOpen }) => {
  const { address, signingClient } = useAccount()
  const [inputAddress, setInputAddress] = useState<string>('')

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()

    if (checkValidAddress(inputAddress)) {
      const res = await SetWithdrawAddress(signingClient, {
        delegatorAddress: address,
        withdrawAddress: inputAddress,
      })
      console.log('SetWithdrawAddress', res)
    }
  }

  useEffect(() => {
    if (address) {
      GetWithdrawAddress(address).then(setInputAddress)
    }
    // eslint-disable-next-line
  }, [address])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'New Withdraw Address',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <form onSubmit={handleSubmit}>
          <ModalInput
            error={
              inputAddress.length > 0 && !checkValidAddress(inputAddress) ? 'This is not a valid account address' : ''
            }
            preIcon={<QRCodeIcon />}
            placeholder='New Withdraw Address'
            value={inputAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInputAddress(e.target.value)}
          />

          <ButtonContainer>
            <button type='submit'>Confirm</button>
          </ButtonContainer>
        </form>
      </Container>
    </ModalWrapper>
  )
}

export default SetWithdrawAddressModal
