import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;

  background: url(${require('../../../assets/images/register/background.jpg')})
    no-repeat center top;
  background-size: cover;

  p {
    color: white;
  }
`

const Title = styled.h1`
  color: white;
  font-size: 36px;
  line-height: 1;
  margin-bottom: 10px;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};

  span {
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
  }

  @media (min-width: 600px) {
    font-size: 45px;
  }

  :after {
    content: ' ';
    display: block;
    position: relative;
    height: 1px;
    width: 100px;
    margin-top: 20px;
    background: rgb(0, 210, 255);
  }
`

export const Banner: React.SFC<{}> = () => {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Title>Launch a Project</Title>
            <p>
              Create your own impact projects on the ixo blockchain.
              <br />
              Become a stake-holder in projects you believe in.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
