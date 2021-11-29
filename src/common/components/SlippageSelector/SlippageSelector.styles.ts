import styled from 'styled-components'

export const SlippageContainer = styled.div`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
`

export const Label = styled.div`
  font-family: Roboto;
  font-size: 14px;
  color: #678a9c;
`

export const SlippageOptionWrapper = styled.div`
  & > div {
    background: #002233;
    border-radius: 13px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    padding: 5px 15px;
    margin: 0px 5px;
    cursor: pointer;

    &.active {
      background: #00d2ff;
    }
  }
`
