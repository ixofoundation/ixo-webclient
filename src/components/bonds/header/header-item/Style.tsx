import styled from 'styled-components'

export const StyledHeaderItem = styled.div`
  flex: 1;
  min-height: 10vh;
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
`

export const Title = styled.div`
  font-size: 1.1875rem;
  line-height: 1.25;
`

export const Price = styled.div`
  font-size: 1.6875rem;
  line-height: 1.25;
  font-weight: bold;
`

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.125rem;
`

export const Token = styled.div`
  background: #73ce99;
  font-size: 0.8rem;
  padding: 0.1em 0.5rem;
  border-radius: 0.3rem;
  margin: 0.2rem 0.5rem 0 0;
  display: inline;
  text-align: center;
`
