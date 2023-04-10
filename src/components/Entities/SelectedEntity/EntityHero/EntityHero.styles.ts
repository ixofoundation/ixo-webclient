import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'

interface HeroContainerProps {
  readonly onlyTitle: boolean
  light?: boolean | number
}

export const HeroContainer = styled.div<HeroContainerProps>`
  margin: 0;
  position: relative;
  background: ${(props: any): string => (props.light ? 'transparent' : props.theme.ixoDarkestBlue)};
  color: ${(props: any): string => (props.onlyTitle ? 'white' : 'black')};
`

export const HeroInner = styled.div`
  font-family: ${(props): string => props.theme.primaryFontFamily};
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
  light?: boolean | number
}

export const Title = styled.h1<TitleProps>`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-weight: normal;
  font-size: 1.75rem;
  line-height: 1.25;
  margin: 0.5rem 0;
  color: ${(props: any): string => (props.light ? 'black' : 'inherit')};
  @media (min-width: ${deviceWidth.tablet}px) {
    font-size: 2.8125rem;
  }
`

export const StyledFundingTitle = styled.h1`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
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
  light: boolean | number
}

export const SingleNav = styled(NavLink)<SingleNavProp>`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  color: ${(props: any): string => (props.light ? '#A5ADB0' : props.theme.ixoDarkBlue)};
  font-size: 0.75rem;
  margin: 0 0.625rem 0 0;
  display: inline-flex;
  align-items: center;
  text-decoration: none !important;
  cursor: pointer;
  text-transform: uppercase;

  &:hover,
  &:hover i:before {
    color: ${(props: any): string => props.theme.ixoLightBlue};
  }

  &:last-of-type {
    color: ${(props: any): string => (props.light ? '#000' : '#fff')};
    svg {
      display: none;
    }
  }

  svg {
    margin-left: 0.625rem;
    path {
      fill: ${(props: any): string => (props.light ? '#A5ADB0' : '#436779')};
    }
  }
`

export const SingleSDG = styled.a`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  color: ${(props: any): string => props.theme.ixoDarkBlue};
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
    color: ${(props: any): string => props.theme.ixoLightBlue};
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
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  margin-right: 10px;

  :hover {
    text-decoration: none;
    color: white;
    background: ${(props: any): string => props.theme.ixoMediumBlue};
  }
`

export const SubNavItem = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  color: ${(props: any): string => props.theme.ixoBlue};
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;

  &.active,
  :hover {
    color: ${(props: any): string => props.theme.ixoBlue};
    text-decoration: underline;
  }

  + span {
    color: ${(props: any): string => props.theme.ixoBlue};
    margin: 0 10px;
  }
`
