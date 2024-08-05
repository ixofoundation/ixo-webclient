import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const BackdropWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #f7f8f9;
  min-width: 320px;
  max-width: 98vw;
  min-height: 50vh;
  max-height: 98vh;
  padding: 2.125rem 1.25rem 1.25rem 1.25rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);

  > div {
    text-align: center;
    overflow: auto;
  }
`

export const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`

export const Button = styled.button`
  width: 120px;
  height: 50px;
  font-weight: bold;
  font-size: 1rem;
  line-height: 19px;
  border-radius: 4px;
  border: none;
  background: #fff;
  color: ${(props): string => props.theme.highlight.light};
  outline: none;
  box-shadow: none;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  margin-bottom: 0.75rem;

  &.submit {
    background: ${(props): string => props.theme.colors.blue[5]};
    color: #fff;
    &:focus {
      border: 1px solid #fff;
    }
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 100%;
  }
`
