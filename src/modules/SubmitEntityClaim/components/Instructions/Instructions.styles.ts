import styled from 'styled-components'
import { deviceWidth } from 'src/lib/commonData'

export const Container = styled.div`
  position: relative;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  max-width: 760px;
  background: white;
  border-radius: 4px;
  padding: 2rem 2.5rem;
  overflow: hidden;
  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 2.5rem 3.75rem;
  }

  @media (min-width: ${deviceWidth.desktopLarge}px) {
    transform: translateX(30%);
  }

  h1 {
    font-size: 36px;
    line-height: 42px;
    margin: 10px 0;
  }

  h3 {
    font-size: 18px;
    line-height: 36px;
    color: #7b8285;
    max-width: 77%;
    margin-bottom: 3rem;
    @media (min-width: ${deviceWidth.mobile}px) {
      max-width: 100%;
    }
  }

  hr {
    border: 1px solid #dfe3e8;
    width: 500%;
    margin-left: -200%;
    margin-top: 2.5rem;
  }
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
    svg {
      margin-right: 0.5rem;
    }
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    height: 300px;
  }
`
export const PositionButtons = styled.div`
  display: inline-block;
  align-items: center;
  margin-top: 2.5rem;
`
export const ReturnButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #a5adb0;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

export const StartButton = styled.button`
  width: 120px;
  height: 50px;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
  border-radius: 4px;
  border-color: transparent;
  color: #fff;
  @media (min-width: ${deviceWidth.mobileSmall}px) {
    margin-left: 0.5rem;
  }
  @media (min-width: 400px) {
    margin-left: 3rem;
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    margin-left: 13rem;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    margin-left: 24rem;
  }
`
