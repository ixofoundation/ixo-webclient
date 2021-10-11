import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import { Currency } from 'types/models'
import * as keplr from 'common/utils/keplr'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonIcon from 'assets/images/modal/overlaybutton.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/eye-icon.svg'

import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { getBalanceNumber, getUIXOAmount } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
import { apiCurrencyToCurrency } from 'modules/Account/Account.utils'
import { MsgDelegate } from 'cosmjs-types/cosmos/staking/v1beta1/tx'
import { broadCastMessage } from 'common/utils/keysafe'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import ValidatorSelector from 'common/components/ValidatorSelector/ValidatorSelector'

const Container = styled.div`
  position: relative;
  padding: 1.5rem 4rem;
  min-width: 34rem;
  min-height: 22rem;
`

const NextStep = styled.div`
  position: absolute;
  right: 10px;
  bottom: 30px;
  cursor: pointer;
`

const OverlayWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 120px;
}
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #235975;
`

const NetworkFee = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  color: #83d9f2;

  strong {
    font-weight: bold;
  }
`

const TXStatusBoard = styled.div`
  & > .lottie {
    width: 80px;
  }
  & > .status {
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.3px;
    color: #5a879d;
    text-transform: uppercase;
  }
  & > .message {
    font-size: 21px;
    color: #ffffff;
    text-align: center;
  }

  & > .transaction {
    border-radius: 100px;
    border: 1px solid #39c3e6;
    padding: 10px 30px;
    cursor: pointer;
  }
`

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface Props {
  walletType: string
  accountAddress: string
}
interface ValidatorInfo {
  name: string
  address: string
  logo: string
}

