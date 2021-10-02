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
        background: #00D2FF;
        color: #FFFFFF;
      }
      &.inactive {        
        background: transparent;
        color: #235975;
      }
      &.passed {
        background: #00D2FF;
      }

      
    }

    & > .stepText {
      padding-top: 5px;
      font-size: 13px;
      line-height: 15px;

      &.inactive {
        color: #83D9F2;
      }
      &.active {
        color: #FFFFFF;
      }
      &.passed {
        color: #83D9F2;
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
        height: 2px;
        background: #235975;
      }
      .stepNumber.passed > .setpNumberAfter {
        background: #00D2FF;
      }
    }

    &.pe-none {
      pointer-events: none;
    }
  }
`