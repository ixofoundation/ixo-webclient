import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const Banner = styled.div`
  background: #002233 url(${require('../assets/images/404/404-bg.jpg')}) no-repeat;
  background-size: cover;
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  margin: 0;
`
export const BannerLeft = styled.div`
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
export const BannerRight = styled.div`
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
    font-family: ${(props) => props.theme.secondaryFontFamily};
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
    font-family: ${(props) => props.theme.secondaryFontFamily};
    margin-top: 20px;
    cursor: pointer;
  }
`

export const ButtonContainer = styled.div`
  display: inline-flex;
  margin-top: 20px;
`
