import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const createTabsContainer = (activeTabColor: string): any => styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.bg.gradientBlue};
  border-radius: 3px;
  overflow: hidden;
  display: inline-flex;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.35);

  a {
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};
    color: white;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    min-width: 156px;

    @media (max-width: ${deviceWidth.mobile}px) {
      flex-direction: column;
    }
  }

  a:last-child {
    border-left: 1px solid rgba(1, 116, 146, 0.5);
  }

  a i {
    margin-right: 10px;
    font-size: 18px;
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-right: 0;
    }
  }

  i:before {
    transition: all 0.3s ease;
  }

  a p {
    margin-bottom: 0;
    @media (max-width: ${deviceWidth.mobile}px) {
      margin-top: 2px;
    }
  }

  a:not(.active) p {
    @media (max-width: ${deviceWidth.mobile}px) {
      display: none;
    }
  }

  a:hover {
    text-decoration: none;
    color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }

  a.active {
    background: ${/* eslint-disable-line */ props =>
      activeTabColor || props.theme.bg.lightBlue};
    color: white;
  }

  img {
    padding: 0 5px;
  }
`
