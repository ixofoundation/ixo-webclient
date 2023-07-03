import styled from 'styled-components'

export const DashboardContainer = styled.div`
  color: white;
  flex: 1 1 auto;
  display: flex;
`

export const ClaimsWidget = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  flex-wrap: wrap;
`

export const ClaimsLabels = styled.div`
  margin-top: 40px;

  strong {
    font-weight: 700;
  }

  p:before {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 25px;
  }
  p:nth-child(1):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoNewBlue};
  }
  p:nth-child(2):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoOrange};
  }
  p:nth-child(3):before {
    background: ${/* eslint-disable-line */ (props) => props.theme.ixoRed};
  }
  p:nth-child(4):before {
    background: #033c50;
  }
`
