import styled from 'styled-components'
import { deviceWidth } from '../../../src/lib/commonData'

export const SubmitEntityClaimWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
`

export const Container = styled.div`
  .form-group.field-object {
    background: #f7f8f9;
    border: 1px solid #39c3e6;
    border-radius: 4px;
    margin-top: 1.75rem;
    padding: 2.125rem 1.25rem;
    @media (min-width: ${deviceWidth.mobile}px) {
      padding: 3.5rem 4.25rem;
    }
  }

  #root {
    --focus-outline-style: none;
    --focus-box-shadow: none;
    --focus-standard-border: 1px solid #39c3e6;

    #root__title {
      font-family: ${(props): string => props.theme.fontRobotoCondensed};
      font-weight: normal;
      font-size: 1.5rem;
      line-height: 1.2;
      letter-spacing: 0.3px;
      @media (min-width: ${deviceWidth.mobile}px) {
        font-size: 2.25rem;
      }
    }

    #root__description {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.125rem;
      line-height: 2;
      color: #7b8285;
    }

    label {
      display: block;
      font-weight: normal;
      font-size: 0.75rem;
      line-height: 1.2;
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
          font-size: 1rem;
          line-height: 1.5;
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
          font-size: 1rem;
          line-height: 1.5;
          color: #a5adb0;
        }
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
              width: 0.9375rem;
              height: 0.9375rem;
              margin-right: 1.125rem;
              margin-bottom: 0;
              background-color: #dfe3e8;
              border-radius: 50%;
              vertical-align: middle;
              border: none;
              -webkit-appearance: none;
              outline: none;
              cursor: pointer;
              flex: 0 0 auto;
              &:checked {
                background-color: #39c3e6;
              }
            }
          }
          img {
            width: 100%;
            height: initial;
            object-fit: cover;
            order: 1;
            background: white; /* @todo remove this when we have proper images */
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            margin-bottom: 1.25rem;
          }
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
      &:before {
        content: 'From first';
      }
      &:after {
        content: 'To last';
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
        white-space: nowrap;
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
          font-size: 1rem;
          line-height: 24px;
          display: flex;
          align-items: center;
          letter-spacing: 0.3px;
          color: #000000;
        }
      }
    }

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

    .DateRangePicker .DateRangePicker_picker {
      z-index: 4;
    }
    .DateRangePickerInput__withBorder {
      border: none;
      background: #f7f8f9;

      .DateRangePickerInput_arrow {
        visibility: hidden;
        width: 1rem;
      }
      .DateInput {
        width: 17rem;
        position: relative;
        background: #f7f8f9;
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
          color: #a5adb0;
          line-height: 24px;
        }
        &:after {
          content: '';
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

  form .buttons {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    button {
      width: 120px;
      height: 50px;
      font-weight: bold;
      font-size: 1rem;
      line-height: 19px;
      border-radius: 4px;
      border: none;
    }
    button[type='submit'] {
      background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
      color: #fff;
      :focus {
        outline-style: none;
        box-shadow: none;
        border: 1px solid #fff;
      }
    }
    button[type='button'] {
      background: #fff;
      color: #39c3e6;
      border: 1px solid #39c3e6;
      :focus {
        outline-style: var(--focus-outline-style);
        box-shadow: var(--focus-box-shadow);
      }
    }
  }
`
