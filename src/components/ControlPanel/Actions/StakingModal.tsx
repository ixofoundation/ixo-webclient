import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import Axios from 'axios'
import Lottie from 'react-lottie'
import TokenSelector from 'components/TokenSelector/TokenSelector'
import { StepsTransactions } from 'components/StepsTransactions/StepsTransactions'
import AmountInput from 'components/AmountInput/AmountInput'
import OverlayButtonDownIcon from 'assets/images/modal/overlaybutton-down.svg'
import OverlayButtonUpIcon from 'assets/images/modal/overlaybutton-up.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import EyeIcon from 'assets/images/icon-eye.svg'
import CheckIcon from 'assets/images/icon-check.svg'
import { getDisplayAmount } from 'utils/currency'
import { BigNumber } from 'bignumber.js'
import { apiCurrencyToCurrency } from 'redux/account/account.utils'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import ValidatorSelector, { ValidatorInfo } from 'components/ValidatorSelector/ValidatorSelector'
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
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { requireCheckDefault } from 'utils/images'

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
  walletType: string
  accountAddress: string
  defaultValidator?: ValidatorInfo | null
  handleStakingMethodChange: (method: string) => void
}

const StakingModal: React.FunctionComponent<Props> = ({
  walletType,
  accountAddress,
  defaultValidator = null,
  handleStakingMethodChange,
}) => {
  const [steps, setSteps] = useState(['Validator', 'Amount', 'Order', 'Sign'])
  const [asset, setAsset] = useState<Coin | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [validatorAddress, setValidatorAddress] = useState<string | null>(
    defaultValidator ? defaultValidator.address : null,
  )
  const [validatorDstAddress, setValidatorDstAddress] = useState<string | null>(null)
  const [selectedStakingMethod, setSelectedStakingMethod] = useState<StakingMethod>(StakingMethod.UNSET)
  const [amount, setAmount] = useState<number | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [memoStatus, setMemoStatus] = useState<string>('nomemo')
  const [balances, setBalances] = useState<Coin[]>([])
  const [validators, setValidators] = useState<ValidatorInfo[]>([])
  // const [, setDelegatedValidators] = useState<any[]>([])
  const [selectedValidator, setSelectedValidator] = useState<ValidatorInfo | null>(defaultValidator)
  const [selectedValidatorDst, setSelectedValidatorDst] = useState<ValidatorInfo | null>(null)
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [signTXhash, setSignTXhash] = useState<string | null>(null)
  const [sumOfRewards, setSumOfRewards] = useState<number>(0)

  const handleTokenChange = (token: Coin): void => {
    setAsset(token)
  }

  const handleValidatorChange = (validator: ValidatorInfo): void => {
    setValidatorAddress(validator.address)
    setSelectedValidator(validator)
  }
  const handleValidatorDstChange = (validator: ValidatorInfo): void => {
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
      setSteps(['Validators', '', '', 'Sign'])
      setAsset(balances.filter(({ denom }) => denom === 'ixo')[0])
    } else {
      setSteps(['Validator', 'Amount', 'Order', 'Sign'])
    }
    handleStakingMethodChange(`${label} My Stake`)
    setSelectedStakingMethod(label)
  }

  const handleViewTransaction = (): void => {
    window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${signTXhash}`, '_blank')!.focus()
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
            if (asset) {
              return true
            }
            return false
          default:
            if (asset && validatorAddress) {
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

  const getBalances = async (address: string): Promise<any> => {
    return Axios.get(process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address).then((response) => {
      return {
        balances: response.data.result.map((coin: any) => apiCurrencyToCurrency(coin)),
      }
    })
  }

  const getValidators = (): Promise<any> => {
    return Axios.get(`${process.env.REACT_APP_GAIA_URL}/staking/validators`)
      .then((response) => response.data)
      .then(async ({ result }) => {
        return await result.map(async (validator: any) => {
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
              .catch(() => requireCheckDefault(require('assets/img/relayer.png')))
          } else {
            logo = requireCheckDefault(require('assets/img/relayer.png'))
          }

          const delegation = await Axios.get(
            `${process.env.REACT_APP_GAIA_URL}/cosmos/staking/v1beta1/validators/${validator.operator_address}/delegations/${accountAddress}`,
          )
            .then((response) => response.data)
            .then((response) => response.delegation_response)
            .then((response) => response.balance)
            .then(({ amount, denom }) => ({
              amount: denom !== 'uixo' ? amount : getDisplayAmount(new BigNumber(amount)),
              denom: denom !== 'uixo' ? denom : 'ixo',
            }))
            .catch(() => null)

          return {
            address: validator.operator_address,
            name: validator.description.moniker,
            logo,
            commission: Number(validator.commission.commission_rates.rate * 100).toFixed(0) + '%',
            delegation,
          }
        })
      })
  }
  const getAllRewards = (): Promise<any> => {
    return (
      Axios.get(`${process.env.REACT_APP_GAIA_URL}/cosmos/distribution/v1beta1/delegators/${accountAddress}/rewards`)
        .then((response) => response.data)
        // .then((response) => response.total[0])
        // .then(({ amount }) =>
        //   Number(getDisplayAmount(new BigNumber(amount)).toFixed(0)),
        // )
        .catch(() => ({ rewards: [], total: 0 }))
    )
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
      setValidators([])
      getBalances(accountAddress).then(({ balances }) => {
        setBalances(
          balances.map((balance: any) => {
            if (balance.denom === 'uixo') {
              //  default to ixo
              setAsset({
                denom: 'ixo',
                amount: getDisplayAmount(new BigNumber(balance.amount)),
              })
              return {
                denom: 'ixo',
                amount: getDisplayAmount(new BigNumber(balance.amount)),
              }
            }
            return balance
          }),
        )
      })
      getValidators().then((response) => {
        response.map(async (item: any) => {
          const validator = await item
          setValidators((old) => [...old, validator])
        })
      })
      getAllRewards().then(({ rewards, total }) => {
        // setDelegatedValidators(rewards)
        setSumOfRewards(Number(getDisplayAmount(new BigNumber(total[0]?.amount))))
      })
    }
    if (currentStep < 3) {
      setSignTXStatus(TXStatus.PENDING)
      setSignTXhash(null)
    }
    // eslint-disable-next-line
  }, [currentStep])

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
                placeholder={!defaultValidator ? 'All Validators' : defaultValidator.name}
                label={`${thousandSeparator(
                  !defaultValidator ? sumOfRewards : defaultValidator.reward!.amount,
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
                  selectedToken={asset!}
                  tokens={balances}
                  handleChange={handleTokenChange}
                  disable={currentStep !== 0 || selectedStakingMethod === StakingMethod.GETREWARD}
                  label={
                    (asset &&
                      selectedStakingMethod !== StakingMethod.GETREWARD &&
                      `${thousandSeparator(asset.amount, ',')} Available`) ||
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
                  Commission: <strong>{selectedValidatorDst.commission}</strong>
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
              suffix={asset!.denom.toUpperCase()}
            />
            {currentStep === 2 && <img className='check-icon' src={CheckIcon} alt='check-icon' />}
          </CheckWrapper>
          <LabelWrapper className='mt-2'>
            <Label>
              Network fees: <strong>0.05 {asset!.denom.toUpperCase()}</strong>
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
