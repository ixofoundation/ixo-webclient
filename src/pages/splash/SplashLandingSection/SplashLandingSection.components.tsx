import { deviceWidth } from 'lib/commonData'
import { Row } from 'react-bootstrap'
import styled from 'styled-components'

export const SectionContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 74px);
  margin: 0;
  padding: 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;

  @media (max-width: ${deviceWidth.desktop}px) {
    height: calc(100vh - 64px);
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    height: calc(100vh - 79px);
  }
`

export const BackgroundWaveAnimation = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 100%;

  @media (max-width: ${deviceWidth.desktop}px) {
    width: 120%;
    margin: 0 -10%;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    width: 140%;
    margin: 0 -20%;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 160%;
    margin: 0 -30%;
  }
`

export const InnerContainer = styled.div`
  position: relative;
  flex: 1;
  padding: 0 5%;
  height: 100%;
`

export const TopContainer = styled.div`
  position: relative;
  z-index: 1;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-weight: 300;
  justify-content: center;
  height: 45%;
`

export const Heading = styled.h2`
  font-size: 44px;
  font-weight: 300;
  margin: 0;
  width: 100%;
  white-space: nowrap;

  @media (max-width: ${deviceWidth.tablet}px) {
    font-size: 32px;
  }

  .sentence {
    color: #83d9f2;
    margin-bottom: 1rem;
    font-size: 63px;

    @media (max-width: ${deviceWidth.tablet}px) {
      font-size: 48px;
    }
  }
`

export const SubHeading = styled.h3`
  position: relative;
  box-sizing: border-box;
  font-size: 22px;
  line-height: 24px;
`

export const BottomContainer = styled(Row)`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: #fff;
  margin: 0;
  font-weight: 300;
  height: 55%;
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: ${deviceWidth.tablet}px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
`

export const FlexWrapper = styled.div`
  display: block;

  @media (max-width: ${deviceWidth.tablet}px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 0;
  }
`

export const AppLabel = styled.p`
  display: block;
  width: 100%;
  font-size: 18px;
  font-weight: 300;
  line-height: 19px;
  margin-bottom: 0.7rem;
  font-family: Roboto;

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
  }
`

export const GradientButton = styled.a`
  border-radius: 8px;
  padding: 7px 70px;
  color: #fff;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: 2px solid transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(to right, #a930fa, #6155dd, #3b9ce5, #6fcbd3);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #000 inset;
  cursor: pointer;

  :hover {
    box-shadow: 2px 1000px 1px #142547 inset;
    text-decoration: none;
    color: #fff;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    max-width: 350px;
    min-width: 250px;
    text-align: center;
    width: 95%;
    height: 42px;
    padding: 7px;
    margin: 0 auto 35px;
  }
`

interface GradientAppButtonProps {
  marginRight?: number
}

export const GradientAppButton = styled(GradientButton)<GradientAppButtonProps>`
  display: inline-block;
  width: 147px;
  height: 46px;
  padding: 0;
  margin: 0;
  margin-right: ${/* eslint-disable-line */ (props) =>
    props.marginRight || 0}px;

  @media (max-width: ${deviceWidth.desktop}px) {
    padding: 0;
    width: 147px;
    height: 46px;
    margin: 0;
    margin-right: ${/* eslint-disable-line */ (props) =>
      props.marginRight || 0}px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    text-align: center;
    padding: 0;
    width: 147px;
    max-width: 147px;
    min-width: 147px;
    height: 46px;
    margin: 0;
    margin-right: ${/* eslint-disable-line */ (props) =>
      props.marginRight || 0}px;
  }
`

export const AppImg = styled.img`
  display: block;
  width: 143px;
  height: 42px;
  margin: 0;
  object-fit: cover;

  @media (max-width: ${deviceWidth.tablet}px) {
    display: initial;
  }
`

export const NextSectionButton = styled.div`
  left: 0;
  right: 0;
  bottom: 20px;
  z-index: 2;
  width: 37px;
  height: 24px;
  margin: 0 auto;
  position: absolute;
  animation float 2s infinite;
  animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
  cursor: pointer;
	
	@keyframes float {
		0% { 
      bottom: 20px
    }

		50% { 
      bottom: 35px 
    }

		100% { 
      bottom: 20px
    }
	}
`
