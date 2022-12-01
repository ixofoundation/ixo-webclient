import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'

export const DropdownWrapper = styled.div`
  position: relative;
  top: 3px;
  left: 0;
  margin-left: -37px;
  box-shadow: unset;
  background: none;
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-weight: 400;
  z-index: 10;
  letter-spacing: 1px;
  color: #000;
  > * {
    flex: 1;
    border-radius: 4px;
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    position: fixed;
    top: 37px;
    left: 265px;
    transform: translateY(-50%);
  }
`

export const ModalButton = styled.div`
  font-size: 1rem;
  background: #002c41;
  &:hover {
    background: unset !important;
  }
  padding: 0 3rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  overflow: visible;
  color: #fff;
  @media (min-width: ${deviceWidth.desktop}px) {
    font-size: 13px;
    background: #000;
  }
  > * {
    display: block;
  }
  svg:first-child {
    width: 1em;
    margin-right: 6px;
    @media (min-width: ${deviceWidth.mobile}px) {
      margin-right: 0.5rem;
    }
  }

  span {
    &.modal-text {
      cursor: default;
    }
  }

  .down-icon {
    margin-left: 6px;
    transition: all 0.3s;
    transform-origin: center;
    @media (min-width: ${deviceWidth.mobile}px) {
      margin-left: 4px;
    }
  }
  :after {
    position: absolute;
    top: calc(100% + 4px);
    left: 53%;
    @media (max-width: ${deviceWidth.desktop}px) {
      display: none;
    }
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
  &.modal-open {
    overflow: visible;
    :after {
      content: '';
    }
  }
`

export const DropdownModal = styled.div`
  position: absolute;
  top: 33px;
  left: 7px;
  padding: 1em 3em;
  width: 100vw;
  border-radius: unset;
  background-color: #002c41;
  hr {
    display: block;
    border-top: 0.0625rem solid #fff;
    opacity: 0.2;
  }
  z-index: 10;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: ${deviceWidth.desktop}px) {
    top: calc(100% + 1rem);
    hr {
      display: none;
    }
    padding: 2em 1.875em;
    width: 100%;
    background: #fff;
    border-radius: 4px;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0 -1.75rem;
`

export const LaunchEntityButton = styled(NavLink)`
  width: calc(100% - 1rem);
  padding: 1rem 1rem;
  color: #fff;
  svg path {
    fill: #fff;
  }

  outline: none !important;
  background: none;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row nowrap;
  font-weight: 500;

  &.disabled {
    border-color: #a5adb0;
    color: #a5adb0;
    cursor: not-allowed;
    i {
      color: #a5adb0;
    }
    svg path {
      fill: #a5adb0;
    }
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    color: #4d4d4d;
    svg path {
      fill: #4d4d4d;
      &.active {
        color: #4d4d4d;
      }
    }
  }
`

export const ButtonContent = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  svg {
    margin-right: 0.25rem;
  }
`
