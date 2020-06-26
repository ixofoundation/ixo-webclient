import styled from 'styled-components'
import { deviceWidth } from 'src/lib/commonData'

export const SubmitEntityClaimWrapper = styled.div`
  background-color: #fff;
`

export const Container = styled.div`
  > * {
  }

  #root {
    --focus-outline-style: none;
    --focus-box-shadow: none;
    --focus-standard-border: 1px solid #39c3e6;
    padding: 0 4.5rem 4.75rem 4.5rem;
    background: #f7f8f9;
    border-radius: 4px;
    border: 1px solid #39c3e6;

    #root__title {
      font-family: Roboto Condensed;
      font-weight: normal;
      font-size: 36px;
      line-height: 42px;
      letter-spacing: 0.3px;
      padding-top: 3.625rem;
    }

    #root__description {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 36px;
      color: #7b8285;
    }

    label {
      display: block;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0.3px;
      color: #436779;
    }

    input {
      :focus {
        outline-style: var(--focus-outline-style);
        box-shadow: var(--focus-box-shadow);
        border: var(--focus-standard-border);
      }
      &.form-control {
        width: 16.25rem;
        max-width: 100%;
        background: #e8edee;
        border-radius: 4px;
        ::placeholder {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #a5adb0;
        }
      }
    }

    textarea {
      :focus {
        outline-style: var(--focus-outline-style);
        box-shadow: var(--focus-box-shadow);
        border: var(--focus-standard-border);
      }
      &.form-control {
        width: 37rem;
        height: 2.5rem;
        max-width: 100%;
        background: #e8edee;
        border-radius: 4px;
        ::placeholder {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #a5adb0;
        }
      }
    }

    .form-group .image-checkboxes {
      display: flex;
      flex-flow: row wrap;
      div label span {
        display: flex;
        flex-direction: column;
        div {
          display: flex;
          justify-content: space-evenly;
          order: 2;
          input {
            width: 1.1em;
            height: 1.1em;
            background-color: white;
            border-radius: 50%;
            vertical-align: middle;
            border: 1px solid #ddd;
            -webkit-appearance: none;
            outline: none;
            cursor: pointer;
            &:checked {
              background-color: gray;
            }
          }
          span {
          }
        }
        img {
          order: 1;
        }
      }
    }
    .field-radio-group {
      display: flex;
      justify-content: space-evenly;

      label span {
        display: flex;
        flex-direction: column;
        input {
          width: 0.75rem;
          order: 2;
        }
        span {
          order: 1;
        }
      }
    }
    .checkboxes {
      display: flex;
      flex-flow: row wrap;
      .checkbox label span {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-right: 6rem;
        input {
          width: 1.1em;
          height: 1.1em;
          background-color: white;
          border-radius: 50%;
          vertical-align: middle;
          border: 1px solid #ddd;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
          margin-right: 1rem;
          &:checked {
            background-color: gray;
          }
        }

        span {
          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          letter-spacing: 0.3px;
          color: #000000;
        }
      }
    }

    .SingleDatePicker .SingleDatePickerInput__withBorder {
      border: none;
      .DateInput {
        background: #f7f8f9;
      }
      .DateInput_input {
        max-width: fit-content;
        background: #e8edee;
        border-radius: 4px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        @media (min-width: ${deviceWidth.mobile}px) {
          width: 20rem;
        }

        ::placeholder {
          line-height: 24px;
          color: #a5adb0;
        }
      }
      .DateInput .DateInput_input__focused {
        border: var(--focus-standard-border);
      }
    }
    .DateRangePicker .DateRangePicker_picker {
      z-index: 4;
    }
    .DateRangePickerInput__withBorder {
      border: none;
      background: #f7f8f9;
      .DateInput {
        background: #f7f8f9;
      }
      .DateInput_input {
        width: 100%;
        background: #e8edee;
        border-radius: 4px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        ::placeholder {
          color: #a5adb0;
          line-height: 24px;
        }
      }
      .DateInput .DateInput_input__focused {
        border: var(--focus-standard-border);
      }
    }

    div ul li {
      &.text-danger {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 10px;
        line-height: 24px;
        letter-spacing: 0.3px;
        color: #436779 !important;
      }
    }
  }

  .ighGkb form .buttons {
    button[type='submit'] {
      width: 120px;
      height: 50px;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
      border-radius: 4px;
      border: none;
      color: #fff;
      margin-left: 1.25rem;
      :focus {
        outline-style: none;
        box-shadow: none;
        border: 1px solid #fff;
      }
    }
    button[type='button'] {
      width: 120px;
      height: 50px;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      background: #fff;
      border-radius: 4px;
      border: none;
      color: #39c3e6;
      :focus {
        outline-style: var(--focus-outline-style);
        box-shadow: var(--focus-box-shadow);
        border: var(--focus-standard-border);
      }
    }
  }
`
