import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import BigNumber from 'bignumber.js'
import Lottie from 'react-lottie'
import { Currency } from 'types/models'
import TokenSelector from 'common/components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import AmountInput from 'common/components/AmountInput/AmountInput'

import OverlayButtonDownIcon from 'assets/images/modal/overlaybutton-down.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/eye-icon.svg'
import CheckIcon from 'assets/images/modal/check.svg'
import Ring from 'assets/icons/ring'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { nFormatter } from 'common/utils/currency.utils'
import {
  apiCurrencyToCurrency,
  denomToMinimalDenom,
  findDenomByMinimalDenom,
  formatCurrency,
  minimalDenomToDenom,
} from 'modules/Account/Account.utils'
import { broadCastMessage } from 'common/utils/keysafe'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { thousandSeparator } from 'common/utils/formatters'
import { getPriceHistory } from 'modules/BondModules/bond/bond.actions'
import SlippageSelector, { SlippageType } from 'common/components/SlippageSelector/SlippageSelector'

import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import WalletSelectModal from 'common/components/ControlPanel/Actions/WalletSelectModal'
import {
  Container,
  NextStep,
  TXStatusBoard,
  PrevStep,
  CheckWrapper,
  OverlayWrapper,
  Divider,
  LabelWrapper,
  Label,
} from './Modal.styles'

enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

