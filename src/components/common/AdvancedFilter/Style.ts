import styled from 'styled-components'

export const PositionController = styled.div`
  position: absolute;
  right: 5%;
  top: 35%;
  margin: 6px;
  font-weight: bold;
`

export const Button = styled.button`
  background-color: white;
  border-color: grey;
  border-width: 1px;
  margin: 8px;
  font-weight: 500;
  font-style: normal;
  font-family: Roboto;
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
  width: 7rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
  padding: 0.5rem;
`

export const ResetButton = styled.div`
  position: absolute;
  left: 12%;
  right: 21.78%;
  top: 88%;
  bottom: 62.94%;
  opacity: 0.3;
  font-family: Roboto;
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
  font-family: Roboto;
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
  left: -36%;
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
  font-family: Roboto;
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
  font-family: Roboto;
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
