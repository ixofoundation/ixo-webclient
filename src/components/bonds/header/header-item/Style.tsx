import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const StyledHeaderItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;

  background: white;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 1.25em;
  padding: 1em;
  font-size: 0.75rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: normal;
  color: black;
  justify-content: space-around;
  &:last-child {
    margin: 0;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    width: calc(50% - 0.5rem);
    margin: 0;
    margin-bottom: 1.25em;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
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

export const Price = styled.div`
  font-size: 1.5rem;
  line-height: 1.25;
  font-weight: bold;
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

export const Token = styled.div`
  text-align: center;
  background: #73ce99;
  margin: 0.2rem 0.5rem 0 0;
  display: flex;
  align-items: center;
  border-radius: 0.3rem;
  span {
    font-size: 0.8rem;
    padding: 0.1em 0.5rem;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    align-self: stretch;
  }
`
