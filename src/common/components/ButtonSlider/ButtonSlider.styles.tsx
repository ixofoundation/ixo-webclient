import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const Container = styled.div`
  display: flex;
  align-items: center;

  a {
    width: fit-content;
    min-width: 4rem;
    color: ${(props): string => props.theme.highlight.light} !important;
    border-radius: 4px !important;
    font-size: 0.75rem !important;
    padding: 0.25rem 0.625rem !important;
    text-transform: none;
    margin-right: 0.625rem;
    background: #143f54;
    white-space: nowrap;
    margin-bottom: 0;
    line-height: initial;
    cursor: pointer;
  }

  a.disabled {
    border-color: transparent;
    cursor: pointer;
    opacity: 0.5;
  }

  a.disabled:hover {
    border: 1px solid #49bfe0;
    opacity: 0.8;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 100%;
  }
`

export const NavigateButtonContainer = styled.div<{ light: boolean }>`
  display: flex;
  button {
    background: ${({ light }): string => (light ? 'white' : '#143f54')};
    border-radius: 4px;
    outline: none !important;
    border: none;
    height: 25px;
    width: 25px;
    margin: 0px 2px;
    &.left {
      svg {
        transform: rotate(90deg);
      }
    }

    &.right {
      svg {
        transform: rotate(-90deg);
      }
    }
  }
`

export const NavContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  position: relative;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Graident = styled.div`
  display: block;
  position: absolute;
  right: 0;
  background: linear-gradient(270deg, #01273a 14.48%, rgba(1, 39, 58, 0) 100%);
  width: 4rem;
  height: 100%;
`
