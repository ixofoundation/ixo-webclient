import styled from 'styled-components'

// const textPrimary = "#01283B";
// const textSecondary = "#7D8498";
// const textHint = "#828E94";

export const CardHeader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  color: #FFFFFF;

  & > span {
    color: #00D2FF;
  }
`

export const CardBody = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px;
  position: relative;
`
export const WalletBox = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;

  & > img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
  }

  & > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    padding-left: 20px;
  }
`
export const PurchaseBox = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;  
  padding: 20px;
  cursor: pointer;

  & .triangle-left {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 20px solid #083347;
    position: absolute;
    left: -10px;
  }
  
  & .triangle-left:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 20px solid #002D42;
    position: absolute;
    top: -10px;
    left: 1px;
  }

  & > img {
      border-radius: 50%;
      width: 55px;
      height: 55px;
  }

  & .token-label {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }

  & .token-amount {
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }
`

export const RateBox = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 100%;
  color: #FFFFFF;

  & > span {
    font-weight: normal;
    font-size: 14px;
    line-height: 100%;
  }
`

export const SwapButton = styled.div`
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  background: linear-gradient(180deg, #01283B 0%, #012D41 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.18);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 100;
  cursor: pointer;
  padding: 6px;
`

export const SettingButton = styled.div`
  background: linear-gradient(180deg, #01283B 0%, #012D41 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.18);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const VerticalProgressBar = styled.div`
  width: 7px;
  min-height: calc(100% - 40px);
  border-radius: 50px !important;
  display: inline-flex;
  flex-direction: column-reverse;
  margin: 5px 20px 0px 10px;
  background: #012B3F;

  & .progress-bar {
    width: 100%;
    height: 0;
    border-radius: 50px;
    background: linear-gradient(180deg, #ED9526 55.45%, #FFEFB0 100%);
  }
`
export const SlippageStatus = styled.div`
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: #FFFFFF;

  & > .fee {
    font-size: 10px;
    line-height: 12px;
  }

  & > .amount {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
`