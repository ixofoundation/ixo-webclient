import * as React from 'react'
import styled from 'styled-components'
import { deviceWidth } from '../../lib/commonData'
import { ButtonTypes, Button } from '../common/Buttons'

const Banner = styled.div`
  background: #002233 url(${require('../../assets/images/404/404-bg.jpg')})
    no-repeat;
  background-size: cover;
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  margin: 0;
`
const BannerLeft = styled.div`
  width: 100%;
  img {
    margin-top: 10%;
    margin-left: -3%;
    width: 90%;
  }
  @media (max-width: 1240px) {
    img {
      display: none;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    img {
      display: none;
    }
  }
`
const BannerRight = styled.div`
  width: 100%;
  color: white;
  margin-top: 22%;
  margin-right: 10%;
  @media (max-width: 992px) {
    margin-top: 0;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    margin-top: -20px;
  }
  h2 {
    font-size: 60px;
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
    margin-bottom: 5px;
    width: 100%;
  }
  @media (max-width: 1240px) {
    h2 {
      margin-bottom: 20px;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    h2 {
      line-height: 60px;
      margin-bottom: 15px;
    }
  }
  h5 {
    font-size: 23px;
    font-weight: 300;
  }
  p {
    padding-top: 30px;
    position: relative;
    box-sizing: border-box;
    font-weight: 300;
    padding-right: 55%;
    margin-bottom: 0;
  }
  @media (max-width: 1240px) {
    p {
      padding-top: 18px;
    }
  }
  @media (max-width: 1024px) {
    p {
      padding-top: 20px;
      padding-right: 35%;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    p {
      padding-top: 30px;
      padding-right: 25%;
    }
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    p {
      padding-top: 20px;
      padding-right: 18%;
    }
  }
  p::before {
    content: ' ';
    display: block;
    position: absolute;
    height: 1px;
    background: #00d2ff;
    width: 100px;
    top: 15%;
  }
  @media (max-width: 1024px) {
    p::before {
      top: -2%;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    p::before {
      top: 14%;
    }
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    p::before {
      top: 5%;
    }
  }
  button {
    background: none;
    color: white;
    border: 1px solid #49bfe0;
    padding: 10px 25px;
    text-transform: uppercase;
    font-size: 15px;
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
    margin-top: 20px;
    cursor: pointer;
  }
`

const ButtonContainer = styled.div`
  display: inline-flex;
  margin-top: 20px;
`

export const NotFound: React.SFC = () => {
  return (
    <Banner className="row">
      <div className="col-lg-4">
        <BannerLeft>
          <img
            src={require('../../assets/images/404/walrus-image.png')}
            alt=""
          />
        </BannerLeft>
      </div>
      <div className="col-lg-8 col-md-12">
        <BannerRight>
          <div className="container">
            <h2>Oops, something went wrong.</h2>
            <p>
              The link you followed may either be broken or no longer exists.{' '}
            </p>
            <ButtonContainer>
              <Button
                type={ButtonTypes.dark}
                onClick={(): void => history.back()}
              >
                Back to previous page
              </Button>
            </ButtonContainer>
          </div>
        </BannerRight>
      </div>
    </Banner>
  )
}
