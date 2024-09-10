import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Lottie from 'react-lottie'
import TokenSelector from 'components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import AmountInput from 'components/AmountInput/AmountInput'
import OverlayButtonDownIcon from 'assets/images/modal/overlaybutton-down.svg'
import OverlayButtonUpIcon from 'assets/images/modal/overlaybutton-up.svg?url'
import NextStepIcon from 'assets/images/modal/nextstep.svg?url'
import EyeIcon from 'assets/images/icon-eye.svg?url'
import CheckIcon from 'assets/images/icon-check.svg?url'
import { convertDecCoinToCoin, getDisplayAmount } from 'utils/currency'
import { BigNumber } from 'bignumber.js'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import ValidatorSelector from 'components/ValidatorSelector/ValidatorSelector'
import { thousandSeparator } from 'utils/formatters'
import AllValidator from 'components/ValidatorSelector/AllValidator'
import {
  Container,
  CheckWrapper,
  NextStep,
  ButtonWrapper,
  TXStatusBoard,
  PrevStep,
  Label,
  OverlayWrapper,
  LabelWrapper,
  Divider,
} from './Modal.styles'
import { requireCheckDefault } from 'utils/images'
import { TValidatorModel } from 'redux/validator/validator.types'
import { useAccount } from 'hooks/account'
import { useValidators } from 'hooks/validator'
import {
  DistributionWithdrawDelegatorReward,
  GetDelegationTotalRewards,
  StakingBeginRedelegate,
  StakingDelegate,
  StakingUndelegate,
} from 'lib/protocol'
import { useIxoConfigs } from 'hooks/configs'
import { Coin } from '@cosmjs/proto-signing'
import { blockExplorerTransactionEndpoint } from 'constants/blockExplorers'

enum StakingMethod {
  UNSET = 'UNSET',
  DELEGATE = 'Delegate',
  UNDELEGATE = 'Undelegate',
  REDELEGATE = 'Redelegate',
  GETREWARD = 'Claim Reward',
}
enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface Props {
  accountAddress: string
  defaultValidator?: TValidatorModel | null
}

