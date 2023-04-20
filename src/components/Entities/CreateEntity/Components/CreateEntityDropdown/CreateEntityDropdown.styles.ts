import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'

export const DropdownWrapper = styled.div`
  position: relative;
  // top: 3px;
  // left: 0;
  // margin-left: -37px;
  box-shadow: unset;
  background: none;
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-weight: 400;
  // z-index: 10;
  letter-spacing: 1px;
  > * {
    flex: 1;
    border-radius: 4px;
  }

  // @media (min-width: ${deviceWidth.desktop}px) {
  //   position: fixed;
  //   top: 37px;
  //   left: 265px;
  //   transform: translateY(-50%);
  // }
`

export const ModalButton = styled.div<{ color: string }>`
  font-size: 1rem;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: unset !important;
  }
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  overflow: visible;
  color: ${(props): string => props.color};
  @media (min-width: ${deviceWidth.desktop}px) {
    font-size: 13px;
    background: inherit;
  }
  > * {
    display: block;
  }
  svg:first-child {
    width: 1em;
  }
  svg path {
    fill: ${(props): string => props.color};
  }

  .down-icon {
    transition: all 0.3s;
    transform-origin: center;
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
  left: 50%;
  top: 200%;
  transform: translateX(-50%);
  padding: 10px 20px;
  z-index: 10;
  background: white;

  :before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
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
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0;
`

export const LaunchEntityButton = styled(NavLink)`
  width: 100px;
  padding: 10px 0;

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
    border-color: ${(props) => props.theme.ixoGrey500};
    color: ${(props) => props.theme.ixoGrey500};
    cursor: not-allowed;
    pointer-events: none;

    i {
      color: ${(props) => props.theme.ixoGrey500};
    }
    svg path,
    svg circle {
      fill: ${(props) => props.theme.ixoGrey500};
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
