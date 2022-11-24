import React, { ChangeEvent, HTMLAttributes, KeyboardEvent, useEffect, useMemo, useState } from 'react'
import Select, { components } from 'react-select'
import LockIcon from 'assets/images/exchange/lock.svg'
import ArrowLeftIcon from 'assets/images/exchange/arrow-left.svg'
import CirclePayLogo from 'assets/images/exchange/circle-pay-logo.png'
import MasterCardLogo from 'assets/images/exchange/mastercard.svg'
import VisaCardLogo from 'assets/images/exchange/visa.svg'
import { ReactComponent as CheckIcon } from 'assets/images/modal/check.svg'
import { ReactComponent as ChevDownIcon } from 'assets/images/exchange/chev-down.svg'
import { ReactComponent as ClockIcon } from 'assets/images/exchange/clock.svg'
import {
  CirclePayInput,
  CirclePaySubmitButton,
  CirclePayLogoEl,
  Container,
  HeaderTitle,
  LabelWrapper,
  LockIconEl,
  EnvelopeIconEl,
  CirclePayBackButtonEl,
  CreditCardLogo,
  NftSummary,
  NftSummaryInfo,
  NftSummaryPrice,
  NftSummaryLogo,
  NftSummaryDesc,
  NftSummaryName,
  NftSummaryNo,
  CirclePayRow,
  CircleUserAgreeWrapper,
  CircleUserAgreeRadio,
  CircleUserAgreeText,
  CirclePayLink,
  cardSelectorStyles,
  QuoteRefreshWrapper,
} from './CircleCheckoutStep.styles'
import { theme } from 'modules/App/App.styles'
import { displayTokenAmount } from 'common/utils/currency.utils'

let timer: NodeJS.Timeout | null = null

type CircleLabelWrapperProps = { label: string } & HTMLAttributes<HTMLDivElement>
const CircleLabelWrapper = ({ label, children, ...rest }: CircleLabelWrapperProps): JSX.Element => {
  return (
    <LabelWrapper {...rest}>
      <label>{label}</label>
      {children}
    </LabelWrapper>
  )
}

type NftSummaryWrapperProps = { nftAsset: any; nftPrice: any } & HTMLAttributes<HTMLDivElement>
const NftSummaryWrapper = ({ nftAsset, nftPrice }: NftSummaryWrapperProps): JSX.Element => {
  return (
    <NftSummary>
      <NftSummaryInfo>
        <NftSummaryLogo src={nftAsset.image} alt='' />
        <NftSummaryDesc>
          <NftSummaryName>{nftAsset.symbol}</NftSummaryName>
          <NftSummaryNo># {nftAsset.id}</NftSummaryNo>
        </NftSummaryDesc>
      </NftSummaryInfo>
      <NftSummaryPrice>for ${displayTokenAmount(nftPrice, 2)}</NftSummaryPrice>
    </NftSummary>
  )
}

