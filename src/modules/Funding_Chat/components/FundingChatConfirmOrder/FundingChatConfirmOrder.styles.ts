import styled from 'styled-components';
import { deviceWidth } from '../../../../lib/commonData';

export const FundingChatOrderHeader = styled.h2`
&&& {
  color: #436779;
  font-size: 18px;
  margin: 0 0 1.75rem;
  font-weight: 500;
  font-family: inherit;
  background: #F0F3F9;
  &.total {
    font-family: ${(props: any): string => props.theme.fontRoboto};
    font-weight: bold;
    margin: 0;
  }
}
`;

export const FundingChatOrderSummaryWrapper = styled.div`
  background-color: white;
  padding: 1rem 0;
  border-radius: 5px;
  & div:first-child {
    border-right: 1px solid #DDDDDD;
  }
  & div {
    display: inline-block;
  }
`;

export const FundingChatPriceWrapper = styled.div`
  svg {
    margin-right: 5px;
  }
`;

export const FundingChatOrderTitle = styled.h3`
  font-family: inherit;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  color: black;
  margin: 0;
`;
export const FundingChatOrderSubTitle = styled.h4`
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
`;
export const FundingChatOrderPrice = styled.div`
  background: #f7f8f9;
  color: black;
  border-radius: 4px;
  padding: 6px 12px;
  margin: 0 -12px;
`;
export const FundingChatOrderCaption = styled.span`
  display: block;
  font-family: inherit;
  font-weight: normal;
  font-size: 12px;
  line-height: 1;
  color: #436779;
`;
export const FundingChatOrderHR = styled.hr`
  width: 100%;
  margin: 2rem 0;
`;
export const ChatBotIconWrapper = styled.div`
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ButtonWrapper = styled.div`
  margin: 2.75rem -15px;
  .select-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
export const CancelOrderButton = styled.button``;
export const ContinueOrderButton = styled.button``;

export const FundingChatOrderWrapper = styled.div`
  font-family: ${(props: any): string => props.theme.fontRoboto};
  background: #f0f3f9;
  position: relative;
  padding: 50px 25px 0 25px;
  
  height: 100%;
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
    background-color: white;
    border-radius: 5px;
    padding: 16px;
  }

  .row.total-wrapper {
    margin-bottom: 1.5rem;
    background-color: white;
    border-radius: 5px;
    padding: 16px;
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
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    text-align: center;
  }
`;

export const BackButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  transform: rotate(180deg);
`;
