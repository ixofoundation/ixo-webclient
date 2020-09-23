import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 400px;
`

export const EntitiesContainer = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.bg.lightGrey};
  flex: 1 1 auto;
  min-height: 480px;

  & > .row {
    margin-top: 30px;
    justify-content: center;
  }

  > .container {
    padding: 2rem 0 3.125rem;
    @media (min-width: ${deviceWidth.tablet}px) {
      padding: 4.5rem 0 3.125rem;
    }
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: white;
  align-items: center;
  background-color: ${/* eslint-disable-line */ (props) => props.theme.bg.blue};
  height: 100%;
  min-height: 480px;
`

export const NoEntitiesContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: black;
  align-items: center;
  min-height: 480px;
`
