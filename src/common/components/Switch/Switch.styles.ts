import styled from 'styled-components'

export const SwitchWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  font-weight: normal;
  font-size: 0.75rem;
  color: black;
  cursor: pointer;

  span {
    margin-right: 1.125rem;
  }

  .switch {
    background-color: transparent;
    height: 0.75rem;
    width: 1.375rem;
    background: #e8edee;
    border-radius: 1.25rem;
    position: relative;
    margin: 0 0.375rem 0 1.125rem;

    .switch-handle {
      background-color: #a5adb0;
      border-radius: 18px;
      display: block;
      height: 0.875rem;
      width: 0.875rem;
      transition: all 0.3s ease-in-out;
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translateY(-50%);
    }

    &.active {
      background: #39c3e6;
      .switch-handle {
        left: auto;
        right: -4px;
      }
    }
  }
`
