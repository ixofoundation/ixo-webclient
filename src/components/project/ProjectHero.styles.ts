import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import * as instanceSettings from '../../instance-settings'
import { deviceWidth } from '../../lib/commonData'

export const SingleSDG = styled.a`
  &&& {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
  }
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-weight: 300;
  font-size: 14px;
  margin: 0 10px 0 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  i {
    font-size: 22px;
    margin-right: 8px;
  }

  i:before {
    width: 50px;
    display: inline-block;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    i:before {
      width: auto;
    }
  }

  &&&:hover,
  :hover i:before {
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
  }
`

export const HeroInner = styled.div`
  padding-top: 45px;
  padding-bottom: 94px;
  position: relative;
  height: 100%;

  @media (min-width: ${deviceWidth.desktop + 1}px) {
    padding-top: 150px;
  }
`

export const HeroContainer = styled.div`
  background: url(${instanceSettings.getBGImageSrc()}) no-repeat center top;
  background-size: cover;
  margin: 0;
  position: relative;

  .detailed {
    padding-bottom: 50px;
  }
`

export const ColLeft = styled.div``

export const ColRight = styled.div`
  color: white;
  font-weight: 200;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-bottom: 0;
    line-height: 24px;
  }

  i {
    margin-right: 8px;
  }

  i:before {
    color: white;
  }
`

export const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 200;
  line-height: 1;
  margin-bottom: 5px;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};

  @media (min-width: 600px) {
    font-size: 45px;
  }
`

export const Description = styled.p`
  color: white;
  font-size: 12px;
  margin-top: 2px;
`
export const HeaderText = styled.text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`

export const AddClaim = styled(Link)`
  color: white;
  display: inline-block;
  text-align: center;
  background: ${/* eslint-disable-line */ props =>
    props.theme.bg.gradientButton};
  font-size: 15px;
  width: 288px;
  padding: 10px 0;
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  margin-right: 10px;

  :hover {
    text-decoration: none;
    color: white;
    background: ${/* eslint-disable-line */ props => props.theme.bg.lightBlue};
  }
`

export const SubTextContainer = styled.div`
  margin-bottom: 10px;

  @media (min-width: ${deviceWidth.desktop}px) {
    margin-bottom: 0;
  }
`

export const SubNavItem = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
  font-family: ${/* eslint-disable-line */ props =>
    props.theme.fontRobotoCondensed};
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;

  &.active {
    color: white;
  }

  + span {
    color: ${/* eslint-disable-line */ props => props.theme.fontBlue};
    margin: 0 10px;
  }
  :hover {
    color: white;
    text-decoration: none;
  }
`
