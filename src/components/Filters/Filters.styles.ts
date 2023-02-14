import styled from 'styled-components'
import { deviceWidth } from '../../constants/device'
import { NavLink } from 'react-router-dom'

export const FiltersWrap = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2.5rem;

  .filters {
    display: flex;
    align-items: flex-end;

    @media (max-width: ${deviceWidth.tablet}px) {
      flex-flow: row wrap;
      width: 100%;
      flex: 0 1 auto;
    }
  }
`

export const FilterInfo = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.2;
  margin-bottom: 0;
  font-family: ${(props): string => props.theme.primaryFontFamily};
`

export const Button = styled.button`
  background-color: white;
  border: 1px solid transparent;
  margin: 8px;
  padding: 0.66rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  line-height: 19px;
  opacity: ${(props): string => (props.disabled ? '.65' : '1')};
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #a5adb0;
  }
  &.itemsSelected {
    border-color: ${(props): string => props.theme.ixoBlue};
    &:hover {
      border-color: #a5adb0;
    }
  }
  svg {
    margin-right: 0.375rem;
  }
  &.contained {
    background-color: ${(props): string => props.theme.ixoBlue};
    color: white;
  }
`

export const ButtonOuter = styled.button`
  background-color: white;
  border: 1px solid transparent;
  margin: 8px;
  padding: 0 1rem;
  border-radius: 4px;
  overflow: hidden;
  display: block;
  opacity: ${(props): string => (props.disabled ? '.65' : '1')};
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #a5adb0;
  }
  &.itemsSelected {
    border-color: ${(props): string => props.theme.ixoBlue};
    &:hover {
      border-color: #a5adb0;
    }
  }
  svg {
    margin-right: 0.375rem;
  }
  &.contained {
    background-color: ${(props): string => props.theme.ixoBlue};
    color: white;
  }
`
export const ButtonInner = styled.div`
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ButtonIconProps {
  iconSize?: number
}

export const ButtonIcon = styled.i<ButtonIconProps>`
  font-size: ${(props): string => `${props.iconSize || 22}px`};
  width: ${(props): string => `${props.iconSize || 22}px`};
  height: ${(props): string => `${props.iconSize || 22}px`};
  margin-right: 8px;
  // line-height: 16px;

  &:before {
    color: #000;
  }
`

export const ButtonImage = styled.img<ButtonIconProps>`
  width: ${(props): string => `${props.iconSize || 22}px`};
  height: ${(props): string => `${props.iconSize || 22}px`};
  margin-right: 8px;
`

export const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 3;
  :after {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: transparent;
    z-index: -1;
  }
  &.active:after {
    content: '';
  }
  &.active ${Button} {
    border-color: #000;
  }
  &.active ${Button}:before {
    content: '';
    position: absolute;
    top: calc(100% - 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
`

export const FilterModal = styled.div`
  position: absolute;
  padding: 2.625rem;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  width: 428px;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  :before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
`

export const ModalItems = styled.div`
  display: flex;
  overflow-y: auto;
  flex-flow: row wrap;
  margin-bottom: 3.5rem;
  @media (min-width: ${deviceWidth.tablet}px) {
    max-height: 380px;
  }
`

