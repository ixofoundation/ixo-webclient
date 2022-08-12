import styled from 'styled-components'

export const AssetCardPanel = styled.div`
  width: 300px;
  margin-left: 30px;
  margin-right: 30px;
`

export const SwapPanel = styled.div`
  width: 370px;
`

export const CardHeader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;

  & span.highlight {
    color: ${(props): string => props.theme.ixoBlue};
  }
`

export const CardBody = styled.div<{ border?: boolean; height?: string }>`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid
    ${(props: any): string => (props.border ? '#49BFE0' : '#083347')};
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px;
  position: relative;
  height: ${(props: any): string => props.height};

  & .error {
    color #E2223B !important;
  }

  &.gap {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`

export const PurchaseBox = styled.div<{ hasBorder?: boolean }>`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid
    ${(props: any): string => (props.hasBorder ? '#49BFE0' : '#083347')};
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 25px;
  cursor: pointer;
  height: 120px;
  font-family: 'Roboto';
  position: relative;

  & .triangle-left {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 15px solid
      ${(props: any): string => (props.hasBorder ? '#49BFE0' : '#083347')};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
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

  & .triangle-right {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 15px solid
      ${(props: any): string => (props.hasBorder ? '#49BFE0' : '#083347')};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
  }

  & .triangle-right:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #002d42;
    position: absolute;
    top: -10px;
    right: 2px;
  }

  & > img {
    border-radius: 50%;
    width: 55px;
    height: 55px;
  }

  & .usd-label {
    font-weight: 300;
    font-size: 16px;
    line-height: 18px;
    text-transform: uppercase;
    padding: 0px 7px;
  }

  & .token-amount {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    outline: none;
    background: #08222f;
    border-radius: 8px;
    border: none;
    color: white;
    padding: 0px 7px;
    width: 90%;
    border-radius: 5px;

    &::placeholder {
      color: ${(props): string => props.theme.fontBlueDisabled};
      font-size: 20px;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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

  & .max-amount {
    position: absolute;
    top: 10px;
    right: 10px;
    & > span {
      color: ${(props): string => props.theme.fontBlueDisabled};
      font-size: 16px;
      line-height: 19px;
    }
  }
`

export const RateBox = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  color: #ffffff;

  & .label {
    color: #678a9c;
    font-size: 12px;
    line-height: 14px;
  }

  & .receive-amount {
    font-size: 24px;
    line-height: 28px;
    text-transform: uppercase;
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
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
  }

  & .slippage-label {
    font-size: 10px;
    line-height: 12px;
  }

  & .slippage-value {
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;

    &.error {
      color: #e2223b !important;
    }
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

export const SettingsButton = styled.div`
  cursor: pointer;
`

export const SubmitButton = styled.button`
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  border-radius: 4px;
  color: ${(props): string => props.theme.highlight.light};
  border: 1px solid ${(props): string => props.theme.highlight.light};
  padding: 10px 30px;
  background: transparent;
  transition: color 0.2s ease-in;
  cursor: pointer;

  &:hover {
    color: white;
  }
`

export const Stat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
  }
`
