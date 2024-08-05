import styled from 'styled-components'

export const StepsWrapper = styled.div`
  & .stepContainer {
    cursor: pointer;

    & > .stepNumber {
      position: relative;
      padding: 5px;
      border-radius: 50%;
      border: 1px solid #235975;

      font-size: 13px;
      line-height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;

      &.active {
        background: ${(props) => props.theme.colors.blue[5]};
        color: #ffffff;
      }
      &.inactive {
        background: transparent;
        color: #235975;
      }
      &.passed {
        background: ${(props) => props.theme.colors.blue[5]};
      }
    }

    & > .stepText {
      padding-top: 5px;
      font-size: 13px;
      line-height: 15px;
      font-weight: 700;

      &.inactive {
        color: #83d9f2;
      }
      &.active {
        color: #ffffff;
      }
      &.passed {
        color: #83d9f2;
      }
    }

    &:not(:last-child) {
      .stepNumber > .setpNumberAfter {
        content: '';
        position: absolute;
        top: 50%;
        left: calc(100% + 1px);
        transform: translateY(-50%);
        width: 1.625rem;
        height: 1px;
        background: #235975;
      }
      .stepNumber.passed > .setpNumberAfter {
        background: ${(props) => props.theme.colors.blue[5]};
      }
    }

    &.pe-none {
      pointer-events: none;
    }
  }
`
