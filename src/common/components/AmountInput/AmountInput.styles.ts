import styled from 'styled-components'

export const AmountInputWrapper = styled.div`
  position: relative;
  background: #03324A;
  border: 1px solid #49BFE0;
  border-radius: 4px;

  &.disable {
    border: 1px solid transparent;
  }
`

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`

export const InputWrapper = styled.div`
  input {
    font-family: Roboto;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    padding: 15px;

    background: none;
    border: none;
    height: 50px;
    border-radius: unset;

    &:focus-visible {
      outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::placeholder {
      color: #537B8E;
    }
  }
`

export const MemoInputWrapper = styled.div`
  input {
    font-family: Roboto;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    padding: 15px;

    background: #FFFFFF88;
    border: none;
    height: 50px;
    border-radius: unset;

    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: #537B8E;
    }
  }
`