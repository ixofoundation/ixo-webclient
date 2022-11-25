import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

interface PriceProps {
  priceColor: string
}

interface TokenProps {
  backgroundColor: string
}

interface StyledHeaderItemProps {
  selected: boolean
  isActiveCursor: boolean
  activeColor: string
  isDark: boolean
}

export const StyledHeaderItem = styled.div<StyledHeaderItemProps>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  position: relative;

  background: ${(props: any): string =>
    props.isDark
      ? 'linear-gradient(358.42deg, #002d42 2.22%, #012639 96.94%)'
      : 'linear-gradient(180deg, #FFFFFF 0%, #F0F3FA 100%)'};
  border: ${(props: any): string => (props.selected ? `1px solid ${props.activeColor}` : `unset`)};
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 1.25em;
  padding: 1em;
  font-size: 0.75rem;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-weight: normal;
  color: ${(props: any): string => (props.isDark ? 'white' : '#373d3f')};
  cursor: ${(props: any): string => (props.isActiveCursor ? 'pointer' : 'auto')};
  justify-content: space-around;
  box-shadow: ${(props: any): string => (props.selected ? '0px 0px 10px rgba(16, 117, 145, 0.3)' : '')};
  &:last-child {
    margin: 0;
  }
  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: calc(50% - 0.5rem);
    margin: 0;
    margin-bottom: 1.25em;
    min-height: 150px;
  }
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    flex: 1;
  }

  & > svg {
    margin-left: 0.5rem;
    margin-right: 1rem;
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
  color: ${(props: any): string => (props.priceColor ? props.priceColor : 'white')};
  @media (min-width: 480px) {
    font-size: 1.6875rem;
  }
`

export const AdditionalInfo = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
`

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.125rem;
  flex-grow: 1;
`

export const Token = styled.div<TokenProps>`
  text-align: center;
  background: ${(props: any): string => (props.backgroundColor ? props.backgroundColor : '#73ce99')};
  margin-left: 0.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
  span {
    font-size: 0.8rem;
    padding: 0.4rem;
    color: white;
  }
  font-weight: bold;
  min-width: 45px;
  justify-content: center;
  @media (max-width: ${deviceWidth.tablet}px) {
    margin: 0 0.5rem 0 0;
    span {
      font-size: 1rem;
    }
  }
`

export const DotsContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 1;
  transition: opacity 0.3s;

  @media (max-width: ${deviceWidth.mobile}px) {
    right: 0.5rem;
    top: 0.5rem;
  }
`
