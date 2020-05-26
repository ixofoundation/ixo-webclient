import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const createTabsContainer = (activeTabColor: string): any => styled.div`
  background: ${(props): string => props.theme.bg.gradientBlue};
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.35);

  a {
    flex: 1;
    font-family: ${(props): string => props.theme.fontRobotoCondensed};
    color: white;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
    padding: 10px 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    min-width: 156px;

    i {
      margin-right: 10px;
      font-size: 18px;
      &:before {
        transition: all 0.3s ease;
      }
      @media (max-width: ${deviceWidth.mobile}px) {
        margin-right: 0;
      }
    }

    &:last-child {
      border-left: 1px solid rgba(1, 116, 146, 0.5);
    }

    p {
      margin-bottom: 0;
      @media (max-width: ${deviceWidth.mobile}px) {
        margin-top: 2px;
      }
    }

    &:not(.active) p {
      @media (max-width: ${deviceWidth.mobile}px) {
        display: none;
      }
    }

    &:hover {
      text-decoration: none;
      color: ${(props): string => props.theme.ixoBlue};
    }

    &.active {
      background: ${(props): string =>
        activeTabColor || props.theme.bg.lightBlue};
      color: white;
    }
  }

  img {
    padding: 0 5px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: calc(100vw - 30px);
    a {
      height: 40px;
      flex-direction: column;
      font-size: 11px;
      font-weight: bold;
      i {
        font-size: 12px;
      }
    }
  }
`
