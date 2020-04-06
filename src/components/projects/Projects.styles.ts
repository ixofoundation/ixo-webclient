import styled from 'styled-components'
import { deviceWidth } from '../../lib/commonData'
import { Link } from 'react-router-dom'
import * as instanceSettings from '../../instance-settings'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`

export const ProjectsContainer = styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightGrey};
  flex: 1 1 auto;
  min-height: 480px;

  & > .row {
    margin-top: 30px;
    justify-content: center;
  }

  > .container {
    padding: 2rem 0 3.125rem;
    @media (min-width: ${deviceWidth.tablet}px) {
      padding: 4.5rem 0 3.125rem;
    }
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: white;
  align-items: center;
  background-color: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  height: 100%;
  min-height: 480px;
`
export const Title = styled.h3`
  font-weight: 400;
  font-size: 21px;
  box-sizing: border-box;
  margin: 12px 0;
  color: ${/* eslint-disable-line */ props => props.theme.fontDarkGrey};
  line-height: 1.2;
`

export const Owner = styled.p`
  font-size: 11px;
  margin-bottom: 15px;
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

    transition: top 0.6s ease;
  }
`

export const Progress = styled.p`
  font-size: 23px;
  font-weight: lighter;
  margin: 15px 0 0;
`

export const Impact = styled.p`
  font-size: 13px;
  font-weight: 400;
`

export const SDGs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-end;
`

export const CardTop = styled.div`
  border-radius: 2px 2px 0 0;
  padding: 10px;
  height: 250px;
  box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.03);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center top;

  transition: background-size 0.3s ease;

  position: relative;

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

export const CardBottom = styled.div`
  border-radius: 0 0 2px 2px;
  flex: 1;
  padding: 0 14px 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    font-weight: 300;
    color: ${/* eslint-disable-line */ props => props.theme.fontDarkGrey};
  }
`

export const StatusContainer = styled.div`
  display: flex;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
`

export const StatusText = styled.p`
  margin: 0;
  font-size: 12px;
`

export const ProjectStatus = styled.div`
  &.PENDING {
    ${StatusText} {
      color: white;
      font-weight: 400;
      padding: 2px 10px;
      border-radius: 2px;
      background: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
      font-family: ${/* eslint-disable-line */ props =>
        props.theme.fontRobotoCondensed};
    }
  }

  &.COMPLETED {
    ${StatusText} {
      color: #b6b6b6;
    }
  }
`

export const CardContainer = styled.div`
  margin-bottom: 34px;
`

export const ProjectLink = styled(Link)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0);
  background: white;
  height: 100%;
  border: 1px solid #e2e2e2;

  transition: box-shadow 0.3s ease;

  :hover {
    box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.15);
    text-decoration: none;
  }

  :hover ${CardTop} {
    background-size: auto 105%;
  }

  :hover ${Description} {
    opacity: 1;
  }

  :hover ${Description} p {
    top: 0;
  }
`

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
    background: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }
  p:nth-child(2):before {
    background: ${/* eslint-disable-line */ props => props.theme.ixoOrange};
  }
  p:nth-child(3):before {
    background: ${/* eslint-disable-line */ props => props.theme.red};
  }
  p:nth-child(4):before {
    background: #033c50;
  }
`
export const ContainerInner = styled.div`
  height: auto;
  width: 100%;
  transition: border-left 0.3s ease;

  > div {
    transition: transform 0.3s ease;
  }
  @media (max-width: ${deviceWidth.mobile}px) {
    padding-top: 16%;
  }
`

export const StatisticContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  padding: 0;
  justify-content: center;

  @media (min-width: ${deviceWidth.tablet}px) {
    ${ContainerInner} {
      border-left: 1px solid rgba(73, 191, 224, 0.3);
    }
  }

  :first-child > div {
    border-left: 0;
  }
`

export const HeroInner = styled.div`
  height: 100%;

  > .row {
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  :hover ${ContainerInner} {
    border-left: 1px solid rgba(73, 191, 224, 0);
  }

  :hover ${ContainerInner} > div {
    transform: scale(1.05);
  }
`

export const HeroContainer = styled.div`
  background: url(${instanceSettings.getBGImageSrc()}) no-repeat center top;
  background-size: cover;
  margin: 0 0 0px;
  cursor: pointer;
  position: relative;

  ${HeroInner}:before {
    position: absolute;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: background 0.3s ease;

    background-color: rgba(3, 60, 80, 0);
  }

  ${HeroInner}:hover:before {
    background-color: rgba(3, 60, 80, 0.6);
    cursor: normal;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    height: 200px;
  }
`