export const FilterSelectButton = styled.div`
  width: calc(100% / 3);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: white;
  text-align: center;
  padding: 1rem;
  background: #db6169;
  border: 4px solid transparent;
  cursor: default;
  h3 {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-size: 0.875rem;
    line-height: 1;
  }
  img {
    max-width: 100%;
    width: 4rem;
    height: 4rem;
    object-fit: contain;
    display: block;
  }
  &:nth-child(2) {
    background: #e0bb72;
  }
  &:nth-child(3) {
    background: #81b276;
  }
  &:nth-child(4) {
    background: #c75d61;
  }
  &:nth-child(5) {
    background: #e17161;
  }
  &:nth-child(6) {
    background: #7dcae9;
  }
  &:nth-child(7) {
    background: #f6d16c;
  }
  &:nth-child(8) {
    background: #aa566b;
  }
  &:nth-child(9) {
    background: #e78f66;
  }
  &:nth-child(10) {
    background: #d75d87;
  }
  &:nth-child(11) {
    background: #eeb36d;
  }
  &:nth-child(12) {
    background: #c7a768;
  }
  &:nth-child(13) {
    background: #739771;
  }
  &:nth-child(14) {
    background: #6eabd7;
  }
  &:nth-child(15) {
    background: #5d88b0;
  }
  &:nth-child(16) {
    background: #5d88b0;
  }
  &:nth-child(17) {
    background: #e0bb72;
  }
  &:nth-child(18) {
    background: #81b276;
  }
  &:nth-child(19) {
    background: #c75d61;
  }
  &:nth-child(20) {
    background: #e17161;
  }
  &:nth-child(21) {
    background: #7dcae9;
  }
  &:nth-child(22) {
    background: #f6d16c;
  }
  &:nth-child(23) {
    background: #aa566b;
  }
  &:nth-child(24) {
    background: #e78f66;
  }
  &:nth-child(25) {
    background: #d75d87;
  }
  &:nth-child(26) {
    background: #eeb36d;
  }
  &:nth-child(27) {
    background: #c7a768;
  }
  &:nth-child(28) {
    background: #739771;
  }
  &:nth-child(29) {
    background: #6eabd7;
  }
  &:nth-child(30) {
    background: #5d88b0;
  }
  &:nth-child(31) {
    background: #5d88b0;
  }
  &:nth-child(32) {
    background: #e0bb72;
  }
  &:nth-child(33) {
    background: #81b276;
  }
  &:nth-child(34) {
    background: #c75d61;
  }
  &:nth-child(35) {
    background: #e17161;
  }
  &:nth-child(36) {
    background: #7dcae9;
  }
  &:nth-child(37) {
    background: #f6d16c;
  }
  &:nth-child(38) {
    background: #aa566b;
  }
  &:nth-child(39) {
    background: #e78f66;
  }
  &:nth-child(40) {
    background: #d75d87;
  }
  &:nth-child(41) {
    background: #eeb36d;
  }
  &:nth-child(42) {
    background: #c7a768;
  }
  &:nth-child(43) {
    background: #739771;
  }
  &:nth-child(44) {
    background: #6eabd7;
  }
  &:nth-child(45) {
    background: #5d88b0;
  }
  &:nth-child(46) {
    background: #5d88b0;
  }
  &:nth-child(47) {
    background: #e0bb72;
  }
  &:nth-child(48) {
    background: #81b276;
  }
  &:nth-child(49) {
    background: #c75d61;
  }
  &:nth-child(50) {
    background: #e17161;
  }
  &.buttonPressed {
    // border: 2px solid #fff;
    background: #143f54;
  }
`

export const FilterAmount = styled.div`
  :before {
    content: '·';
    margin: 0 0.25rem;
  }
`

export const ModalButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 2.25rem;
  line-height: 1.2;
  button {
    border: none !important;
    border-radius: 4px;
  }
`

export const ResetButton = styled.button`
  background: transparent;
  padding: 1rem 0;
`

export const ApplyButton = styled.button`
  padding: 1rem 2rem;
  background: ${(props): string => props.theme.ixoBlue};
  color: white;
`

export const DatePickerModal = styled.div`
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  height: 442px;
  width: 619px;
  top: 100%;
  left: 50%;
  transform: translate(-50%);
  z-index: 3;
  :after {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    height: 0;
    width: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
  }
`

export const DoneButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MobileDatePicker = styled.div`
  height: 100%;
  max-height: calc(100% - 262px);
  .DayPicker_weekHeader__verticalScrollable {
    background-color: #002a3f;
    margin-top: -1px;
  }
  .DayPicker__withBorder {
    box-shadow: none;
  }
  ${DoneButtonWrapper} {
    padding: 1.25rem;
  }
`

export const ResetButtonDatePicker = styled.div`
  position: absolute;
  left: 10%;
  right: 21.78%;
  top: 89%;
  bottom: 62.94%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`

export const ApplyButtonDatePicker = styled.div`
  position: absolute;
  left: 74%;
  top: 83%;
  bottom: 30.04%;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  width: 120px;
  height: 50px;
  background: ${(props): string => props.theme.ixoBlue};
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
`

const HeaderLink = styled(NavLink)`
  color: white;
  font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid ${(props): string => props.theme.ixoBlue};
  border-radius: 3px;
  padding: 5px 10px 5px;
  margin: 0 10px 10px;
  font-size: 16px;

  :first-child {
    border: 1px solid ${(props): string => props.theme.ixoBlue};
    font-weight: 400;
  }

  &:first-child.active {
    color: ${/* eslint-disable-line */ (props) => props.theme.ixoLightBlue};
    font-weight: 400;
  }

  transition: border 0.3s ease;

  :hover {
    text-decoration: none;
    && {
      color: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
    }
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    margin: 0 10px;
    font-size: 13px;
  }
