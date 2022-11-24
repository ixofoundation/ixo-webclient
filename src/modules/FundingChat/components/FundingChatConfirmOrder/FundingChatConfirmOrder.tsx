import React from 'react'
import {
  FundingChatOrderWrapper,
  FundingChatOrderSummaryWrapper,
  FundingChatOrderHeader,
  FundingChatOrderTitle,
  FundingChatOrderSubTitle,
  FundingChatPriceWrapper,
  FundingChatOrderCaption,
  ChatBotIconWrapper,
  ButtonWrapper,
  CancelOrderButton,
  ContinueOrderButton,
  BackButton,
} from './FundingChatConfirmOrder.styles'
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

const FundingChatOrder: React.FunctionComponent<Props> = ({
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
    <FundingChatOrderWrapper className='container'>
      <BackButton onClick={handleCancelOrder}>
        <BackIcon width='18' fill='#A5ADB0' />
      </BackButton>
      <div className='row header-section'>
        <div className='col-12'>
          <FundingChatOrderHeader>Order Summary</FundingChatOrderHeader>
        </div>
        <FundingChatOrderSummaryWrapper className='col-12'>
          <div className='col-5 pl-4'>
            <FundingChatOrderTitle>{subscription}</FundingChatOrderTitle>
            <FundingChatOrderCaption>Subscription</FundingChatOrderCaption>
          </div>
          <div className='col-7 pl-4'>
            <FundingChatOrderTitle>Included</FundingChatOrderTitle>
            <FundingChatOrderCaption>Standard Hosting Service</FundingChatOrderCaption>
          </div>
        </FundingChatOrderSummaryWrapper>
      </div>

      <div className='row transaction-detail'>
        <div className='col-12'>
          <div className='row'>
            <FundingChatOrderSubTitle>{symbol} Credits</FundingChatOrderSubTitle>
          </div>
        </div>
        <div className='col-12'>
          <div className='row align-items-center'>
            <div className='col-4 p-0'>
              <FundingChatOrderCaption>Price ({symbol})</FundingChatOrderCaption>
            </div>
            <div className='col-8'>
              <div
                className='row justify-content-between pl-3 align-items-center pt-2 pb-2'
                style={{ backgroundColor: '#F7F8F9' }}
              >
                <FundingChatPriceWrapper>
                  <IxoX width='20' fill='#49BFE0' />
                  {amount}
                </FundingChatPriceWrapper>
                <ChatBotIconWrapper onClick={handleCancelOrder}>
                  <ChatbotIcon />
                </ChatBotIconWrapper>
              </div>
            </div>
          </div>

          <div className='row align-items-center'>
            <div className='col-4 p-0'>
              <FundingChatOrderCaption>Rate</FundingChatOrderCaption>
            </div>
            <div className='col-4'>
              <FundingChatOrderSubTitle>{fiatAmount}</FundingChatOrderSubTitle>
            </div>
            <div className='col-4 p-0'>
              <FundingChatOrderCaption className='text-right'>
                1 {symbol} = {fiatConversionRate}
              </FundingChatOrderCaption>
            </div>
          </div>
        </div>
      </div>

      <div className='row transaction-detail'>
        <div className='col-12'>
          <div className='row'>
            <FundingChatOrderSubTitle>Additional Fees</FundingChatOrderSubTitle>
          </div>
        </div>
        <div className='col-12'>
          <div className='row align-items-center'>
            <div className='col-4 p-0'>
              <FundingChatOrderCaption>Price ({symbol})</FundingChatOrderCaption>
            </div>
            <div className='col-8'>
              <div className='row align-items-center pl-3 pt-2 pb-2' style={{ backgroundColor: '#F7F8F9' }}>
                <FundingChatPriceWrapper>
                  <IxoX width='20' fill='#49BFE0' />
                  {gasFee}
                </FundingChatPriceWrapper>
              </div>
            </div>
          </div>

          <div className='row align-items-center'>
            <div className='col-4 p-0'>
              <FundingChatOrderCaption>Rate</FundingChatOrderCaption>
            </div>
            <div className='col-4'>
              <FundingChatOrderSubTitle>{fiatTransactionFee}</FundingChatOrderSubTitle>
            </div>
            <div className='col-4 p-0'>
              <FundingChatPriceWrapper className='d-flex' flexEnd>
                <IxoX width='10' fill='#49BFE0' />
                10 per transaction
              </FundingChatPriceWrapper>
            </div>
          </div>
        </div>
      </div>
      <div className='row total-wrapper pl-0 pr-0'>
        <div className='col-12'>
          <FundingChatOrderSubTitle>Amount due</FundingChatOrderSubTitle>
        </div>
        <div className='col-6'>
          <FundingChatOrderTitle>
            <IxoX width='20' fill='#49BFE0' />
            <span className='ml-2'>{total}</span>
          </FundingChatOrderTitle>
          <FundingChatOrderCaption className='mt-2'>Total {symbol}</FundingChatOrderCaption>
        </div>
        <div className='col-6'>
          <FundingChatOrderTitle>{fiatTotal}</FundingChatOrderTitle>
          <FundingChatOrderCaption className='mt-2'>Total</FundingChatOrderCaption>
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
    </FundingChatOrderWrapper>
  )
}

export default FundingChatOrder
