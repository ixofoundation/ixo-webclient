import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const createTabsContainer = (activeTabColor: string): any => styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;

  a {
    background: ${(props): string => props.theme.bg.gradientBlue};
    font-family: ${(props): string => props.theme.fontRoboto};
    color: white;
    text-transform: uppercase;
    font-weight: 500;
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

    &.in-active {
      i {
        opacity: 0.3;
      }
      p {
        opacity: 0.3;
      }
    }

    &.tooltip {
      position: relative;
      display: inline-block;
      &.tooltip-text {
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
      }
      :hover .tooltip-text {
        visibility: visible;
      }
    }
  }
  img {
    padding: 0 5px;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    a {
      min-width: 156px;
      width: calc(100% / 3);
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    width: calc(100vw - 30px);
    a {
      flex: 1;
      height: 40px;
      font-size: 10px;
      line-height: 1.4;
      font-weight: bold;
      i {
        display: none;
        font-size: 16px;
      }

      &:not(.active) {
        i {
          display: block;
        }
        p {
          display: none;
        }
      }
    }
  }
`
