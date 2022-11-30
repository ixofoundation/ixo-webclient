import styled from 'styled-components'
import { deviceWidth } from '../../../../../constants/device'

export const Container = styled.div`
  border-radius: 4px;
  background: white;
  padding: 3.125rem 1.375rem;
  max-width: 100%;
  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 2rem 2.75rem;
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
  font-family: ${(props: any): string => props.theme.primaryFontFamily};
  font-size: 1.125rem;
  line-height: 2;
  color: #7b8285;
  font-weight: normal;
  margin-bottom: 2.375rem;
`

export const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const ListItems = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: #000000;
  margin-bottom: 1.375rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  > * {
    &:hover {
      text-decoration: none;
    }
  }
  .close-button {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #a5adb0;
  }

  .start-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    background: ${(props): string => props.theme.ixoBlue};
    border-radius: 4px;
    border: none;
    color: #fff;
  }
`
