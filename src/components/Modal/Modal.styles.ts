import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;
  background: #f7f8f9;
  min-width: 320px;
  min-height: 50vh;
  padding: 2.125rem 1.25rem 1.25rem 1.25rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-50%);

  > div {
    text-align: center;
  }

  .button-wrapper {
    margin-top: 1.5rem;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    button {
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
        background: ${(props): string => props.theme.ixoNewBlue};
        color: #fff;
        &:focus {
          border: 1px solid #fff;
        }
      }
      @media (max-width: ${deviceWidth.mobile}px) {
        width: 100%;
      }
    }
  }
`
