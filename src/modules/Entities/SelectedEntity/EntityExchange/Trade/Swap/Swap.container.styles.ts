import styled from 'styled-components'

export const CardHeader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  color: #ffffff;

  & > span {
    color: #00d2ff;
  }
`

export const CardBody = styled.div<{ border?: boolean }>`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid
    ${(props: any): string => (props.border ? '#49BFE0' : '#083347')};
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px;
  position: relative;

  & .error {
    color #E2223B !important;
  }
`

export const PurchaseBox = styled.div`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 30px;
  cursor: pointer;

  & .triangle-left {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 15px solid #083347;
    position: absolute;
    left: -5px;
  }

  & .triangle-left:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 15px solid #002d42;
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
    outline: none;
    background: #033148;
    border: none;
    color: white;
    padding: 5px;
    width: 100px;
    border-radius: 5px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  & .max-button {
    text-transform: uppercase;
    color: #00d2ff;
    font-weight: normal;
    font-size: 9px;
    line-height: 11px;
    border-radius: 5px;
    background: #033148;
    border: 0.5px solid #49bfe0;
    outline: none;
  }

  & .token-stored {
    color: #678a9c;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  }

  & .indicator {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(-50%, -50%);

    &.reverse {
      transform: translate(-50%, -50%) rotateX(180deg);
    }
  }
`

export const RateBox = styled.div`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-style: normal;
  font-weight: bold;
  color: #ffffff;

  & .label {
    font-size: 12px;
    line-height: 14px;
  }

  & .receive-amount {
    font-size: 24px;
    line-height: 28px;
  }

  & .receive-rate {
    font-size: 12px;
    line-height: 14px;
    color: #678a9c;
    text-transform: uppercase;
  }

  & .fee-percent {
    font-size: 10px;
    line-height: 12px;
  }

  & .fee-amount {
    font-size: 14px;
    line-height: 16px;
  }
`

export const SwapButton = styled.div`
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  background: linear-gradient(180deg, #01283b 0%, #012d41 100%);
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
  position: absolute;
  top: 10px;
  right: 10px;

  cursor: pointer;
`

export const Submit = styled.button`
  width: 150px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  color: #39c3e6;
  border: 1px solid #39c3e6;
  padding: 10px 30px;
  background: transparent;
  transition: color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: white;
  }
`