const DelegateModal: React.FunctionComponent<Props> = ({
  walletType,
  accountAddress,
}) => {
  const steps = ['Validator', 'Amount', 'Order', 'Sign']
  const [asset, setAsset] = useState<Currency>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [validatorAddress, setValidatorAddress] = useState<string>(null)
  const [amount, setAmount] = useState<number>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Currency[]>([])
  const [validators, setValidators] = useState<ValidatorInfo[]>([])
  const [selectedValidator, setSelectedValidator] = useState<ValidatorInfo>(
    null,
  )
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string>(null)

  const {
    userInfo,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const handleTokenChange = (token: Currency): void => {
    setAsset(token)
  }

  const handleValidatorChange = (validator: ValidatorInfo): void => {
    setValidatorAddress(validator.address)
    setSelectedValidator(validator)
  }

  const handleAmountChange = (event): void => {
    setAmount(event.target.value)
  }

  const handleMemoChange = (event): void => {
    const value = event.target.value
    setMemo(value)
    if (value.length > 0) {
      setMemoStatus('memowith')
    } else {
      setMemoStatus('nomemo')
    }
  }

  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      // handleSend(walletType, amount, address, memo)
      if (walletType === 'keysafe') {
        const msg = {
          type: 'cosmos-sdk/MsgDelegate',
          value: {
            amount: {
              amount: getUIXOAmount(String(amount)),
              denom: 'uixo',
            },
            delegator_address: accountAddress,
            validator_address: validatorAddress,
          },
        }
        const fee = {
          amount: [{ amount: String(5000), denom: 'uixo' }],
          gas: String(200000),
        }
        broadCastMessage(
          userInfo,
          userSequence,
          userAccountNumber,
          msg,
          memo,
          fee,
          (hash) => {
            if (hash) {
              setSignTXStatus(TXStatus.SUCCESS)
              setSignTXhash(hash)
            } else {
              setSignTXStatus(TXStatus.ERROR)
            }
          },
        )
      } else if (walletType === 'keplr') {
        const [accounts, offlineSigner] = await keplr.connectAccount()
        const address = accounts[0].address
        const client = await keplr.initStargateClient(offlineSigner)

        const payload = {
          msgAny: {
            typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
            value: MsgDelegate.fromPartial({
              amount: {
                amount: getUIXOAmount(String(amount)),
                denom: 'uixo',
              },
              delegatorAddress: address,
              validatorAddress: validatorAddress,
            }),
          },
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: {
            amount: [{ amount: String(5000), denom: 'uixo' }],
            gas: String(200000),
          },
          memo: memo,
        }

        try {
          const result = await keplr.sendTransaction(client, address, payload)
          if (result) {
            setSignTXStatus(TXStatus.SUCCESS)
            setSignTXhash(result.transactionHash)
          } else {
            throw 'transaction failed'
          }
        } catch (e) {
          setSignTXStatus(TXStatus.ERROR)
        }
      }
    }
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleViewTransaction = (): void => {
    window
      .open(
        `${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`,
        '_blank',
      )
      .focus()
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (asset && validatorAddress) {
          return true
        }
        return false
      case 1:
        if (
          amount &&
          amount > 0 &&
          (memoStatus === 'nomemo' || memoStatus === 'memodone')
        ) {
          return true
        }
        return false
      case 2:
        return true
      case 3:
      default:
        return false
    }
  }

  const chooseAnimation = (txStatus): any => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return pendingAnimation
      case TXStatus.SUCCESS:
        return successAnimation
      case TXStatus.ERROR:
        return errorAnimation
      default:
        return ''
    }
  }

  const getBalances = async (address: string): Promise<any> => {
    return Axios.get(
      process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address,
    ).then((response) => {
      return {
        balances: response.data.result.map((coin) =>
          apiCurrencyToCurrency(coin),
        ),
      }
    })
  }

  const getValidators = (): Promise<any> => {
    return Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/rest/staking/validators`,
    )
      .then((response) => response.data)
      .then(async ({ result }) => {
        return await result.map(async (validator) => {
          const identity = validator.description.identity
          let logo

          if (identity) {
            logo = await Axios.get(
              `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`,
            )
              .then((response) => response.data)
              .then((response) => response.them[0])
              .then((response) => response.pictures)
              .then((response) => response.primary)
              .then((response) => response.url)
          } else {
            logo = require('assets/img/relayer.png')
          }

          return {
            address: validator.operator_address,
            name: validator.description.moniker,
            logo,
          }
        })
      })
  }

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Your transaction has been submittted'
      case TXStatus.SUCCESS:
        return 'Your transaction was successful!'
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }

  useEffect(() => {
    if (currentStep === 0) {
      getBalances(accountAddress).then(({ balances }) => {
        setBalances(balances)
      })
      getValidators().then((response) => {
        response.map(async (item) => {
          const validator = await item
          setValidators((old) => [...old, validator])
        })
      })
    }
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
  }, [currentStep])

  return (
    <Container>
      <div className="px-4 pb-4">
        <StepsTransactions
          steps={steps}
          currentStepNo={currentStep}
          handleStepChange={handleStepChange}
        />
      </div>

      {currentStep < 3 && (
        <>
          <TokenSelector
            selectedToken={asset}
            tokens={balances.map((balance) => {
              if (balance.denom === 'uixo') {
                return {
                  denom: 'ixo',
                  amount: getBalanceNumber(new BigNumber(balance.amount)),
                }
              }
              return balance
            })}
            handleChange={handleTokenChange}
            disable={currentStep !== 0}
          />
          <div className="mt-3" />
          <ValidatorSelector
            selectedValidator={selectedValidator}
            validators={validators}
            handleChange={handleValidatorChange}
            disable={currentStep !== 0}
          />
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt="down" />
          </OverlayWrapper>
        </>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className="mt-3 mb-4" />
          <AmountInput
            amount={amount}
            memo={memo}
            memoStatus={memoStatus}
            handleAmountChange={handleAmountChange}
            handleMemoChange={handleMemoChange}
            handleMemoStatus={setMemoStatus}
            disable={currentStep !== 1}
            suffix={asset.denom.toUpperCase()}
          />
          <NetworkFee className="mt-2">
            Network fees: <strong>0.05 {asset.denom.toUpperCase()}</strong>
          </NetworkFee>
        </>
      )}
      {currentStep === 3 && (
        <TXStatusBoard className="mx-4 d-flex align-items-center flex-column">
          <Lottie
            height={120}
            width={120}
            options={{
              loop: true,
              autoplay: true,
              animationData: chooseAnimation(signTXStatus),
            }}
          />
          <span className="status">{signTXStatus}</span>
          <span className="message">{generateTXMessage(signTXStatus)}</span>
          {signTXStatus === TXStatus.SUCCESS && (
            <div className="transaction mt-3" onClick={handleViewTransaction}>
              <img src={EyeIcon} alt="view transactions" />
            </div>
          )}
        </TXStatusBoard>
      )}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt="next-step" />
        </NextStep>
      )}
    </Container>
  )
}

export default DelegateModal
