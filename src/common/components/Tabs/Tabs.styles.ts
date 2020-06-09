import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const createTabsContainer = (activeTabColor: string): any => styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;

  > * {
    :first-child {
      overflow: hidden;
    }

    &:not(:first-child) {
      border-left: 1px solid rgba(1, 116, 146, 0.5);
    }

    &:last-child {
      overflow: hidden;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
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

    :first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    i {
      margin-right: 10px;
      font-size: 18px;
      &:before {
        transition: all 0.3s ease;
      }
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
      pointer-events: none;
      cursor: default;
      i {
        opacity: 0.3;
      }
      p {
        opacity: 0.3;
      }
    }
  }

  img {
    padding: 0 5px;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    a {
      min-width: 168px;
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
