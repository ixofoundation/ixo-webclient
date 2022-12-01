import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { deviceWidth } from 'constants/device'

export const GreyBackgroundContainer = styled.div`
  width: 100vw;
  background-color: #f6f6f6;
`

interface RowContainerProps {
  reverseorderonmobile?: string
}

export const RowContainer = styled(Row)<RowContainerProps>`
  padding: 0;
  background-size: cover;
  background-position: center;
  color: #282828;
  max-width: 1250px;

  @media (min-width: ${deviceWidth.desktop}px) {
  }

  @media (min-width: ${deviceWidth.tablet}px) {
  }

  @media (max-width: ${deviceWidth.tablet}px) {
    padding: 20px 0 40px;
    ${
      /* eslint-disable-line */ (props) =>
        props.reverseorderonmobile === 'true' ? `flex-direction: column-reverse;` : ''
    }
  }

  padding-top: 100px;
  padding-bottom: 100px;

  @media (max-width: ${deviceWidth.tablet}px) {
    padding-top: 35px;
    padding-bottom: 35px;
  }
`

export const ColumnContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const NoPaddingColumnContainer = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  @media (max-width: ${deviceWidth.tablet}px) {
    img {
      margin-top: 35px;
      margin-bottom: 35px;
    }
  }
`

export const SectionHeading = styled.h2`
  font-size: 47px;
  font-family: Roboto;
  margin-bottom: 0;
  width: 100%;
  color: #282828;
  line-height: 45px;

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 42px;
  }
  @media (max-width: ${deviceWidth.desktop}px) {
    margin-top: 40px;
    font-size: 40px;
  }
`

export const SectionSubheading = styled.h5`
  font-size: 22px;
  font-weight: normal;
  padding-top: 15px;
  color: #83d9f2;
  padding-bottom: 30px;

  @media (max-width: 1024px) {
    padding-top: 15px;
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    font-size: 20px;
  }
`

export const Paragraph = styled.p`
  margin-bottom: 25px;
  position: relative;
  box-sizing: border-box;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;

  @media (max-width: ${deviceWidth.desktop}px) {
    padding-right: 0;
    margin-top: 20px;
    font-size: 16px;
  }
`

export const AnimationContainer = styled.div`
  position: relative;
  margin: 0;
`

export const MarketplaceAnimationContainer = styled(AnimationContainer)`
  height: 570px;
  width: 570px;

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 450px;
    width: 450px;
  }

  @media (max-width: ${deviceWidth.desktop}px) {
    height: 330px;
    width: 330px;
  }

  @media (max-width: ${deviceWidth.tablet}px) {
  }
`

export const CollectionAnimationContainer = styled(AnimationContainer)`
  width: 301px;
  height: 301px;

  @media (max-width: ${deviceWidth.tablet}px) {
    max-width: 300px;
    max-height: 300px;
    height: 75vw;
    width: 75vw;
  }
`

export const CampaignAnimationContainer = styled(AnimationContainer)`
  width: 90%;
`

export const AnimationBackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  object-fit: cover;
  z-index: -1;
  height: 370px;
  width: 370px;

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    height: 330px;
    width: 330px;
  }
  @media (max-width: ${deviceWidth.desktopLarge}px) {
    height: 295px;
    width: 295px;
  }
  @media (max-width: ${deviceWidth.desktop}px) {
    height: 215px;
    width: 215px;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    height: 215px;
    width: 215px;
  }
  @media (max-width: ${deviceWidth.mobileSmall}px) {
    height: 51vw;
    width: 51vw;
  }
`

interface IconProps {
  iconColor: string
}

export const Card = styled.a<IconProps>`
  border-radius: 8px;
  border: 2px solid ${/* eslint-disable-line */ (props) => props.iconColor};
  background: #dcdcdc;
  width: 96px;
  height: 122px;
  margin: 0 0 8px 0;
  cursor: pointer;
  text-decoration: none;
  display: block;
  transition: all 0.5s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  transition: all 0.5s ease;

  :hover {
    text-decoration: none;
    background: ${/* eslint-disable-line */ (props) => props.iconColor};
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    width: 86px;
    height: 110px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    width: 71px;
    height: 95px;
  }
`

export const CardIcon = styled.i`
  font-size: 55px;

  :before {
    color: white;
  }

  @media (max-width: ${deviceWidth.desktopExtra}px) {
    font-size: 50px;
  }

  @media (max-width: ${deviceWidth.desktopLarge}px) {
    font-size: 45px;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    :before {
      font-size: 30px;
    }
  }
`

export const NoPaddingWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`

export const NoPaddingRow = styled(Row)`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const NoPaddingCol = styled(Col)`
  padding: 0;
  margin: 0;
`
