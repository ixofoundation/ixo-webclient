import styled from 'styled-components'

export const Label = styled.div`
  font-family: Roboto;
  font-size: 14px;
  color: #678a9c;
`

export const DiscountsOptionWrapper = styled.div`
  & > div {
    background: #03324a;
    border: 1px solid #25758f;
    border-radius: 13px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #678a9c;
    padding: 5px 15px;
    margin-left: 10px;
    cursor: pointer;
    &.active {
      color: #ffffff;
      background: #00d2ff;
    }
    & > div > input {
      width: 32px;
    }
  }
`
