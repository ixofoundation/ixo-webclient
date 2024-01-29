import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const FormContainer = styled.div`
  --focus-outline-style: none;
  --focus-box-shadow: none;
  --focus-standard-border: 1px solid ${(props): string => props.theme.highlight.light};
  width: 100%;
  form {
    width: 100%;

    .buttons {
      float: right;
    }
  }

  ::placeholder {
    font-family: ${(props: any): string => props.theme.primaryFontFamily};
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5;
    color: #a5adb0;
  }

  label,
  fieldset.field-array > legend {
    display: block;
    font-weight: normal;
    font-size: 0.75rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #436779;
  }

  .form-group.field-null label {
    display: none;
  }

  input {
    margin-bottom: 0.375rem;
    border: 1px solid transparent;
    :focus {
      outline-style: var(--focus-outline-style);
      box-shadow: var(--focus-box-shadow);
      border: var(--focus-standard-border);
    }
    &.form-control {
      width: 100%;
      background: #e8edee;
      border-radius: 4px;
    }
  }

  textarea {
    margin-bottom: 0.375rem;
    :focus {
      outline-style: var(--focus-outline-style);
      box-shadow: var(--focus-box-shadow);
      border: var(--focus-standard-border);
    }
    &.form-control {
      width: 100%;
      height: 100px;
      background: #e8edee;
      border-radius: 4px;
    }
  }

  .form-group .image-checkboxes {
    display: flex;
    flex-flow: row wrap;
    margin-right: -1rem;
    @media (min-width: ${deviceWidth.mobile}px) {
      margin-right: -3rem;
    }
    .checkbox {
      width: calc(100% / 2 - 1rem);
      margin-right: 1rem;
      margin-bottom: 1.25rem;
      @media (min-width: ${deviceWidth.mobile}px) {
        width: calc(100% / 3 - 3rem);
        margin-right: 3rem;
        margin-bottom: 2.5rem;
      }
    }
    div {
      label span {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        color: black;
        font-weight: normal;
        div {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          order: 2;
          font-weight: normal;
          input {
            margin-right: 1.125rem;
            flex: 0 0 auto;
          }
        }
        img {
          width: 100%;
          height: initial;
          object-fit: cover;
          order: 1;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          margin-bottom: 1.25rem;
        }
      }
    }
  }

  .field-radio-group {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    label span {
      display: flex;
      flex-direction: column;
      margin-bottom: 2px;
      input {
        order: 2;
        margin: 0 auto;
      }
      span {
        order: 1;
        margin-bottom: 0.625rem;
        @media (min-width: ${deviceWidth.mobile}px) {
          margin-bottom: 1.25rem;
        }
      }
    }
    &:before,
    &:after {
      line-height: 1;
      font-weight: normal;
      letter-spacing: 0.3px;
    }

    &:before {
      content: 'From first';
      left: 0;
    }
    &:after {
      content: 'To last';
      right: 0;
    }
    .radio-inline {
      text-align: center;
      color: black;
      font-size: 1rem;
      margin: 0;
    }
    @media (max-width: ${deviceWidth.mobile}px) {
      padding-bottom: 1.5rem;
      &:before,
      &:after {
        font-size: 0.75rem;
        position: absolute;
        top: 100%;
        transform: translateY(-100%);
      }
    }
  }

  .checkboxes {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    .checkbox {
      margin-bottom: 1.75rem;
      width: 100%;
      @media (min-width: ${deviceWidth.mobile}px) {
        width: 50%;
      }
      label {
        margin: 0;
        span {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: 0.3px;
          color: black;
        }
      }
    }
  }

  input[type='radio'],
  input[type='checkbox'] {
    width: 0.9375rem;
    height: 0.9375rem;
    background-color: #dfe3e8;
    -webkit-appearance: none;
    outline: none;
    border: none;
    margin: 0;
    border-radius: 50%;
    margin-right: 1rem;
    &:checked {
      background-color: ${(props): string => props.theme.highlight.light};
    }
  }

  .has-error {
    input,
    textarea {
      border-color: #e2223b;
    }
    .control-label {
      color: #e2223b;
    }
    .field-radio-group + div .error-detail .text-danger {
      margin-top: 0.375rem;
    }
  }

  .error-detail {
    list-style: none;
    padding-left: 0;

    .text-danger {
      font-weight: normal;
      font-size: 0.75rem;
      line-height: 1.2;
      letter-spacing: 0.3px;
      color: #e2223b;
    }
  }

  .input-group input {
    width: initial;
    border-radius: 4px !important;
    @media (min-width: ${deviceWidth.mobileSmall}px) {
      margin-left: 0.325rem;
    }
  }

  .form-group .form-control {
    background-color: #e8edee !important;
    box-shadow: none;
  }
  .form-group .DateRangePicker .DateRangePickerInput__showClearDates {
    display: flex;
  }
  .form-group .active .DateRangePicker .DateRangePickerInput .DateRangePickerInput_clearDates {
    top: calc(100% + 396px);
  }

  @media (min-width: ${deviceWidth.tablet}px) and (max-width: ${deviceWidth.desktop}px) {
    .form-group .active .SingleDatePicker .SingleDatePicker_picker {
      top: 120px !important;
      left: 15rem !important;
    }
    .SingleDatePickerInput .SingleDatePickerInput_clearDate {
      top: calc(100% + 448px) !important;
      left: -3.5rem !important;
    }
  }
  .form-group select {
    background-color: #e8edee;
    box-shadow: none;
    border: none;
  }

  fieldset.field.field-array {
    *[class*='col-xs-'] {
      position: relative;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
    }

    .col-xs-3 {
      flex: 0 0 25%;
      max-width: 25%;
    }

    .col-xs-9 {
      flex: 0 0 75%;
      max-width: 75%;
    }

    .col-xs-offset-9 {
      margin-left: 75%;
    }

    .array-item {
      display: flex;
      width: 100%;

      &-toolbox > div {
        margin-top: 3px;
      }
    }

    button.btn {
      border-color: ${(props): string => props.theme.highlight.light};
      color: ${(props): string => props.theme.highlight.light};
      background: transparent;
      font-size: 0.75rem;
      font-weight: bold;
    }

    button.btn-add:before {
      content: '+';
    }

    button.btn-danger:before {
      content: 'X';
    }

    button.array-item-move-up:before {
      content: '\\2191';
    }

    button.array-item-move-down:before {
      content: '\\2193';
    }
  }

  .affix-text-wrapper {
    overflow: hidden;
    border: 1px solid transparent;

    .affix {
      background-color: #d1d5d6;
      color: #6e757d;
    }

    & > input {
      background: unset;
      border: unset;
      padding: 0.375rem 0.75rem;
      color: inherit;
    }
  }
`

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  @media (min-width: ${deviceWidth.mobileSmall}px) {
    justify-content: flex-end;
  }
  button {
    width: 120px;
    height: 50px;
    font-weight: bold;
    font-size: 1rem;
    line-height: 19px;
    border-radius: 4px;
    border: none;

    :disabled {
      cursor: not-allowed;
    }
  }
  button[type='submit'] {
    background: ${(props): string => props.theme.highlight.light};
    color: #fff;
    margin-left: 1.25rem;
    &:focus {
      outline-style: none;
      box-shadow: none;
      border: 1px solid #fff;
    }

    &:disabled {
      opacity: 0.8;
      color: ${(props: any): string => props.theme.ixoLightGreyBlue};
    }
  }
  button[type='button'] {
    background: #fff;
    color: ${(props): string => props.theme.highlight.light};
    border: 1px solid ${(props): string => props.theme.highlight.light};
    &:focus {
      outline-style: var(--focus-outline-style);
      box-shadow: var(--focus-box-shadow);
    }
  }
`

export const FormWrapper = styled.div`
  .input-group input {
    width: initial;
    border-radius: 4px !important;
    @media (min-width: ${deviceWidth.mobileSmall}px) {
      margin-left: 0.325rem;
    }
  }

  .form-group .form-control {
    background-color: #e8edee;
    box-shadow: none;
  }
  .form-group .DateRangePicker .DateRangePickerInput__showClearDates {
    display: flex;
  }
  .form-group .active .DateRangePicker .DateRangePickerInput .DateRangePickerInput_clearDates {
    top: calc(100% + 396px);
  }

  .form-group .active .SingleDatePicker .SingleDatePicker_picker {
    @media (min-width: ${deviceWidth.tablet}px) and (max-width: ${deviceWidth.desktop}px) {
      top: 120px !important;
      left: 15rem !important;
    }
  }

  .form-group select {
    background-color: #e8edee;
    box-shadow: none;
    border: none;
  }
`

export const LinkButton = styled.button`
  border: none;
  color: ${(props): string => props.theme.highlight.light};
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
`
