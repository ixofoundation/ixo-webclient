import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const HeroContainer = styled.div`
  background: #f7f8f9;
  color: #7b8285;
  font-family: ${(props): string => props.theme.fontRoboto};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  @media (min-width: ${deviceWidth.tablet}px) {
    min-height: 200px;
  }

  h1 {
    font-family: ${(props): string => props.theme.fontRobotoCondensed};
    font-size: 45px;
    line-height: 1;
    color: black;
    margin: 0;
    letter-spacing: 0.3px;
  }

  h6 {
    font-family: ${(props): string => props.theme.fontRoboto};
    font-size: 14px;
    line-height: 2.5;
    color: #7b8285;
    margin: 0;
  }

  p {
    font-size: 18px;
    line-height: 2;
    color: #7b8285;
    margin: 0;
  }
`

export const HeroActionsWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    background: none;
    border: none;
    outline: none !important;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.2;
    color: #39c3e6;
    border: 1px solid #39c3e6;
    border-radius: 4px;
    padding: 1rem 2rem;
    @media (max-width: ${deviceWidth.mobile}px) {
      width: 100%;
      margin-top: 1rem;
    }
  }
`
