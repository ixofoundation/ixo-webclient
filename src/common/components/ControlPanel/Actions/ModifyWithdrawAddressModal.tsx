import React, { FunctionComponent, useState, useEffect } from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import QRCodeRedIcon from 'assets/images/modal/qrcode-red.svg'

import { MsgSetWithdrawAddress } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { broadCastMessage } from 'common/utils/keysafe'
import { RootState } from 'redux/types'
import { useSelector } from 'react-redux'
import * as keplr from 'common/utils/keplr'
import * as Toast from 'common/utils/Toast'
import { checkValidAddress } from 'redux/account/account.utils'
import ModalInput from 'common/components/ModalInput/ModalInput'

const Container = styled.div`
  padding: 3rem 1rem 1rem;
  min-width: 32rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid #49bfe0;
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
  walletType: string
  accountAddress: string
}

const ModifyWithdrawAddressModal: FunctionComponent<Props> = ({ walletType, accountAddress }) => {
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const [inputAddress, setInputAddress] = useState<string>('')

  const getCurrentWithdrawAddress = async (): Promise<string> => {
    return await Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/cosmos/distribution/v1beta1/delegators/${accountAddress}/withdraw_address`,
    )
      .then((response) => response.data)
      .then((response) => response.withdraw_address)
      .catch(() => '')
  }

  const generateTXMessage = (type: string, withdrawAddress: string): object[] => {
    const msg = []
    switch (type) {
      case 'keysafe': {
        msg.push({
          type: 'cosmos-sdk/MsgModifyWithdrawAddress',
          value: {
            delegator_address: accountAddress,
            withdraw_address: withdrawAddress,
          },
        })
        break
      }
      case 'keplr': {
        msg.push({
          typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
          value: MsgSetWithdrawAddress.fromPartial({
            delegatorAddress: accountAddress,
            withdrawAddress: withdrawAddress,
          }),
        })
        break
      }
      default:
        break
    }
    return msg
  }

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()
    const newWithdrawAddress = event.target.elements['recipient_address'].value

    if (!checkValidAddress(newWithdrawAddress)) {
      return
    }

    const msg = generateTXMessage(walletType, newWithdrawAddress)
    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }
    const memo = ''

    switch (walletType) {
      case 'keysafe': {
        broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msg, memo, fee, (hash: any) => {
          if (hash) {
            Toast.successToast(`Transaction Successful`)
          } else {
            Toast.errorToast(`Transaction Failed`)
          }
        })
        break
      }
      case 'keplr': {
        const [accounts, offlineSigner] = await keplr.connectAccount()
        const address = accounts[0].address
        const client = await keplr.initStargateClient(offlineSigner)

        const payload = {
          msgs: msg,
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee,
          memo,
        }

        try {
          const result = await keplr.sendTransaction(client, address, payload)
          if (result) {
            Toast.successToast(`Transaction Successful`)
          } else {
            // eslint-disable-next-line
            throw 'transaction failed'
          }
        } catch (e) {
          Toast.errorToast(`Transaction Failed`)
        }
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    getCurrentWithdrawAddress().then((address) => setInputAddress(address))
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ModalInput
          invalid={inputAddress.length > 0 && !checkValidAddress(inputAddress)}
          invalidLabel={'This is not a valid account address'}
          disable={false}
          preIcon={inputAddress.length === 0 || checkValidAddress(inputAddress) ? QRCodeIcon : QRCodeRedIcon}
          placeholder='New Withdraw Address'
          value={inputAddress}
          handleChange={(e): void => setInputAddress(e.target.value)}
        />

        <ButtonContainer>
          <button type='submit'>Confirm</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default ModifyWithdrawAddressModal
