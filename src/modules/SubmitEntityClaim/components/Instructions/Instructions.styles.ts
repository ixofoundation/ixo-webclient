import styled from 'styled-components'
import { deviceWidth } from 'src/lib/commonData'

export const Container = styled.div`
  border-radius: 4px;
  @media (min-width: ${deviceWidth.mobile}px) {
    max-width: 100%;
  }
`

export const ContentWrapper = styled.div`
  h1 {
    font-size: 36px;
    line-height: 42px;
    margin: 10px 0;
    letter-spacing: 0.3px;
    color: #000;
  }
`
export const SubHeader = styled.h4`
  line-height: 36px;
  color: #7b8285;
  width: 94%;
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 2.0625rem;
  margin-right: 3.75rem;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const ListItems = styled.div`
  height: unset;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-content: flex-start;
  max-width: calc(100% / 2 - 2.5rem);
  > * {
    font-size: 16px;
    font-weight: normal;
    line-height: 24px;
    display: flex;
    color: #000000;
    white-space: nowrap;
    margin-bottom: 1.175rem;
    margin-right: 7.5rem;
    @media (min-width: ${deviceWidth.mobile}px) {
      margin-right: 0.5rem;
    }
    @media (min-width: ${deviceWidth.tablet}px) {
      margin-right: 5.5rem;
    }
    svg {
      margin-right: 1rem;
    }
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    height: 300px;
  }
`
export const ButtonWrapper = styled.div`
  display: inline-block;
  align-items: center;
`
export const ReturnButton = styled.button`
  pointer-events: none;
  cursor: default;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #a5adb0;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
`

export const StartButton = styled.button`
  width: 120px;
  height: 50px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 3.625rem;

  @media (min-width: ${deviceWidth.mobileSmall}px) {
    margin-left: 0.5rem;
  }
  @media (min-width: 400px) {
    margin-left: 3rem;
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    margin-left: 13rem;
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    margin-top: 6rem;
  }

  @media (min-width: ${deviceWidth.desktopLarge}px) {
    margin-left: 19.5rem;
    margin-top: 3.625rem;
  }
`
