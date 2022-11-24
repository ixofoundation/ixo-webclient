import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { deviceWidth } from 'lib/commonData'
import chevronLeft from 'assets/images/splash/chevron-left.svg'
import chevronRight from 'assets/images/splash/chevron-right.svg'

export const CarouselNextButton = styled.span`
  background-image: url(${chevronRight});
  width: 32px;
  height: 32px;
  background-position: right center;
`

export const CarouselPrevButton = styled.span`
  background-image: url(${chevronLeft});
  width: 32px;
  height: 32px;
  background-position: left center;
`

export const RadialBackgroundContainer = styled.div`
  background-color: rgba(0, 0, 0, 1);
  background: radial-gradient(
    100% 100% at 50% 100%,
    rgba(111, 203, 211) 0%,
    rgba(59, 156, 229) 17.71%,
    rgba(97, 85, 221) 35.42%,
    rgb(0, 0, 0) 83.85%
  );
  width: 100vw;
  left: 0;
  right: 0;
  position: relative;

  .carousel-control-next,
  .carousel-control-prev {
    width: 32px;
    opacity: 1;
  }

  :before {
    content: '';
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
`

export const RowContainer = styled(Row)`
  color: #fff;
  padding-bottom: 40px;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0 15px 25px;
  }
`

export const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: 
  font-family: Roboto;
  margin: 110px 15px 10px;
  width: 100%;
  color: #fff;
  line-height: 45px;
  z-index: 1;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    margin-top: 80px;
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    font-size: 44px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    margin: 40px 0 0;
    font-size: 40px;
  }
`

export const FeaturesLeft = styled(Col)`
  @media (max-width: ${deviceWidth.desktop}px) {
    padding: 0;
  }
`

export const Tab = styled.div`
  padding: 20px 35px;
  margin: 15px 0;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 50ms ease-in;

  &.active {
    border: 2px solid #a931fa;
    position: relative;
  }

  :hover {
    border: 2px solid #a931fa;
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    padding: 19px 33px;
    margin: 14px 0;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    padding: 16px 28px;
    margin: 12px 0;
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    &.active {
      background: #142547;
    }
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    margin: 10px 15px;
  }
`

export const TabTitle = styled.h4`
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 5px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 21px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 19px;
  }
`

export const TabDescription = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin: 0;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 17px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 16px;
  }
`

export const FeaturesRight = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0;
  }
`

interface TabCardProps {
  colors: string[]
}

export const TabCard = styled.div<TabCardProps>`
  display: flex;
  width: 230px;
  height: 230px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  text-align: center;
  margin: 0 8px 16px;
  border-radius: 8px;
  font-weight: 400;
  transition: all 500s ease-in-out;
  background: ${/* eslint-disable-line */ (props) => props.colors[0] || '#5075E1'};
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    linear-gradient(to right, ${/* eslint-disable-line */ (props) => props.colors.join(', ')});

  &.animate {
    transform: rotateY(90deg);
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: 190px;
    height: 190px;
    margin: 0 7px 14px;
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    width: 220px;
    height: 220px;
    padding: 7px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    width: 190px;
    height: 190px;
    padding: 7px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 170px;
    height: 170px;
    padding: 5px;
  }

  @media (max-width: 425px) {
    width: 130px;
    height: 130px;
  }
`

export const CardIcon = styled.img`
  color: #fff;
  height: 80px;
  width: 80px;
  padding-bottom: 15px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    height: 78px;
    width: 78px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 75px;
    width: 75px;
  }
  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 60px;
    width: 60px;
  }
`

export const CardText = styled.p`
  font-size: 18px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 17px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 16px;
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    font-size: 14px;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    font-size: 13px;
  }
`
