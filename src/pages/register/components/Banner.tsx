import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 60px;
  padding-bottom: 60px;

  background: url(${require('assets/images/register/background.jpg').default})
    no-repeat center top;
  background-size: cover;

  p {
    color: white;
    font-weight: 200;
    font-size: 18px;
  }
`

const Title = styled.h1`
  color: white;
  font-weight: 300;
  font-size: 36px;
  line-height: 1;
  margin-bottom: 10px;
  font-family: ${/* eslint-disable-line */ (props) =>
    props.theme.secondaryFontFamily};

  span {
    color: ${/* eslint-disable-line */ (props) => props.theme.fontLightBlue};
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

export const Banner: React.SFC<{}> = (): JSX.Element => {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Title>
              Join the world of <span>impact</span>
            </Title>
            <p>
              ixo is now in closed beta and inviting pioneers to help with
              testing. <br />
              Please identify a role to begin with:
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
