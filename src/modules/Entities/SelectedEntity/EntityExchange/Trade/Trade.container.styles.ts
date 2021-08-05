import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { deviceWidth } from 'lib/commonData'

const textPrimary = "#01283B";
const textSecondary = "#7D8498";
const textHint = "#828E94";


interface HeroContainerProps {
  readonly onlyTitle: boolean
  light?: boolean
}

export const HeroContainer = styled.div<HeroContainerProps>`
  margin: 0;
  position: relative;
  background: ${(props: any): string =>
    props.light ? 'white' : props.theme.bg.blue };
  color: ${(props: any): string => (props.onlyTitle ? 'white' : 'black')};
`

export const HeroInner = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 0.875rem;
  line-height: 1rem;
  position: relative;
  padding-top: 4rem;
  padding-bottom: 2rem;
  @media (min-width: ${deviceWidth.tablet}px) {
    padding-top: 3rem;
    padding-bottom: 1rem;
  }
`

interface TitleProps {
  light?: boolean
}

export const Title = styled.h1<TitleProps>`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-weight: normal;
  font-size: 1.75rem;
  line-height: 1.25;
  margin: 0.5rem 0;
  color: ${ (props: any): string => props.light ? 'black' : 'inherit' };
  @media (min-width: ${deviceWidth.tablet}px) {
    font-size: 2.8125rem;
  }
`

export const StyledFundingTitle = styled.h1`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-weight: normal;
  font-size: 2.25rem;
  line-height: 1.25;
  color: white;
`

export const Description = styled.p`
  color: #7b8285;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

interface SingleNavProp {
  light: boolean
}

export const SingleNav = styled(NavLink)<SingleNavProp>`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  color: ${(props: any): string => props.light ? '#A5ADB0' : props.theme.fontBlueDisabled};
  font-size: 0.75rem;
  margin: 0 0.625rem 0 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none !important;
  cursor: pointer;
  text-transform: uppercase;

  &:hover,
  &:hover i:before {
    color: ${(props: any): string => props.theme.fontLightBlue};
  }

  &:last-of-type {
    color: ${(props: any): string => props.light ? '#000' : '#fff'};
    svg {
      display: none;
    }
  }

  svg {
    margin-left: 0.625rem;
    path {
      fill: ${(props: any): string => props.light ? '#A5ADB0' : '#436779'};
    }
  }
`

export const SingleSDG = styled.a`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  color: ${(props: any): string => props.theme.fontBlueDisabled};
  font-weight: '#436779';
  font-size: 0.625rem;
  margin: 0 0.625rem 0 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none !important;
  i {
    font-size: 1rem;
    margin-right: 8px;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    i {
      font-size: 1.25rem;
    }
  }

  &:hover,
  &:hover i:before {
    color: ${(props: any): string => props.theme.fontLightBlue};
  }

  &:last-of-type {
    color: white;
  }
`

export const HeroInfoItemsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
`

export const HeroInfoItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  margin: 0.25rem 0.75rem 0.25rem 0;
  font-weight: bold;
  * + span {
    margin-left: 0.5rem;
  }
  @media (min-width: ${deviceWidth.tablet}px) {
    margin: 0.875rem 2.25rem 0.875rem 0;
    * + span {
      margin-left: 0.875rem;
    }
  }
`

export const Flag = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 1.4rem;
  height: 1rem;
  border-radius: 4px;
  border: 0.5px solid #dfe3e8;
`

export const AddClaim = styled(Link)`
  color: white;
  display: inline-block;
  text-align: center;
  background: ${(props: any): string => props.theme.bg.gradientButton};
  font-size: 15px;
  width: 288px;
  padding: 10px 0;
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  margin-right: 10px;

  :hover {
    text-decoration: none;
    color: white;
    background: ${(props: any): string => props.theme.bg.lightBlue};
  }
`

export const SubNavItem = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  color: ${(props: any): string => props.theme.fontBlue};
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;

  &.active,
  :hover {
    color: ${(props: any): string => props.theme.fontBlue};
    text-decoration: underline;
  }

  + span {
    color: ${(props: any): string => props.theme.fontBlue};
    margin: 0 10px;
  }
`

export const TradeContainerLayout = styled.div`
  width: 100%;
  padding: 0px 30px;
`
export const CardLayout = styled.div`
  display: inline-block;
  padding: 0px 10px;
`

export const CardHeader = styled.span`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 41px;
  display: flex;
  align-items: center;
  color: #FFFFFF;
`
export const CardBodyAsset = styled.div`
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  width: 300px;
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-style: normal;

  & > img {
    width: 100%;
    box-shadow: 0px 10px 35px 0px rgb(0 0 0 / 25%);
    border-radius: 5px;
    border-bottom-left-radius: unset;
    border-bottom-right-radius: unset;
  }

  & .btn-group {

    & .btn {
      font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
      font-style: normal;
      font-weight: normal;
      font-size: 9px;
      line-height: 18px;
      color: black;
      box-shadow: 0px 10px 35px 0px rgb(0 0 0 / 25%);
      background-color: white;
      padding: 3px 7px;
      border-radius: 6px;
    }

    & .active {
      color: white;
      box-shadow: unset;
      background-color: #7C2740;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  & .token-logo {
    border-radius: 50%;
    background-color: #39C3E6;
    color: black;
    font-weight: 900;
    width: 35px;
    height: 35px;
    margin-top: -2px;
  }

  & .title {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: ${textPrimary};
  }

  & .location {
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: ${textHint};
  }

  & .shares {
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    color: black;
    margin-top: 5px;

    & > span {
      color: #00D2FF;
    }
  }

  & .count {
    & > span:nth-child(1) {
      font-weight: 500;
      font-size: 28px;
      color: ${textSecondary};

      & > b {
        color: ${textPrimary};
      }
    }
    & > span:nth-child(2) {
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: ${textPrimary};
      padding-left: 2px;
    }
  }

  & .verified {
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: ${textPrimary};
  }

  & .datetime {
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: ${textSecondary};
    padding-top: 3px;
  }
`