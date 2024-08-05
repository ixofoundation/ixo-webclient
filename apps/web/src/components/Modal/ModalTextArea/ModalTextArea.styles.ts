import styled from 'styled-components'

export const ModalTextAreaWrapper = styled.div`
  position: relative;
  background: #03324a;
  border: 1px solid ${(props) => props.theme.colors.blue[5]};
  border-radius: 4px;
  padding: 25px;
  &.disabled {
    border: 1px solid transparent;
  }
  &.error {
    border: 1px solid #e2223b;
  }
`

export const IconWrapper = styled.div`
  border-radius: 50%;
  background-color: #053f5c;
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

export const TextAreaWrapper = styled.div`
  textarea {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: bold;
    font-size: 15px;
    color: #ffffff;
    width: 100%;
    white-space: nowrap;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    border-radius: unset;

    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: #537b8e;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #03324a inset !important;
      -webkit-background-clip: text;
      -webkit-text-fill-color: #ffffff !important;
    }
  }
`

export const InvalidLabel = styled.div`
  color: #cd1c33;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  padding-top: 5px;
`