const EmailSetupStep = ({ email, setEmail, handleSubmit }: any): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }
  return (
    <>
      <HeaderTitle>The payment with a credit card is processed using Circle, a secure third party company.</HeaderTitle>
      <form onSubmit={handleSubmit}>
        <CircleLabelWrapper label='Email address'>
          <CirclePayInput
            type='email'
            id='email'
            value={email}
            onChange={handleChange}
            placeholder='hello@example.net'
          />
        </CircleLabelWrapper>
        <CirclePaySubmitButton type='submit' disabled={!email}>
          Continue with Circle
        </CirclePaySubmitButton>
      </form>
    </>
  )
}
const EmailVerificationStep = ({ handleSubmit }: any): JSX.Element => {
  const [verified, setVerified] = useState(false)

  // TODO: temporary hack, know user verified
  useEffect(() => {
    setTimeout(() => {
      setVerified(true)
    }, 1000 * 3)
  }, [])

  return (
    <>
      <HeaderTitle color={verified ? theme.ixoGreen : theme.neutralDarkGrey}>
        {verified ? 'Email verification successful!' : 'Check your provided email for a secure login link.'}
      </HeaderTitle>
      <form onSubmit={handleSubmit}>
        <EnvelopeIconEl isactive={String(verified)} />
        <CirclePaySubmitButton type='submit' disabled={!verified}>
          Continue
        </CirclePaySubmitButton>
      </form>
    </>
  )
}
const CardSetupStep = ({
  cardHolder,
  setCardHolder,
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  handleSubmit,
}: any): JSX.Element => {
  const canSubmit = useMemo(
    () => cardHolder && cardNumber && expiryDate && cvv,
    [cardHolder, cardNumber, expiryDate, cvv],
  )

  const formatCardNumber = (number: string): string => {
    let formattedNumber = number
    let insertPositions = []

    for (let i = 0; i < formattedNumber.length; i++) {
      if (i % 4 === 0 && i > 0) {
        insertPositions.push(i)
      }
    }
    insertPositions = insertPositions.reverse()
    insertPositions.forEach((position) => {
      formattedNumber = formattedNumber.substring(0, position) + ' ' + formattedNumber.substring(position)
    })
    return formattedNumber
  }

  const handleCardHolderChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCardHolder(e.target.value)
  }
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCardNumber(e.target.value.replace(/ /g, ''))
  }
  const handleExpiryDateChange = (): void => {
    //
  }
  const handleExpiryDateKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const delim = ' / '
    const key = e.key
    let value = expiryDate || ''

    if (key === 'Backspace') {
      if (value.length === 2 + delim.length) {
        value = value.slice(0, value.length - delim.length)
      }
      value = value.slice(0, value.length - 1)
    } else if (!isNaN(Number(key))) {
      if (value.length === 0) {
        if (2 <= Number(key) && Number(key) <= 9) {
          value += '0' + key + delim
        } else {
          value += key
        }
      } else if (value.length === 1) {
        if (0 <= Number(key) && Number(key) <= 2) {
          value += key + delim
        }
      } else if (value.length === 2) {
        value += delim + key
      } else if (value.length < 4 + delim.length) {
        value += key
      }
    }
    setExpiryDate(value)
  }
  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCvv(e.target.value)
  }
  return (
    <>
      <HeaderTitle style={{ display: 'flex', gap: 10 }}>
        <img src={LockIcon} alt='' />
        Your card details are secure.
      </HeaderTitle>
      <form onSubmit={handleSubmit}>
        <CircleLabelWrapper label='Cardholder' style={{ marginBottom: 20 }}>
          <CirclePayInput
            type='text'
            id='card-holder'
            value={cardHolder}
            onChange={handleCardHolderChange}
            placeholder='Name on your card'
          />
        </CircleLabelWrapper>
        <CircleLabelWrapper label='Card number' style={{ marginBottom: 20 }}>
          <CirclePayRow>
            <CirclePayInput
              type='tel'
              id='card-number'
              value={formatCardNumber(cardNumber)}
              onChange={handleCardNumberChange}
              placeholder='1234 1234 1234 1234'
              pattern='[0-9\s]{19}'
            />
            <CreditCardLogo style={{ right: -40, left: 'auto' }} src={VisaCardLogo} alt='' />
            <CreditCardLogo style={{ right: -80, left: 'auto' }} src={MasterCardLogo} alt='' />
          </CirclePayRow>
        </CircleLabelWrapper>
        <CircleLabelWrapper label='Expiry date' style={{ marginBottom: 20 }}>
          <CirclePayInput
            type='text'
            id='expiry-date'
            value={expiryDate}
            onChange={handleExpiryDateChange}
            onKeyDown={handleExpiryDateKeyDown}
            placeholder='mm / yy'
            pattern='(?:0[1-9]|1[0-2]) / [0-9]{2}'
          />
        </CircleLabelWrapper>
        <CircleLabelWrapper label='Security code (CVV)' style={{ marginBottom: 20 }}>
          <CirclePayInput
            type='tel'
            id='cvv'
            value={cvv}
            onChange={handleCvvChange}
            placeholder='123'
            pattern='[0-9]{3}'
            min={3}
            max={4}
          />
        </CircleLabelWrapper>
        <CirclePaySubmitButton type='submit' disabled={!canSubmit}>
          Continue
        </CirclePaySubmitButton>
      </form>
    </>
  )
}
const CardUseStep = ({ previousCards, handleNewCard, handleSubmit }: any): JSX.Element => {
  const [selectedCard, setSelectedCard] = useState<CardInfo>(previousCards[0])
  const options = useMemo(
    () =>
      previousCards.map((card: any) => ({
        value: card,
        label: `${card.type} ${card.last4}`,
      })),
    [previousCards],
  )
  const DropdownIndicator = (props: any): JSX.Element => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevDownIcon />
      </components.DropdownIndicator>
    )
  }
  const ValueContainer = (props: any): JSX.Element => (
    <components.ValueContainer {...props}>
      <img src={MasterCardLogo} alt='' />
      {props.children}
    </components.ValueContainer>
  )
  return (
    <>
      <HeaderTitle>Please select a previously used card or enter the details of a new card.</HeaderTitle>

      <form
        onSubmit={(): void => {
          handleSubmit(selectedCard)
        }}
      >
        <CircleLabelWrapper label='Previously used card' style={{ marginBottom: 40 }}>
          <Select
            components={{ ValueContainer, DropdownIndicator }}
            styles={cardSelectorStyles}
            options={options}
            menuPosition='fixed'
            menuPortalTarget={document.body}
            value={{
              value: selectedCard,
              label: `${selectedCard.type} ${selectedCard.last4}`,
            }}
            onChange={(event: any): void => {
              setSelectedCard(event.value)
            }}
          />
        </CircleLabelWrapper>
        <CirclePayLink onClick={handleNewCard}>Enter new card</CirclePayLink>
        <CirclePaySubmitButton type='submit'>Continue</CirclePaySubmitButton>
      </form>
    </>
  )
}
const OrderConfirm = ({ nftAsset, cardInfo, handleSubmit }: any): JSX.Element => {
  const [userAgree, setUserAgree] = useState(false)
  const [nftPrice, setNftPrice] = useState(12345.2352)
  const [remainingSec, setRemainingSec] = useState(3)

  const updateNftPrice = async (): Promise<void> => {
    // TODO: blocksync / blockchain api call to update nft price
    if (remainingSec === 0) {
      setNftPrice((prev) => prev + 1)
    }
    setRemainingSec((prev) => (prev > 0 ? prev - 1 : 3))
  }

  useEffect(() => {
    timer = setTimeout(updateNftPrice, 1000)
    return (): void => {
      clearTimeout(timer!)
    }
    // eslint-disable-next-line
  }, [remainingSec])

  return (
    <>
      <HeaderTitle>Please check if all the information is correct before finalising your purchase.</HeaderTitle>
      <form
        onSubmit={(): void => {
          handleSubmit(nftPrice)
        }}
      >
        <CircleLabelWrapper label='Paying with' style={{ marginBottom: 20 }}>
          <CirclePayRow>
            <CirclePayInput
              type='text'
              id='card-info'
              value={`${cardInfo.type} ${cardInfo.last4}`}
              style={{ paddingLeft: 50 }}
              disabled
            />
            <CreditCardLogo
              src={
                MasterCardLogo // TODO: TBD
              }
              alt=''
            />
          </CirclePayRow>
        </CircleLabelWrapper>
        <CircleLabelWrapper label='Receiving Account Address' style={{ marginBottom: 20 }}>
          <CirclePayInput type='text' id='nft-did' value={nftAsset.entityId} disabled />
        </CircleLabelWrapper>
        <CircleLabelWrapper label='Order' style={{ marginBottom: 20 }}>
          <NftSummaryWrapper nftAsset={nftAsset} nftPrice={nftPrice} />
          <QuoteRefreshWrapper>
            <ClockIcon />
            Quote updates in {remainingSec}s
          </QuoteRefreshWrapper>
        </CircleLabelWrapper>
        <CircleUserAgreeWrapper>
          <CircleUserAgreeRadio
            checked={userAgree}
            onClick={(): void => {
              setUserAgree((prev) => !prev)
            }}
          >
            {userAgree && <CheckIcon />}
          </CircleUserAgreeRadio>
          <CircleUserAgreeText
            onClick={(): void => {
              setUserAgree((prev) => !prev)
            }}
          >
            I agree to Circle’s Terms of Use and I authorise Circle to debit my chosen payment method for the amount
            above on today’s date and understand that this can not be cancelled, recalled or refunded.
          </CircleUserAgreeText>
        </CircleUserAgreeWrapper>
        <CirclePaySubmitButton type='submit' disabled={!userAgree}>
          Pay ${displayTokenAmount(nftPrice, 2)}
        </CirclePaySubmitButton>
      </form>
    </>
  )
}

