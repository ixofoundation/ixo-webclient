import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const MobileControlPanelToggle = styled.button`
  display: block;
  position: fixed;
  top: 120px;
  right: -1px;
  bottom: auto;
  left: auto;
  transform: translateY(calc(-100% + 1px));
  background: #dfe7f4;
  border: none;
  outline: none !important;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  .down-arrow {
    transform: rotate(90deg);
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    display: none;
  }
`

export const ControlPanelWrapper = styled.div`
  background: #dfe7f4;
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.75rem;
  color: #47568c;
  @media (max-width: ${deviceWidth.desktop}px) {
    position: fixed;
    top: 120px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    transform: translateX(100%);
    transition: all 0.3s;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
    &.open {
      transform: translateX(0);
    }
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    display: block;
  }
`
export const ControlPanelSection = styled.div`
  background: #f0f7ff;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  &:not(:first-child) {
    margin-top: 0.625rem;
  }
  h4 {
    display: block;
    position: relative;
    font-family: Roboto;
    font-size: 0.875rem;
    line-height: 1.2;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    .heading-icon svg {
      width: 1rem;
      padding: 2px;
      margin-right: 0.5rem;
      background: #ffffff;
      border-radius: 4px;
    }
    .arrow-icon {
      position: absolute;
      top: 50%;
      right: 0;
      transition: transform 0.3s;
      transform: translateY(-50%) rotate(-90deg);
      cursor: pointer;
      &.active {
        transform: translateY(-50%);
      }
    }
  }
`

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
`

export const ActionLink = styled.a`
  background: #ffffff;
  border-radius: 0.75rem;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  width: calc(50% - 1rem);
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  color: #47568c;
  transition: all 0.3s;
  border: 1px solid transparent;
  svg {
    fill: #47568c;
    margin-right: 1rem;
  }
  &:hover {
    color: #47568c;
    text-decoration: none;
    border: 1px solid ${(props): string => props.theme.ixoBlue};
  }
`

const squareButtonSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    outline: none !important;
    min-width: 25%;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.6875rem;
    line-height: 1.2;
    color: #47568c;

    .icon-wrapper {
      width: 100%;
      padding: 0.625rem;
      background: #fff;
      border-radius: 12px;
      margin-bottom: 0.5rem;
      transition: all 0.3s;
      border: 1px solid transparent;
      svg {
        margin: 0 auto;
      }
    }
    &:hover {
      .icon-wrapper {
        border: 1px solid ${(props): string => props.theme.ixoBlue};
      }
    }
  }
`

export const AppButtonsWrapper = styled(squareButtonSection)`
  button {
    .icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.hide {
      display: none;
    }
  }
`

export const ConnectionButtonsWrapper = styled(squareButtonSection)`
  button {
    margin-bottom: 1rem;
    .icon-wrapper {
      border-radius: 50%;
      padding: 1.25rem;
      svg {
        margin: 0 auto;
        width: 1.875rem;
        path {
          fill: ${(props): string => props.theme.ixoBlue};
        }
      }
    }
  }
`