const VotingModal: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const [steps] = useState(['Stake', 'Amount', 'Order', 'Sign'])
  const [asset, setAsset] = useState<Currency | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [bondAmount, setBondAmount] = useState<number | undefined>(undefined)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Currency[]>([])
  const [slippage, setSlippage] = useState<SlippageType>(SlippageType.Ten)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)
  const [estReserveAmount, setESTReserveAmount] = useState<number>(0)
  const [txFees, setTxFees] = useState<Currency | null>(null)

  const {
    userInfo,
    address: accountAddress,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const { bondDid } = useSelector((state: RootState) => state.selectedEntity)
  const {
    myStake: bondToken,
    // state: bondState,
    lastPrice,
    maxSupply,
    reserveDenom,
    symbol,
  } = useSelector((state: RootState) => state.activeBond)

  const amountValidation = useMemo(
    () =>
      bondAmount! > 0 &&
      new BigNumber(
        formatCurrency({
          amount: bondAmount,
          denom: symbol,
        }).amount!,
      ).toNumber() <=
        new BigNumber(maxSupply.amount!).toNumber() - new BigNumber(bondToken!.amount!).toNumber() &&
      bondAmount! <= asset!.amount!,
    // eslint-disable-next-line
    [bondAmount],
  )

  const handleTokenChange = (token: Currency): void => {
    setAsset(token)
  }

  const handleAmountChange = (event: any): void => {
    setBondAmount(event.target.value)
  }

  const handleMemoChange = (event: any): void => {
    const value = event.target.value
    setMemo(value)
    if (value.length > 0) {
      setMemoStatus('memowith')
    } else {
      setMemoStatus('nomemo')
    }
  }

  const generateTXRequestMSG = (): any => {
    const msgs = []
    msgs.push({
      type: 'bonds/MsgBuy',
      value: {
        buyer_did: userInfo.didDoc.did,
        amount: {
          amount: bondAmount,
          denom: bondToken!.denom,
        },
        max_prices: [
          {
            amount: denomToMinimalDenom(findDenomByMinimalDenom(reserveDenom), estReserveAmount, true),
            denom: reserveDenom,
          },
        ],
        bond_did: bondDid,
      },
    })
    return msgs
  }

  const generateTXRequestFee = (): any => {
    const fee = {
      amount: [{ amount: String(5000), denom: 'uixo' }],
      gas: String(200000),
    }
    return fee
  }

  const signingTX = async (): Promise<void> => {
    const msgs = generateTXRequestMSG()
    const fee = generateTXRequestFee()

    if (msgs.length === 0) {
      return
    }

    broadCastMessage(userInfo, userSequence as any, userAccountNumber as any, msgs, memo, fee, (hash: any) => {
      if (hash) {
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(hash)
      } else {
        setSignTXStatus(TXStatus.ERROR)
      }
    })
  }

  const handlePrevStep = (): void => {
    if (currentStep === 0) {
      return
    }
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
    if (currentStep === 2) {
      await signingTX()
    }
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleViewTransaction = (): void => {
    window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`, '_blank')!.focus()
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        if (
          bondAmount &&
          bondAmount > 0 &&
          (memoStatus === 'nomemo' || memoStatus === 'memodone') &&
          amountValidation
          // true
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
  const enablePrevStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return false
      case 1:
      case 2:
        return true
      default:
        return false
    }
  }

  const chooseAnimation = (txStatus: any): any => {
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
    return Axios.get(process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address).then((response) => {
      return {
        balances: response.data.result.map((coin: any) => apiCurrencyToCurrency(coin)),
      }
    })
  }

  const getBuyPrice = async (bondDid: string, amount: number): Promise<void> => {
    Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${bondDid}/buy_price/${amount ?? 0}`)
      .then((response) => response.data)
      .then((response) => response.result)
      .then((response) => {
        const { tx_fees } = response
        setTxFees(formatCurrency(tx_fees[0]))
      })
      .catch(() => {
        //
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
    if (currentStep === 0 && accountAddress) {
      getBalances(accountAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance: any) => {
            if (balance.denom === reserveDenom) {
              setAsset(formatCurrency(balance))
            }
            return formatCurrency(balance)
          }),
        )
      })
    }
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
    // eslint-disable-next-line
  }, [currentStep, reserveDenom, accountAddress])

  useEffect(() => {
    if (bondDid) {
      // dispatch(getBondBalances(bondDid))
      dispatch(getPriceHistory(bondDid) as any)
    }
    // eslint-disable-next-line
  }, [bondDid])

  useEffect(() => {
    if (bondAmount! > 0) {
      // TODO: xusd exception
      setESTReserveAmount(bondAmount! * ((minimalDenomToDenom(reserveDenom, lastPrice) * (slippage + 100)) / 100))
    }
    // eslint-disable-next-line
  }, [bondAmount, lastPrice])

  useEffect(() => {
    if (bondDid) {
      getBuyPrice(bondDid, Number(estReserveAmount.toFixed(0)))
    }
  }, [bondDid, estReserveAmount])

  if (!accountAddress) {
    return (
      <ModalWrapper
        isModalOpen={!accountAddress}
        header={{
          title: 'Select Wallet',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => {
          //
        }}
      >
        <WalletSelectModal
          handleSelect={(): void => {
            //
          }}
          availableWallets={['keysafe']}
        />
      </ModalWrapper>
    )
  }

  return (
    <Container>
      <div className='px-4 pb-4'>
        <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
      </div>

      {currentStep < 3 && (
        <>
          <CheckWrapper>
            <TokenSelector
              selectedToken={asset!}
              tokens={balances}
              handleChange={handleTokenChange}
              disable={true}
              label={(asset && `My Balance ${thousandSeparator(asset!.amount!.toFixed(0), ',')}`) || undefined}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <div className='mt-3' />
          <CheckWrapper>
            <TokenSelector
              selectedToken={bondToken!}
              tokens={[bondToken!]}
              handleChange={handleTokenChange}
              disable={true}
              icon={<Ring fill='#00D2FF' />}
              label={`MAX Available ${nFormatter(
                minimalDenomToDenom(symbol, new BigNumber(maxSupply.amount!).toNumber()) -
                  new BigNumber(bondToken!.amount!).toNumber(),
                2,
              )} of ${nFormatter(minimalDenomToDenom(symbol, new BigNumber(maxSupply.amount!).toNumber()), 2)}`}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <OverlayWrapper>
            <img src={OverlayButtonDownIcon} alt='down' />
          </OverlayWrapper>
        </>
      )}

      {currentStep === 0 && (
        <>
          <div className='mt-3' />
          <SlippageSelector
            lastPrice={lastPrice}
            denom={reserveDenom}
            symbol={symbol}
            slippage={slippage}
            handleChange={(newSlippage): void => setSlippage(newSlippage)}
          />
        </>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className='mt-3 mb-4' />
          <CheckWrapper>
            <AmountInput
              amount={bondAmount!}
              placeholder={`${bondToken!.denom!.toUpperCase()} Amount`}
              memo={memo}
              step={1}
              memoStatus={memoStatus}
              handleAmountChange={handleAmountChange}
              handleMemoChange={handleMemoChange}
              handleMemoStatus={setMemoStatus}
              disable={currentStep !== 1}
              suffix={bondToken!.denom!.toUpperCase()}
              error={bondAmount! > 0 && !amountValidation}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <LabelWrapper className='mt-2'>
            {(!bondAmount || amountValidation) && (
              <>
                <Label>
                  Network fees: <strong>0.005 IXO</strong>
                </Label>
                {currentStep === 1 && !bondAmount && (
                  <Label>
                    Last Price was{' '}
                    {symbol === 'xusd'
                      ? lastPrice
                      : formatCurrency({
                          amount: lastPrice,
                          denom: reserveDenom,
                        }).amount!.toFixed(2)}{' '}
                    {findDenomByMinimalDenom(reserveDenom).toUpperCase()} per {symbol.toUpperCase()}
                  </Label>
                )}
                {currentStep === 1 && bondAmount! > 0 && (
                  <Label>
                    You will pay approx. {estReserveAmount.toFixed(2)}{' '}
                    {findDenomByMinimalDenom(reserveDenom).toUpperCase()}
                  </Label>
                )}
                {currentStep === 2 && (
                  <Label>
                    Transaction fees:{' '}
                    <strong>
                      {txFees!.amount} {txFees!.denom!.toUpperCase()}
                    </strong>
                  </Label>
                )}
              </>
            )}
            {bondAmount! > 0 && !amountValidation && (
              <>
                <Label className='error'>
                  Offer amount is greater than the available number of {bondToken!.denom!.toUpperCase()}
                </Label>
              </>
            )}
          </LabelWrapper>
        </>
      )}
      {currentStep === 3 && (
        <TXStatusBoard className='mx-4 d-flex align-items-center flex-column'>
          <Lottie
            height={120}
            width={120}
            options={{
              loop: true,
              autoplay: true,
              animationData: chooseAnimation(signTXStatus),
            }}
          />
          <span className='status'>{signTXStatus}</span>
          <span className='message'>{generateTXMessage(signTXStatus)}</span>
          {signTXStatus === TXStatus.SUCCESS && (
            <div className='transaction mt-3' onClick={handleViewTransaction}>
              <img src={EyeIcon} alt='view transactions' />
            </div>
          )}
        </TXStatusBoard>
      )}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
      )}
      {enablePrevStep() && (
        <PrevStep onClick={handlePrevStep}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      )}
    </Container>
  )
}

export default VotingModal
