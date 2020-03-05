import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const FiltersWrap = styled.div`
  font-family: 'Roboto' sans-serif;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2.5rem;
  > * {
    flex: 1;
  }
  .filters {
    flex-grow: 1;
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
`

export const Button = styled.button`
  background-color: white;
  border-color: grey;
  border-width: 1px;
  margin: 8px;
  font-weight: 500;
  font-style: normal;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 4px;
  align-items: center;
  line-height: 19px;
  height: 40px;
  width: 100px;
  &:hover {
    border-color: blue;
  }
`

export const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1;
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
`
export const FilterModal = styled.div`
  position: absolute;
  padding: 2.625rem;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  width: 428px;
  min-height: 406px;
  left: -135%;
  :after {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
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
  flex-flow: row wrap;
`

export const FilterSelectButton = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  color: white;
  text-align: center;
  padding: 1rem;
  h3 {
    font-family: 'Roboto' sans-serif;
    font-size: 0.875rem;
    line-height: 1;
  }
  background: #db6169;
  border: 2px solid #db6169;
  img {
    max-width: 100%;
    width: 4rem;
    display: block;
  }
  &:nth-child(2) {
    background: #e0bb72;
    border-color: #e0bb72;
  }
  &:nth-child(3) {
    background: #81b276;
    border-color: #81b276;
  }
  &:nth-child(4) {
    background: #c75d61;
    border-color: #c75d61;
  }
  &:nth-child(5) {
    background: #e17161;
    border-color: #e17161;
  }
  &:nth-child(6) {
    background: #7dcae9;
    border-color: #7dcae9;
  }
  &:nth-child(7) {
    background: #f6d16c;
    border-color: #f6d16c;
  }
  &:nth-child(8) {
    background: #aa566b;
    border-color: #aa566b;
  }
  &:nth-child(9) {
    background: #e78f66;
    border-color: #e78f66;
  }
  &:nth-child(10) {
    background: #d75d87;
    border-color: #d75d87;
  }
  &:nth-child(11) {
    background: #eeb36d;
    border-color: #eeb36d;
  }
  &:nth-child(12) {
    background: #c7a768;
    border-color: #c7a768;
  }
  &:nth-child(13) {
    background: #739771;
    border-color: #739771;
  }
  &:nth-child(14) {
    background: #6eabd7;
    border-color: #6eabd7;
  }
  &:nth-child(15) {
    background: #5d88b0;
    border-color: #5d88b0;
  }
  &:nth-child(16) {
    background: #5d88b0;
    border-color: #5d88b0;
  }
  &.buttonPressed {
    border: 2px solid #fff;
  }
`

export const FilterAmount = styled.div`
  :before {
    content: '·';
    margin: 0 0.25rem;
  }
`

export const ResetButton = styled.div`
  position: absolute;
  left: 12%;
  right: 21.78%;
  top: 88%;
  bottom: 62.94%;
  opacity: 0.3;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  border-radius: 4px;
`

export const ApplyButton = styled.div`
  position: absolute;
  left: 60%;
  top: 81%;
  bottom: 30.04%;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  width: 120px;
  height: 50px;
  background: #04d0fb;
  color: white;
  text-align: center;
  padding: 1rem;
  opacity: 0.3;
  border-radius: 4px;
`
export const DatePickerModal = styled.div`
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  width: 619px;
  height: 425px;
  left: 30%;
  top: 41%;
  z-index: 1;
  :after {
    content: '';
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 1rem 1.1rem 1rem;
    border-color: transparent transparent white transparent;
  }
`

export const ResetButtonDatePicker = styled.div`
  position: absolute;
  left: 10%;
  right: 21.78%;
  top: 89%;
  bottom: 62.94%;
  opacity: 0.3;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  border-radius: 4px;
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
  background: #04d0fb;
  color: white;
  text-align: center;
  padding: 1rem;
  opacity: 0.3;
  border-radius: 4px;
`
