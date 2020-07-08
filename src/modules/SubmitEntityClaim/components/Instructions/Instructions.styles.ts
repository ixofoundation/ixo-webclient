import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const Container = styled.div`
  border-radius: 4px;
  background: white;
  padding: 3.125rem 1.375rem;
  max-width: 100%;
  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 2.625rem 3.75rem;
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
  font-family: ${(props): string => props.theme.fontRoboto};
  font-size: 1.125rem;
  line-height: 2;
  color: #7b8285;
  font-weight: normal;
  margin-bottom: 2.0625rem;
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
  > * {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: normal;
    display: flex;
    flex-flow: row nowrap;
    color: #000000;
    margin-bottom: 1.175rem;
    @media (min-width: ${deviceWidth.tablet}px) {
      width: calc(100% / 2 - 0.5rem);
    }
    svg {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    max-height: 300px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  .close-button {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #a5adb0;
  }

  .start-button {
    width: 120px;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    border-radius: 4px;
    border: none;
    color: #fff;
  }
`
