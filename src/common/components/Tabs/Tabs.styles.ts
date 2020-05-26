import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const createTabsContainer = (activeTabColor: string): any => styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;

  a {
    width: calc(100% / 3);
    background: ${(props): string => props.theme.bg.gradientBlue};
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

    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      border-left: 1px solid rgba(1, 116, 146, 0.5);
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
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

  @media (min-width: ${deviceWidth.tablet}px) {
    a {
      min-width: 156px;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
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
