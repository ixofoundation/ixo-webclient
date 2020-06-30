import styled from 'styled-components'

export const MobileWrapper = styled.div`
  &.active {
    display: flex;
    position: fixed;
    height: 100vh;
    top: 22px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

  .SingleDatePicker .SingleDatePickerInput {
    .DateInput_fangStroke {
      display: none;
    }
  }
  .SingleDatePicker_picker {
    top: 30px;
    width: 100vw;
    left: 0px;
    position: relative;
  }
`
export const MobileDateHeader = styled.header`
  width: 100vw;
  background: #002a3f;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #002a3f;
  position: absolute;
  z-index: 5;
  top: -30px;
  right: 100px;
  left: 0;
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

export const DesktopWrapper = styled.div`
  &.active .SingleDatePicker .SingleDatePickerInput .SingleDatePicker_picker {
    position: absolute;
    width: 619px;
    height: 400px;
    top: 66px;
    left: 300px !important;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transform: translate(-50%);
    z-index: 4;
  }
`
export const ButtonContainer = styled.div`
  position: relative;
  top: 360px;
  left: 10px;
  z-index: 5;
`

export const ResetButtonDesktop = styled.button`
  background: transparent;
  padding: 0.5rem 0;
  border: none;
`

export const ApplyButtonDesktop = styled.button`
  position: absolute;
  padding: 0.5rem 2rem;
  background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
  left: 489px;
  border: none;
  border-radius: 4px;
  color: white;
`
