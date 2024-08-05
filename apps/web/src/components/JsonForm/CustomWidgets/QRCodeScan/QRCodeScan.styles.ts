import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const QRWrapper = styled.div``
export const ExplainerText = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  .explainer-text-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.75rem;
    line-height: 1.67;
    letter-spacing: 0.3px;
    &:not(:last-child) {
      margin-bottom: 1.125rem;
    }
    svg {
      width: 1.375rem;
      height: 1.375rem;
      display: block;
      margin-right: 1.75rem;
    }
    svg + div {
      flex: 1;
    }
    strong: {
      font-weight: bold;
    }

    @media (max-width: ${deviceWidth.tablet}px) {
      margin-top: 1.75rem;
    }
  }
  button {
    margin-top: 1.75rem;
    border: none;
    outline: none;
    background: transparent;
    font-weight: bold;
    color: ${(props: any): string => props.theme.colors.blue[5]};
  }
`
