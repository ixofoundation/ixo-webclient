import styled from 'styled-components'

export const ModalInputWrapper = styled.div`
  position: relative;
  background: #03324A;
  border: 1px solid #49BFE0;
  border-radius: 4px;
  padding: 15px;

  &.disable {
    border: 1px solid transparent;
  }
  &.invalid {
    border: 1px solid #E2223B;
  }
`

export const IconWrapper = styled.div`
  border-radius: 50%;
  background-color: #053F5C;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`

export const InputWrapper = styled.div`
  input {
    font-family: Roboto;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    color: #FFFFFF;

    background: none;
    border: none;
    padding: 0;
    height: 20px;
    border-radius: unset;

    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: #537B8E;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #03324A inset !important;
    }
  }
  &.disable {
    pointer-events: none;
  }
`

export const InvalidLabel = styled.div`
  color: #CD1C33;  
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  padding-top: 5px;
`