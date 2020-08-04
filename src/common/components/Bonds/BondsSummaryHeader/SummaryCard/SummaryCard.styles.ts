import styled from 'styled-components'
import { deviceWidth } from '../../../../../lib/commonData'

interface PriceProps {
  priceColor: string
}

interface TokenProps {
  backgroundColor: string
}

interface StyledHeaderItemProps {
  selected: boolean
}

export const StyledHeaderItem = styled.div<StyledHeaderItemProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;

  background: linear-gradient(358.42deg, #002d42 2.22%, #012639 96.94%);
  border: ${(props): string =>
    props.selected ? '1px solid #107591' : '1px solid #0c3549'};
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 1.25em;
  padding: 1em;
  font-size: 0.75rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: normal;
  color: white;
  cursor: pointer;
  justify-content: space-around;
  box-shadow: ${(props): string =>
    props.selected ? '0px 0px 10px rgba(16, 117, 145, 0.3)' : null};
  &:last-child {
    margin: 0;
  }
  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: calc(50% - 0.5rem);
    margin: 0;
    margin-bottom: 1.25em;
  }
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    flex: 1;
  }
`

export const Title = styled.div`
  font-size: 0.625rem;
  line-height: 1.25;
  @media (min-width: 480px) {
    font-size: 1.1875rem;
  }
`

export const Price = styled.div<PriceProps>`
  font-size: 1.5rem;
  line-height: 1.25;
  font-weight: bold;
  color: ${(props): string => (props.priceColor ? props.priceColor : 'white')};
  @media (min-width: 480px) {
    font-size: 1.6875rem;
  }
`

export const AdditionalInfo = styled.div`
  font-family: 'Roboto' sans-serif;
`

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.125rem;
  flex-grow: 1;
`

export const Token = styled.div<TokenProps>`
  text-align: center;
  background: ${(props): string =>
    props.backgroundColor ? props.backgroundColor : '#73ce99'};
  margin: 0.2rem 0.5rem 0 0;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
  span {
    font-size: 0.8rem;
    padding: 0.1em 0.5rem;
  }
  font-weight: bold;
  @media (max-width: ${deviceWidth.tablet}px) {
    margin: 0 0.5rem 0 0;
    span {
      font-size: 1rem;
    }
  }
`
