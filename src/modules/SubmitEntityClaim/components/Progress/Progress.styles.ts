import styled from 'styled-components'

export const ProgressWrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .progress-item {
    position: relative;
    background: #e8edee;
    color: #a5adb0;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    font-size: 0.5rem;
    line-height: 1rem;
    text-align: center;
    &.completed,
    &.active {
      background: #39c3e6;
      color: white;
    }
    &.completed {
      cursor: pointer;
    }
    &.active {
      width: 1.875rem;
      height: 1.875rem;
      font-size: 1rem;
      line-height: 1.875rem;
      font-weight: bold;
    }
    &:not(:last-child) {
      margin-right: 1.5rem;
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        width: 1.625rem;
        height: 1px;
        background: #e8edee;
      }
      &.completed:after {
        background: #39c3e6;
      }
    }
    .step-text {
      position: absolute;
      top: calc(100% + 0.25rem);
      left: 50%;
      width: 300px;
      max-width: 80vw;
      transform: translateX(-50%);
      font-weight: bold;
      font-size: 10px;
      line-height: 1.6;
      color: black;
      text-align: center;
      display: block;
    }
  }
`
