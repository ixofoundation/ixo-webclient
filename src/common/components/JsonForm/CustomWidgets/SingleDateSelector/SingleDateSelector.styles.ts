import styled from 'styled-components'

export const Container = styled.div`
  --focus-outline-style: none;
  --focus-box-shadow: none;
  --focus-standard-border: 1px solid #39c3e6;
  .SingleDatePicker {
    z-index: 4;
  }
  .SingleDatePickerInput__withBorder {
    border: none;
    .DateInput {
      width: 20rem;
      position: relative;
      background: #f7f8f9;
      width: 100%;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: 0.5rem;
        border: 1px solid #000;
        border-width: 0 0 2px 2px;
        width: 8px;
        height: 8px;
        line-height: 0;
        font-size: 0;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: translateY(-50%) rotate(-45deg);
      }
    }
    .DateInput_input {
      margin: 0;
      width: 100%;
      background: #e8edee;
      border-radius: 4px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;

      ::placeholder {
        line-height: 1.5;
        color: #a5adb0;
      }
    }

    .DateInput .DateInput_input__focused {
      border: var(--focus-standard-border);
    }
  }
`

export const MobileWrapper = styled.div`
  &.active {
    position: fixed;
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
  .DayPicker .DayPicker_transitionContainer__vertical {
    height: calc(100vh - 122px) !important;
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
  &.active .SingleDatePicker .SingleDatePickerInput {
    .DateInput .DateInput_fang {
      display: none;
    }
  }
  .SingleDatePicker_picker {
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
    :after {
      content: '';
      position: absolute;
      top: -0.5rem;
      left: 8%;
      transform: translateX(-50%);
      height: 0;
      width: 0;
      border-radius: 4px;
      border-style: solid;
      border-width: 0 1rem 1.1rem 1rem;
      border-color: transparent transparent white transparent;
    }
  }
  .DayPicker .DayPicker_transitionContainer__horizontal {
    border-bottom: 1px solid #e8edee;
  }
  .DayPicker__withBorder {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`
export const ButtonContainer = styled.div`
  position: relative;
  top: 376px;
  left: 16px;
  z-index: 5;
`

export const ResetButtonDesktop = styled.button`
  background: transparent;
  padding: 0.5rem 0;
  border: none;
`
