import styled from 'styled-components'

// const textPrimary = "#01283B";
// const textSecondary = "#7D8498";
// const textHint = "#828E94";

export const CardHeader = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  color: #FFFFFF;

  & > span {
    color: #00D2FF;
  }
`

export const CardBody = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px;
`
export const WalletBox = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;

  & > img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
  }

  & > span {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    padding-left: 20px;
  }
`