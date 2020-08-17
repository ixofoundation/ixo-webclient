import styled from 'styled-components'

export const QRImg = styled.img`
  width: 150px;
  height: 150px;
`

export const QRContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const QRInner = styled.div`
  background: white;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  width: 180px;
  padding: 0 15px 15px;
  height: 195px;
  text-align: center;

  p {
    font-size: 12px;
    color: #292929;
    font-weight: 300;
    margin-top: -5px;
  }
`
