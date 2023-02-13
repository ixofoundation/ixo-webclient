import React from 'react'
import {
  FuelEntityConfirmOrderWrapper,
  FuelEntityConfirmOrderHeader,
  FuelEntityConfirmOrderTitle,
  FuelEntityConfirmOrderSubTitle,
  FuelEntityConfirmOrderPrice,
  FuelEntityConfirmOrderCaption,
  FuelEntityConfirmOrderHR,
  ChatBotIconWrapper,
  ButtonWrapper,
  CancelOrderButton,
  ContinueOrderButton,
  BackButton,
} from './FuelEntityConfirmOrder.styles'
import IxoX from 'assets/icons/IxoX'
import ChatbotIcon from 'assets/icons/Chatbot'
import BackIcon from 'assets/icons/Back'

export interface Props {
  subscription: string
  symbol: string
  amount: string
  fiatAmount: string
  fiatConversionRate: string
  transactionFee: string
  fiatTransactionFee: string
  gasFee: string
  total: string
  fiatTotal: string
  handleConfirmOrder: () => void
  handleCancelOrder: () => void
}

const FuelEntityConfirmOrder: React.FunctionComponent<Props> = ({
  subscription,
  symbol,
  amount,
  fiatAmount,
  fiatConversionRate,
  transactionFee,
  fiatTransactionFee,
  gasFee,
  total,
  fiatTotal,
  handleConfirmOrder,
  handleCancelOrder,
}) => {
  return (
    <FuelEntityConfirmOrderWrapper>
      <BackButton onClick={handleCancelOrder}>
        <BackIcon width='18' fill='#A5ADB0' />
      </BackButton>
      <div className='row header-section'>
        <div className='col-12'>
          <FuelEntityConfirmOrderHeader>Order Summary</FuelEntityConfirmOrderHeader>
        </div>
        <div className='col-6 col-lg-4'>
          <FuelEntityConfirmOrderTitle>{subscription}</FuelEntityConfirmOrderTitle>
          <FuelEntityConfirmOrderCaption>Subscription</FuelEntityConfirmOrderCaption>
        </div>
        <div className='col-6 col-lg-4'>
          <FuelEntityConfirmOrderTitle>Included</FuelEntityConfirmOrderTitle>
          <FuelEntityConfirmOrderCaption>Standard Hosting Service</FuelEntityConfirmOrderCaption>
        </div>
      </div>

      <div className='row transaction-details-header'>
        <div className='col-4'>
          <FuelEntityConfirmOrderCaption>Description</FuelEntityConfirmOrderCaption>
        </div>
        <div className='col-5'>
          <FuelEntityConfirmOrderCaption>Price ({symbol})</FuelEntityConfirmOrderCaption>
        </div>
        <div className='col-3'>
          <FuelEntityConfirmOrderCaption>Rate</FuelEntityConfirmOrderCaption>
        </div>
      </div>

      <div className='row transaction-detail'>
        <div className='col-12 col-lg-4'>
          <FuelEntityConfirmOrderSubTitle>{symbol} Credits</FuelEntityConfirmOrderSubTitle>
        </div>
        <div className='col-6 col-lg-5'>
          <FuelEntityConfirmOrderPrice>
            <IxoX width='20' fill='#49BFE0' />
            {amount}
            <ChatBotIconWrapper onClick={handleCancelOrder}>
              <ChatbotIcon />
            </ChatBotIconWrapper>
          </FuelEntityConfirmOrderPrice>
        </div>
        <div className='col-6 col-lg-3'>
          <FuelEntityConfirmOrderSubTitle>{fiatAmount}</FuelEntityConfirmOrderSubTitle>
          <FuelEntityConfirmOrderCaption>
            1 {symbol} = {fiatConversionRate}
          </FuelEntityConfirmOrderCaption>
        </div>
      </div>

      <div className='row transaction-detail'>
        <div className='col-12 col-lg-4'>
          <FuelEntityConfirmOrderSubTitle>Additional Fees</FuelEntityConfirmOrderSubTitle>
        </div>
        <div className='col-6 col-lg-5'>
          <FuelEntityConfirmOrderSubTitle>
            <IxoX width='20' fill='#49BFE0' />
            {gasFee}
          </FuelEntityConfirmOrderSubTitle>
        </div>
        <div className='col-6 col-lg-3'>
          <FuelEntityConfirmOrderSubTitle>{transactionFee}</FuelEntityConfirmOrderSubTitle>
          <FuelEntityConfirmOrderCaption>{fiatTransactionFee}</FuelEntityConfirmOrderCaption>
        </div>
      </div>
      <FuelEntityConfirmOrderHR />

      <div className='row total-wrapper'>
        <div className='col-6 col-lg-4'>
          <FuelEntityConfirmOrderTitle>Today</FuelEntityConfirmOrderTitle>
          <FuelEntityConfirmOrderCaption>Amount due</FuelEntityConfirmOrderCaption>
        </div>
        <div className='col-6 col-lg-4'>
          <FuelEntityConfirmOrderTitle>{total}</FuelEntityConfirmOrderTitle>
          <FuelEntityConfirmOrderCaption>Total {symbol}</FuelEntityConfirmOrderCaption>
        </div>
        <div className='col-6 col-lg-4'>
          <FuelEntityConfirmOrderHeader className='total'>{fiatTotal}</FuelEntityConfirmOrderHeader>
          <FuelEntityConfirmOrderCaption>Total</FuelEntityConfirmOrderCaption>
        </div>
      </div>
      <ButtonWrapper className='row'>
        <div className='col-6'>
          <CancelOrderButton onClick={handleCancelOrder}>Cancel Order</CancelOrderButton>
        </div>
        <div className='col-6 select-button-wrapper'>
          <ContinueOrderButton onClick={handleConfirmOrder}>Select Payment</ContinueOrderButton>
        </div>
      </ButtonWrapper>
    </FuelEntityConfirmOrderWrapper>
  )
}

export default FuelEntityConfirmOrder
