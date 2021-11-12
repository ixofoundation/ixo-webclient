import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import InputText from 'common/components/Form/InputText/InputText'
import { FormStyles } from 'types/models'

import { MsgSetWithdrawAddress } from 'cosmjs-types/cosmos/distribution/v1beta1/tx'
import { broadCastMessage } from 'common/utils/keysafe'
import { RootState } from 'common/redux/types'
import { useSelector } from 'react-redux'
import * as keplr from 'common/utils/keplr'
import * as Toast from 'common/utils/Toast'
import { checkValidAddress } from 'modules/Account/Account.utils'

const Container = styled.div`
  padding: 1rem 1rem;
  min-width: 32rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid #00d2ff;
    border-radius: 0.25rem;
    background: transparent;
    color: white;
    outline: none;
    padding: 10px 20px;
    line-height: 100%;

    &:hover {
      border: 1px solid #FFF;
    }
  }
`

interface Props {
  walletType: string
  accountAddress: string
}

const ModifyWithdrawAddressModal: FunctionComponent<Props> = ({
  walletType,
  accountAddress,
}) => {
  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const generateTXMessage = (type: string, withdrawAddress): object[] => {
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

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault()
    const newWithdrawAddress = event.target.elements['withdraw_address'].value

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
        broadCastMessage(
          userInfo,
          userSequence,
          userAccountNumber,
          msg,
          memo,
          fee,
          (hash) => {
            if (hash) {
              Toast.successToast(`Transaction Successful`)
            } else {
              Toast.errorToast(`Transaction Failed`)
            }
          },
        )
        break
      }
      case 'keplr': {
        const [accounts, offlineSigner] = await keplr.connectAccount()
        const address = accounts[0].address
        const client = await keplr.initStargateClient(offlineSigner)

        const payload = {
          msg,
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee,
          memo,
        }

        try {
          const result = await keplr.sendTransaction(client, address, payload)
          if (result) {
            Toast.successToast(`Transaction Successful`)
          } else {
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

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputText
          type="text"
          formStyle={FormStyles.modal}
          text="New Withdraw Address"
          id="withdraw_address"
        />

        <ButtonContainer>
          <button type="submit">Confirm</button>
        </ButtonContainer>
      </form>
    </Container>
  )
}

export default ModifyWithdrawAddressModal
