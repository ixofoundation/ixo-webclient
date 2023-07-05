import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const FuelEntityConfirmOrderHeader = styled.h2``
export const FuelEntityConfirmOrderTitle = styled.h3``
export const FuelEntityConfirmOrderSubTitle = styled.h4``
export const FuelEntityConfirmOrderPrice = styled.div``
export const FuelEntityConfirmOrderCaption = styled.span``
export const FuelEntityConfirmOrderHR = styled.hr``
export const ChatBotIconWrapper = styled.div``
export const ButtonWrapper = styled.div``
export const CancelOrderButton = styled.button``
export const ContinueOrderButton = styled.button``

export const FuelEntityConfirmOrderWrapper = styled.div`
  font-family: ${(props: any): string => props.theme.primaryFontFamily};
  background: white;
  padding: 25px 0;
  position: relative;
  @media (min-width: ${deviceWidth.desktop}px) {
    padding: 60px 80px;
  }
  .header-section {
    margin-bottom: 2rem;
  }
  .transaction-details-header {
    display: none;
    margin-bottom: 2rem;
    @media (min-width: ${deviceWidth.desktop}px) {
      display: flex;
    }
  }
  .row.transaction-detail {
    margin-bottom: 1.5rem;
  }

  ${FuelEntityConfirmOrderHeader} {
    margin: 0 0 1.75rem;
    font-family: ${(props: any): string => props.theme.secondaryFontFamily};
    font-weight: normal;
    font-size: 2.25rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: black;
    &.total {
      font-family: ${(props: any): string => props.theme.primaryFontFamily};
      font-weight: bold;
      margin: 0;
    }
  }

  ${FuelEntityConfirmOrderTitle} {
    font-family: inherit;
    font-weight: bold;
    font-size: 24px;
    line-height: 1.5;
    display: flex;
    align-items: center;
    letter-spacing: 0.3px;
    color: black;
    margin: 0;
  }

  ${FuelEntityConfirmOrderSubTitle} {
    font-family: inherit;
    font-weight: normal;
    font-size: 1.125rem;
    line-height: 1.75;
    padding: 6px 0;
    color: black;
    margin: 0;
    > svg {
      margin-right: 1rem;
    }
  }

  ${FuelEntityConfirmOrderPrice} {
    background: #f7f8f9;
    color: black;
    border-radius: 4px;
    padding: 6px 12px;
    margin: 0 -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg:first-child {
      margin-right: 1rem;
    }
  }

  ${FuelEntityConfirmOrderCaption} {
    display: block;
    font-family: inherit;
    font-weight: normal;
    font-size: 12px;
    line-height: 1;
    color: #436779;
  }

  ${FuelEntityConfirmOrderHR} {
    width: 100%;
    margin: 2rem 0;
  }

  ${ChatBotIconWrapper} {
    margin-left: auto;
    width: 28px;
    height: 28px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${ButtonWrapper} {
    margin: 2.75rem -15px;
    .select-button-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  ${CancelOrderButton},
  ${ContinueOrderButton} {
    border-radius: 4px;
    border: none;
    outline: none !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
  }
  ${CancelOrderButton} {
    background: none;
    color: #a5adb0;
    padding: 1rem 0;
  }
  ${ContinueOrderButton} {
    padding: 1rem 2rem;
    color: white;
    background: #04d0fb;
    background: ${(props): string => props.theme.ixoNewBlue};
    text-align: center;
  }
`

export const BackButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  transform: rotate(180deg);
`
