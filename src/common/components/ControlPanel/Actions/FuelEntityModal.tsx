import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Currency, FormStyles } from 'types/models'
import * as keplr from 'common/utils/keplr'
import Axios from 'axios'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { thousandSeparator } from 'common/utils/formatters'
import AmountInput from 'common/components/AmountInput/AmountInput'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { apiCurrencyToCurrency, checkValidAddress, tokenBalance } from 'modules/Account/Account.utils'
import { getBalanceNumber, getUIXOAmount } from 'common/utils/currency.utils'
import { broadCastMessage } from 'common/utils/keysafe'
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import BigNumber from 'bignumber.js'
import CheckIcon from 'assets/images/modal/check.svg'
import ModalInput from 'common/components/ModalInput/ModalInput'
import QRCodeIcon from 'assets/images/modal/qrcode.svg'
import QRCodeRedIcon from 'assets/images/modal/qrcode-red.svg'
import OverlayButtonIcon from 'assets/images/modal/overlaybutton-down.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import Lottie from 'react-lottie'
import NextStepIcon from 'assets/images/modal/nextstep.svg'

const Container = styled.div`
  position: relative;
  padding: 1.5rem 4rem;
  min-width: 34rem;
  min-height: 23rem;
`

const NextStep = styled.div`
  position: absolute;
  right: 10px;
  bottom: 30px;
  cursor: pointer;
`
const PrevStep = styled.div`
  position: absolute;
  left: 10px;
  bottom: 30px;
  cursor: pointer;
  transform: rotateY(180deg);
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

const CheckWrapper = styled.div`
  position: relative;
  & > .check-icon {
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
const CreditMethodWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;

  button {
    cursor: pointer;
    background: #03324a;
    border: 1px solid #25758f;
    box-sizing: border-box;
    box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 10px;
    width: 100px;
    margin: 0 10px;

    color: #ffeeee;
    font-family: Roboto;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    transition: all 0.2s;

    &:focus {
      outline: unset !important;
    }
    &:hover {
      color: #ffeeee !important;
    }
    &.inactive {
      color: #537b8e;
    }
    &.active {
      border: 1px solid #49bfe0;
    }
  }
`

const MaxButton = styled.div`
  border-radius: 13px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  background-color: #00D2FF;
  padding: 5px 15px;
  margin: 0px 5px;
  cursor: pointer;
`

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

enum CreditMethod {
  ADD = 'Add',
  WITHDRAW = 'Withdraw',
}
interface Props {
  walletType: string
  accountAddress: string
  entityDid: string
  handleChangeTitle: (newTitle: string) => void
}

const FuelEntityModal: React.FunctionComponent<Props> = ({
  walletType,
  accountAddress,
  entityDid,
  handleChangeTitle,
}) => {
  const [projectAddress, setProjectAddress] = useState('')
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${entityDid}`,
    ).then((response) => {
      setProjectAddress(response.data.map[entityDid])
    })
  }, [])

  const [steps, setSteps] = useState<string[]>(['Credit', 'Amount', 'Order', 'Sign'])
  const [asset, setAsset] = useState<Currency>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentMethod, setCurrentMethod] = useState<CreditMethod>(null)
  const [amount, setAmount] = useState<number>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Currency[]>([])
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

  const handleAmountChange = (event): void => {
    setAmount(event.target.value)
  }

  const handleMaxClick = (): void => {
    setAmount(tokenBalance(balances, asset.denom).amount - 0.005)
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

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      let formattedAmount: any = asset
      if (formattedAmount.denom === 'ixo') {
        formattedAmount = {
          amount: getUIXOAmount(String(amount)),
          denom: 'uixo',
        }
      }
      // handleSend(walletType, amount, address, memo)
      if (walletType === 'keysafe') {
        const msg = {
          type: currentMethod === CreditMethod.ADD ? 'cosmos-sdk/MsgSend' : 'project/WithdrawFunds',
          value: currentMethod === CreditMethod.ADD ? {
            amount: [formattedAmount],
            from_address: accountAddress,
            to_address: projectAddress,
          } : {
            senderDid: userInfo.didDoc.did,
            data: {
              projectDid : entityDid,
              recipientDid: userInfo.didDoc.did,
              amount: formattedAmount.amount,
              isRefund: true,
            }
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
          [msg],
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
          msgs: [
            {
              // TODO: add withdraw backend
              typeUrl: currentMethod === CreditMethod.ADD ? '/cosmos.bank.v1beta1.MsgSend' : '',
              value: MsgSend.fromPartial({
                fromAddress: address,
                toAddress: projectAddress,
                amount: [formattedAmount],
              }),
            },
          ],
          chain_id: process.env.REACT_APP_CHAIN_ID,
          fee: {
            amount: [{ amount: String(5000), denom: 'uixo' }],
            gas: String(200000),
          },
          memo,
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

  const handleCreditMethod = (method): void => {
    setCurrentMethod(method)
    handleChangeTitle(method)
    setSteps([method, 'Amount', 'Order', 'Sign'])
    handleNextStep()
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
      default:
        return false
    }
  }
  const enablePrevStep = (): boolean => {
    switch (currentStep) {
      case 1:
      case 2:
        return true
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

  const generateTXMessage = (txStatus: TXStatus): string => {
    switch (txStatus) {
      case TXStatus.PENDING:
        return 'Sign the Transaction'
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
      setAmount(null)
      getBalances(accountAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance) => {
            if (balance.denom === 'uixo') {
              //  default to ixo
              setAsset({
                denom: 'ixo',
                amount: getBalanceNumber(new BigNumber(balance.amount)),
              })
              return {
                denom: 'ixo',
                amount: getBalanceNumber(new BigNumber(balance.amount)),
              }
            }
            return balance
          }),
        )
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
          <CheckWrapper>
            <TokenSelector
              selectedToken={asset}
              tokens={balances}
              label={
                asset &&
                `${thousandSeparator(asset.amount.toFixed(0), ',')} Available`
              }
              handleChange={handleTokenChange}
              disable={currentStep !== 0}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <CheckWrapper>
            <div className="mt-3" />
            <ModalInput
              invalid={projectAddress.length > 0 && !checkValidAddress(projectAddress)}
              invalidLabel={'This is not a valid account address'}
              disable={true}
              preIcon={
                projectAddress.length === 0 || checkValidAddress(projectAddress)
                  ? QRCodeIcon
                  : QRCodeRedIcon
              }
              placeholder="Project Address"
              value={projectAddress}
              handleChange={():void => {
                //
              }}
            />
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
          <OverlayWrapper>
            <img src={OverlayButtonIcon} alt="down" />
          </OverlayWrapper>
        </>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className="mb-4" />
          <CheckWrapper className="d-flex align-items-center">
            {currentMethod === CreditMethod.WITHDRAW && (
              <MaxButton className="mr-3" onClick={handleMaxClick}>
                MAX
              </MaxButton>
            )}
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
            {currentStep === 2 && (
              <img className="check-icon" src={CheckIcon} alt="check-icon" />
            )}
          </CheckWrapper>
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

      {currentStep === 0 && (
        <CreditMethodWrapper>
          <button
            onClick={(): void => handleCreditMethod(CreditMethod.ADD)}
          >
            {CreditMethod.ADD}
          </button>
          <button
            onClick={(): void => handleCreditMethod(CreditMethod.WITHDRAW)}
          >
            {CreditMethod.WITHDRAW}
          </button>
        </CreditMethodWrapper>
      )}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt="next-step" />
        </NextStep>
      )}
      {enablePrevStep() && (
        <PrevStep onClick={handlePrevStep}>
          <img src={NextStepIcon} alt="prev-step" />
        </PrevStep>
      )}
    </Container>
  )
}

export default FuelEntityModal