const StakingModal: React.FunctionComponent<Props> = ({ accountAddress, defaultValidator = null }) => {
  const { convertToMinimalDenom } = useIxoConfigs()
  const { displayBalances: balances, signingClient } = useAccount()
  const { validators } = useValidators()

  const [steps, setSteps] = useState(['Validator', 'Amount', 'Order', 'Sign'])
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [validatorAddress, setValidatorAddress] = useState<string | null>(
    defaultValidator ? defaultValidator.address : null,
  )
  const [validatorDstAddress, setValidatorDstAddress] = useState<string | null>(null)
  const [selectedStakingMethod, setSelectedStakingMethod] = useState<StakingMethod>(StakingMethod.UNSET)
  const [amount, setAmount] = useState<number | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [selectedValidator, setSelectedValidator] = useState<TValidatorModel | null>(defaultValidator)
  const [selectedValidatorDst, setSelectedValidatorDst] = useState<TValidatorModel | null>(null)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)
  const [sumOfRewards, setSumOfRewards] = useState<number>(0)

  const handleTokenChange = (token: Coin): void => {
    setSelectedCoin(token)
  }

  const handleValidatorChange = (validator: TValidatorModel): void => {
    setValidatorAddress(validator.address)
    setSelectedValidator(validator)
  }
  const handleValidatorDstChange = (validator: TValidatorModel): void => {
    setValidatorDstAddress(validator.address)
    setSelectedValidatorDst(validator)
  }

  const handleAmountChange = (event: any): void => {
    setAmount(event.target.value)
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

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    if (selectedStakingMethod === StakingMethod.GETREWARD) {
      setCurrentStep(3)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const handleStakingMethod = (label: StakingMethod): void => {
    if (label === StakingMethod.GETREWARD) {
      setSteps([defaultValidator ? 'Validator' : 'Validators', '', '', 'Sign'])
    } else {
      setSteps(['Validator', 'Amount', 'Order', 'Sign'])
    }
    setSelectedStakingMethod(label)
  }

  const handleViewTransaction = (): void => {
    window.open(`${blockExplorerTransactionEndpoint}${signTXhash}`, '_blank')!.focus()
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        switch (selectedStakingMethod) {
          case StakingMethod.UNSET:
            return false
          case StakingMethod.REDELEGATE:
            if (validatorAddress && validatorDstAddress) {
              return true
            }
            return false
          case StakingMethod.GETREWARD:
            if (selectedCoin) {
              return true
            }
            return false
          default:
            if (selectedCoin && validatorAddress) {
              return true
            }
            return false
        }
      case 1:
        if (amount && amount > 0 && (memoStatus === 'nomemo' || memoStatus === 'memodone')) {
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

  const handleDelegate = async () => {
    if (validatorAddress && amount) {
      const delegateAmount = convertToMinimalDenom({ amount: String(amount), denom: selectedCoin?.denom || '' })
      try {
        const { code, rawLog, transactionHash } = await StakingDelegate(signingClient, {
          delegatorAddress: accountAddress,
          validatorAddress,
          amount: delegateAmount!,
        })
        if (code) {
          throw rawLog
        }
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(transactionHash)
      } catch (e: any) {
        console.error('handleDelegate', e.message)
        setSignTXStatus(TXStatus.ERROR)
      }
    }
  }

  const handleUndelegate = async () => {
    if (validatorAddress && amount) {
      const delegateAmount = convertToMinimalDenom({ amount: String(amount), denom: selectedCoin?.denom || '' })
      try {
        const { code, rawLog, transactionHash } = await StakingUndelegate(signingClient, {
          delegatorAddress: accountAddress,
          validatorAddress,
          amount: delegateAmount!,
        })
        if (code) {
          throw rawLog
        }
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(transactionHash)
      } catch (e: any) {
        console.error('handleUndelegate', e.message)
        setSignTXStatus(TXStatus.ERROR)
      }
    }
  }

  const handleBeginRedelegate = async () => {
    if (validatorAddress && validatorDstAddress && amount) {
      const delegateAmount = convertToMinimalDenom({ amount: String(amount), denom: selectedCoin?.denom || '' })
      try {
        const { code, rawLog, transactionHash } = await StakingBeginRedelegate(signingClient, {
          delegatorAddress: accountAddress,
          validatorSrcAddress: validatorAddress,
          validatorDstAddress,
          amount: delegateAmount!,
        })
        if (code) {
          throw rawLog
        }
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(transactionHash)
      } catch (e: any) {
        console.error('handleBeginRedelegate', e.message)
        setSignTXStatus(TXStatus.ERROR)
      }
    }
  }

  const handleWithdrawDelegatorReward = async () => {
    if (validatorAddress) {
      try {
        const { code, rawLog, transactionHash } = await DistributionWithdrawDelegatorReward(signingClient, {
          delegatorAddress: accountAddress,
          validatorAddress,
        })
        if (code) {
          throw rawLog
        }
        setSignTXStatus(TXStatus.SUCCESS)
        setSignTXhash(transactionHash)
      } catch (e: any) {
        console.error('handleWithdrawDelegatorReward', e.message)
        setSignTXStatus(TXStatus.ERROR)
      }
    }
  }

  useEffect(() => {
    if (currentStep === 0) {
      GetDelegationTotalRewards(accountAddress).then((response) => {
        if (response) {
          const { total: totalDecCoin } = response
          const totalCoin = convertDecCoinToCoin(totalDecCoin[0])
          setSumOfRewards(Number(getDisplayAmount(new BigNumber(totalCoin?.amount))))
        }
      })
    } else if (currentStep === 3) {
      switch (selectedStakingMethod) {
        case StakingMethod.DELEGATE:
          handleDelegate()
          break
        case StakingMethod.UNDELEGATE:
          handleUndelegate()
          break
        case StakingMethod.REDELEGATE:
          handleBeginRedelegate()
          break
        case StakingMethod.GETREWARD:
          handleWithdrawDelegatorReward()
          break
        default:
          break
      }
    }
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
    // eslint-disable-next-line
  }, [currentStep])

  useEffect(() => {
    setSelectedCoin(balances.filter(({ denom }) => denom === 'ixo')[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(balances)])

  return (
    <Container>
      <div className='px-4 pb-4'>
        <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
      </div>

      {currentStep < 3 && (
        <>
          {selectedStakingMethod === StakingMethod.GETREWARD && (
            <>
              <AllValidator
                placeholder={!defaultValidator ? 'All Validators' : defaultValidator.moniker}
                label={`${thousandSeparator(
                  !defaultValidator ? sumOfRewards : new BigNumber(defaultValidator.reward?.amount ?? 0).toFixed(2),
                  ',',
                )} IXO Available`}
                logo={
                  !defaultValidator ? requireCheckDefault(require('assets/img/relayer.png')) : defaultValidator.logo
                }
              />
              <div className='mt-3' />
            </>
          )}
          {selectedStakingMethod !== StakingMethod.REDELEGATE && (
            <>
              <CheckWrapper>
                <TokenSelector
                  selectedToken={selectedCoin!}
                  tokens={balances}
                  handleChange={handleTokenChange}
                  disable={currentStep !== 0 || selectedStakingMethod === StakingMethod.GETREWARD}
                  label={
                    (selectedCoin &&
                      selectedStakingMethod !== StakingMethod.GETREWARD &&
                      `${thousandSeparator(selectedCoin.amount, ',')} Available`) ||
                    undefined
                  }
                />
                {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
              </CheckWrapper>
              <div className='mt-3' />
            </>
          )}
          {selectedStakingMethod !== StakingMethod.GETREWARD && (
            <CheckWrapper>
              <ValidatorSelector
                selectedValidator={selectedValidator!}
                validators={validators}
                handleChange={handleValidatorChange}
                disable={currentStep !== 0 || defaultValidator !== null}
                delegationLabel={
                  selectedStakingMethod === StakingMethod.REDELEGATE &&
                  selectedValidator &&
                  selectedValidator.delegation
                    ? `${thousandSeparator(
                        new BigNumber(selectedValidator.delegation.amount).toNumber(),
                        ',',
                      )} ${selectedValidator.delegation.denom?.toUpperCase()} Delegated`
                    : ''
                }
              />
              {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
            </CheckWrapper>
          )}
          <div className='mt-3' />
          {selectedStakingMethod === StakingMethod.REDELEGATE && (
            <>
              <CheckWrapper>
                <ValidatorSelector
                  selectedValidator={selectedValidatorDst!}
                  validators={validators}
                  handleChange={handleValidatorDstChange}
                  disable={currentStep !== 0}
                />
                {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
              </CheckWrapper>
              {selectedValidatorDst && (
                <Label className='mt-2'>
                  Commission: <strong>{selectedValidatorDst.commission}%</strong>
                </Label>
              )}
            </>
          )}
          <OverlayWrapper>
            <img
              src={selectedStakingMethod === StakingMethod.UNDELEGATE ? OverlayButtonUpIcon : OverlayButtonDownIcon}
              alt='down'
            />
          </OverlayWrapper>
        </>
      )}

      {currentStep === 0 && (
        <ButtonWrapper className='mt-3'>
          <button
            className={cx([
              {
                inactive: selectedStakingMethod !== StakingMethod.DELEGATE,
              },
              {
                active: selectedStakingMethod === StakingMethod.DELEGATE,
              },
            ])}
            onClick={(): void => handleStakingMethod(StakingMethod.DELEGATE)}
          >
            Delegate
          </button>
          <button
            className={cx([
              {
                inactive: selectedStakingMethod !== StakingMethod.UNDELEGATE,
              },
              {
                active: selectedStakingMethod === StakingMethod.UNDELEGATE,
              },
            ])}
            onClick={(): void => handleStakingMethod(StakingMethod.UNDELEGATE)}
          >
            Un-Delegate
          </button>
          <button
            className={cx([
              {
                inactive: selectedStakingMethod !== StakingMethod.REDELEGATE,
              },
              {
                active: selectedStakingMethod === StakingMethod.REDELEGATE,
              },
            ])}
            onClick={(): void => handleStakingMethod(StakingMethod.REDELEGATE)}
          >
            Re-Delegate
          </button>
          <button
            className={cx([
              {
                inactive: selectedStakingMethod !== StakingMethod.GETREWARD,
              },
              {
                active: selectedStakingMethod === StakingMethod.GETREWARD,
              },
            ])}
            onClick={(): void => handleStakingMethod(StakingMethod.GETREWARD)}
          >
            Claim Reward
          </button>
        </ButtonWrapper>
      )}

      {currentStep >= 1 && currentStep <= 2 && (
        <>
          <Divider className='mt-3 mb-4' />
          <CheckWrapper>
            <AmountInput
              amount={amount!}
              memo={memo}
              memoStatus={memoStatus}
              handleAmountChange={handleAmountChange}
              handleMemoChange={handleMemoChange}
              handleMemoStatus={setMemoStatus}
              disable={currentStep !== 1}
              suffix={selectedCoin!.denom.toUpperCase()}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <LabelWrapper className='mt-2'>
            <Label>
              Network fees: <strong>0.005 {selectedCoin!.denom.toUpperCase()}</strong>
            </Label>
            {currentStep === 2 && (
              <Label>
                {selectedStakingMethod === StakingMethod.DELEGATE && (
                  <>
                    Unstaking period is <strong>21 days</strong>
                  </>
                )}
                {selectedStakingMethod === StakingMethod.UNDELEGATE && (
                  <>
                    Available in <strong>21 days</strong> (no rewards)
                  </>
                )}
              </Label>
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

export default StakingModal
