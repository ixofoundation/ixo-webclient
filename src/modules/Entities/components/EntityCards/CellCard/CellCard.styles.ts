import styled from 'styled-components'
import { deviceWidth } from '../../../../../lib/commonData'
import { Link } from 'react-router-dom'

export const CardTop = styled.div`
  overflow: hidden;
`

export const CardTopContainer = styled.div`
  padding: 10px;
  height: 250px;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.03);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  transition: all 0.3s ease;

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 225px;
  }

  :before {
    content: '';
    position: absolute;
    width: 100%;
    height: 33%;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.33) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  i {
    position: relative;
    z-index: 1;
  }
  i:before {
    color: white;
    font-size: 20px;
    margin: 10px 5px;
    display: inline-flex;
  }
`

export const SDGs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
`

export const Description = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 40px 20px 10px;
  text-align: left;
  transition: opacity 0.5s ease;

  @media (min-width: ${deviceWidth.desktop}px) {
    opacity: 0;
  }

  p {
    font-size: 13px;
    color: white;
    position: relative;
    top: -15px;
    text-align: center;
    width: 100%;

    transition: top 0.6s ease;
  }
`

export const CardBottom = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  flex: 1;
  padding: 0 14px 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 16px;
  p {
    font-weight: 300;
    color: ${/* eslint-disable-line */ props => props.theme.fontDarkGrey};
  }
`

export const CardBottomTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
`

export const StatusContainer = styled.div`
  display: flex;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

export const StatusText = styled.p`
  margin: 0;
  font-size: 12px;
`

export const Status = styled.div`
  &.PENDING {
    ${StatusText} {
      color: white;
      font-weight: bold;
      padding: 2px 10px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
      font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
    }
  }

  &.COMPLETED {
    ${StatusText} {
      color: #b6b6b6;
    }
  }
`

export const StatusLabel = styled.div`
  ${StatusText} {
    color: black;
    font-weight: 400;
    padding: 2px 10px;
    font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
  }
`

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

export const Logo = styled.img`
  width: 34px;
  border-radius: 17px;
`

export const CardBottomMiddleContainer = styled.div`
  margin: 30px 0 26px;
`

export const Title = styled.h3`
  font-weight: bold;
  font-size: 21px;
  box-sizing: border-box;
  margin-bottom: 2px;
  color: ${/* eslint-disable-line */ props => props.theme.fontDarkGrey};
  line-height: 1.2;
`

export const Founded = styled.p`
  font-size: 12px;
  margin-bottom: 0;
`

export const FoundedDate = styled.span`
  font-weight: bold;
`

export const StatisticsContainer = styled.div`
  display: flex;
  margin-bottom: 26px;
`

export const Statistic = styled.div`
  flex: 0.5;
  font-size: 24px;
`

export const StatisticLabel = styled.span`
  color: grey;
`

export const StatisticValue = styled.span`
  color: #000;
  font-weight: bold;
`

export const CardContainer = styled.div`
  margin-bottom: 34px;
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};
`

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0);
  height: 100%;
  transition: box-shadow 0.3s ease;

  :hover {
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.15);
    text-decoration: none;
  }

  :hover ${CardTopContainer} {
    transform: scale(1.05);
  }

  :hover ${Description} {
    opacity: 1;
  }

  :hover ${Description} p {
    top: 0;
  }
`