`

export const Burger = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid transparent;
  margin: 8px;
  padding: 0.66rem 1rem;
  border-radius: 4px;
  align-items: center;
  line-height: 19px;
  z-index: 10;
  @media (min-width: ${deviceWidth.desktop}px) {
    display: none;
  }
  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 2px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
  }
  .change .bar1 {
    transform: rotate(-45deg) translate(-6px, 6px);
    transform-origin: center;
  }
  .change .bar2 {
    opacity: 0;
  }
  .change .bar3 {
    transform: rotate(45deg) translate(-6px, -6px);
    transform-origin: center;
  }
`

export const Menu = styled.div`
  ${HeaderLink} {
    display: block;
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    max-width: none;
    position: relative;
    top: auto;
    opacity: 1;
    right: auto;
    background: none;
    pointer-events: auto;
    ${HeaderLink} {
      display: inline;
    }
  }
  ${ButtonWrapper} {
    &:last-of-type ${FilterModal} {
      transform: translateX(-75%);
    }
  }
`

export const MobileMenu = styled(Menu)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.5s ease;
  opacity: 0;
  background: #fff;
  pointer-events: none;
  z-index: 12;
  &.openMenu {
    opacity: 1;
    pointer-events: auto;
  }
`

export const MobileDatesMenu = styled(Menu)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: scroll;
  transition: all 0.5s ease;
  opacity: 0;
  background: #fff;
  pointer-events: none;
  z-index: 12;
  &.openDatesMenu {
    opacity: 1;
    pointer-events: auto;
  }
`

export const MobileButtonWrapper = styled.div`
  display: block;
  margin: 1.625rem 0;
`
export const MobileButton = styled.button`
  color: black;
  background: transparent;
  border: none;
  outline: none !important;
  width: 100%;
  text-align: left;
  padding: 0;
  .right-arrow {
    transform: rotate(-90deg);
    float: right;
  }
`
export const MobileFilterHeader = styled.header`
  background: #002a3f;
  padding: 1.625rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MobileDateHeader = styled.header`
  background: #002a3f;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #002a3f;
`

export const DateDisplay = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    max-height: 100%;
    transform: rotate(180deg);
  }
`

export const DateInput = styled.div`
  position: relative;
  padding: 1rem 1.4rem;
  background-color: #143f54;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  border-radius: 4px;
  width: 137.11px;
  height: 50px;
  font-style: normal;
  font-weight: bold;
  color: #fff;

  &:hover {
    border-color: #fff;
  }
`

export const DoneButton = styled.button`
  position: relative;
  padding: 1rem 2rem;
  background: ${(props): string => props.theme.ixoBlue};
  border-radius: 4px;
  color: white;
  width: 100%;
  text-align: center;
  border: none;
  outline: none !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-bottom: 1rem;
  &:after {
    content: '';
    position: absolute;
    top: -1.25rem;
    left: -20px;
    height: 1px;
    width: 100vw;
    background-color: #e8edee;
  }
`

export const MobileFilterHeading = styled.h3`
  color: #000;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 2.625rem 0;
  display: block;
  width: 100%;
  @media (max-width: ${deviceWidth.mobile}px) {
    margin: 0.5rem 0 1rem;
  }
`

export const HeadingItem = styled.button`
  cursor: pointer;
  border: none;
  outline: none !important;
  text-decoration: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
`

export const MobileFilterWrapper = styled.div`
  padding: 1.25rem;
  height: calc(100% - 75px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MobileFilterModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ffffff;
  z-index: 13;
`
export const BurgerMenuButton = styled(ButtonOuter)`
  display: none;

  @media (max-width: ${deviceWidth.desktop - 1}px) {
    display: block;
  }
`