enum Steps {
  EmailInput = 'email/input',
  EmailVerification = 'email/check',
  CardInput = 'card/input',
  CardUse = 'card/use',
  OrderConfirm = 'order/confirm',
}
interface Props {
  nftAsset: any // TODO: type: TBD
  handleFinished: () => void
}
interface CardInfo {
  id: string
  type: 'Mastercard' | 'Visa' //  TODO: type: TBD
  last4: number
}
const CircleCheckout: React.FC<Props> = ({ nftAsset, handleFinished }): JSX.Element => {
  const [stepsHistory, setStepsHistory] = useState<Steps[]>([Steps.EmailInput])
  const currentStep = useMemo(() => {
    const length = stepsHistory.length
    return stepsHistory[length - 1]
  }, [stepsHistory])
  const canBack = useMemo(
    () => currentStep !== Steps.EmailInput && currentStep !== Steps.EmailVerification,
    [currentStep],
  )
  const [previousCards, setPreviousCards] = useState<CardInfo[]>([])

  const [email, setEmail] = useState<string>('')
  const [cardHolder, setCardHolder] = useState<string>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [expiryDate, setExpiryDate] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')
  const [cardToUse, setCardToUse] = useState<CardInfo | undefined>(undefined)

  const handleEmailSubmit = (): void => {
    // TODO: circle pay api call to send email verification code
    setStepsHistory((prev) => [...prev, Steps.EmailVerification])
  }
  const handleEmailVerified = (): void => {
    // TODO: circle pay api call to get previous cards and setPreviousCards
    // setPreviousCards(xxx)
    const cardsFromApi: CardInfo[] = [
      { id: 'circlepay:33efjd...', type: 'Mastercard', last4: 3563 },
      { id: 'circlepay:d3efjd...', type: 'Mastercard', last4: 3214 },
    ]

    const newStepsHistory = [...stepsHistory]
    newStepsHistory.pop()
    if (cardsFromApi.length > 0) {
      setPreviousCards(cardsFromApi)
      newStepsHistory.push(Steps.CardUse)
    } else {
      newStepsHistory.push(Steps.CardInput)
    }
    setStepsHistory(newStepsHistory)
  }
  const handleCardSubmit = (): void => {
    // TODO: circle pay api call to check card details valid and link cards
    setCardToUse({ id: 'circlepay:e3efjd...', type: 'Mastercard', last4: 1234 })
    setStepsHistory((prev) => [...prev, Steps.OrderConfirm])
  }
  const handleNewCard = (): void => {
    setStepsHistory((prev) => [...prev, Steps.CardInput])
  }
  const handlePreviousCardSubmit = (card: CardInfo): void => {
    // TODO: sure there should be also circle pay api call to use previous card
    setCardToUse(card)
    setStepsHistory((prev) => [...prev, Steps.OrderConfirm])
  }
  const handleOrderConfirm = (nftPrice: number): void => {
    // TODO: circle pay api call to process pay
    handleFinished()
    console.log('nftPrice', nftPrice)
  }

  const handleBackButton = (): void => {
    const prevStepsHistory = [...stepsHistory]
    prevStepsHistory.pop()
    setStepsHistory(prevStepsHistory)
  }

  return (
    <Container>
      <LockIconEl src={LockIcon} alt='' />
      <CirclePayLogoEl src={CirclePayLogo} alt='' />
      {canBack && <CirclePayBackButtonEl src={ArrowLeftIcon} alt='' onClick={handleBackButton} />}

      {currentStep === Steps.EmailInput && (
        <EmailSetupStep email={email} setEmail={setEmail} handleSubmit={handleEmailSubmit} />
      )}
      {currentStep === Steps.EmailVerification && <EmailVerificationStep handleSubmit={handleEmailVerified} />}
      {currentStep === Steps.CardInput && (
        <CardSetupStep
          cardHolder={cardHolder}
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          cvv={cvv}
          setCardHolder={setCardHolder}
          setCardNumber={setCardNumber}
          setExpiryDate={setExpiryDate}
          setCvv={setCvv}
          handleSubmit={handleCardSubmit}
        />
      )}
      {currentStep === Steps.CardUse && previousCards.length > 0 && (
        <CardUseStep
          previousCards={previousCards}
          handleNewCard={handleNewCard}
          handleSubmit={handlePreviousCardSubmit}
        />
      )}
      {currentStep === Steps.OrderConfirm && cardToUse && (
        <OrderConfirm nftAsset={nftAsset} cardInfo={cardToUse} handleSubmit={handleOrderConfirm} />
      )}
    </Container>
  )
}

export default CircleCheckout
