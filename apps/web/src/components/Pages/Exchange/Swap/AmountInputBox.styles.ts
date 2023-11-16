import styled from 'styled-components'
import ReactCurrencyFormat from 'react-currency-format'
import { Typography } from 'components/App/App.styles'

export const AmountInputBoxWrapper = styled.div<{ isSelected?: boolean }>`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid ${(props): string => (props.isSelected ? props.theme.ixoNewBlue : '#436779')};
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  cursor: pointer;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  position: relative;

  & .triangle-left {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 15px solid ${(props): string => (props.isSelected ? props.theme.ixoNewBlue : '#436779')};
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
    border-left: 15px solid ${(props): string => (props.isSelected ? props.theme.ixoNewBlue : '#436779')};
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
`
export const AmountInputBoxBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 110px;

  & > div {
    height: 30px;
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const CurrencyFormat = styled(ReactCurrencyFormat)`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  outline: none;
  background: #08222f;
  border-radius: 8px;
  border: none;
  color: white;
  padding: 0px 7px;
  width: 100%;
  border-radius: 5px;
  text-align: right;

  &::placeholder {
    color: ${(props): string => props.theme.ixoDarkBlue};
    font-size: 20px;
  }
`

export const GrayText = styled(Typography)`
  color: ${(props): string => props.theme.ixoDarkBlue};
`

export const BlueText = styled(Typography)`
  color: ${(props): string => props.theme.ixoNewBlue};
`

export const WhiteText = styled(Typography)`
  color: #ffffff;
`

export const AssetIcon = styled.img<{ width?: number; height?: number }>`
  width: ${(props): number => props.width ?? 20}px;
  height: ${(props): number => props.height ?? 20}px;
`

export const DropDownIcon = styled.img`
  &.reverse {
    transform: rotateZ(180deg);
  }
`
