import styled from 'styled-components'

export const InlineSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: normal;
  font-size: 0.75rem;
  color: ${(props): string => props.theme.ixoColor1};
  cursor: pointer;
  margin: 20px 0px;

  span {
    margin-right: 1.125rem;
    line-height: 100%;
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
      background: ${(props): string => props.theme.highlight.light};
      .switch-handle {
        left: auto;
        right: -4px;
      }
    }
  }
`
