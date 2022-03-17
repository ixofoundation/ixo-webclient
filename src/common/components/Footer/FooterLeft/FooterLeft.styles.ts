import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const FooterMenuPosition = styled.div`
  position: relative;
  @media (min-width: ${deviceWidth.tablet}px) {
    left: 9rem;
  }
  @media (min-width: ${deviceWidth.desktop}px) {
    left: 14rem;
  }
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    left: 20rem;
  }
`

export const FooterMenuWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;

  @media (min-width: ${deviceWidth.desktop}px) {
    margin: 0 -5.6rem;
  }

  @media (min-width: ${deviceWidth.desktopLarge}px) {
    margin: 0 -5rem;
  }
`

export const FooterMenu = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  max-width: calc(100% / 2 - 1rem);
  line-height: 2.25rem;
  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-right: 1.625rem;
    margin-top: 2rem;
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    max-width: calc(100% / 4 - 1rem);
    flex: unset;
    line-height: unset;
    margin-right: 1rem;
  }

  @media (min-width: 420px) {
    h4 {
      margin-right: 6rem;
    }
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    h4 {
      margin-left: 1.875rem;
    }
  }

  @media (min-width: ${deviceWidth.desktopLarge}px) {
    h4 {
      margin-right: 9rem;
    }
  }
`

export const FooterLink = styled(NavLink)`
  display: block;
  font-family: ${(props: any): string => props.theme.fontRobotoRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  color: #7b8285;
  margin: 0 1.625rem 0 0;
  transition: border 0.3s ease;

  &.nowrap {
    white-space: nowrap;
  }

  &.disabled {
    pointer-events: none;
  }

  :hover {
    text-decoration: none;
    color: ${(props: any): string => props.theme.fontBlue};
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 0.625rem 1.25rem 0.625rem;
    margin: 0 0.625rem;
    font-size: 15px;
  }
`

export const ExternalFooterLink = styled.a`
  display: block;
  font-family: ${(props: any): string => props.theme.fontRobotoRegular};
  margin: 0;
  font-size: 1rem;
  font-weight: normal;
  margin: 0 1.625rem 0 0;
  white-space: nowrap;
  color: #7b8285;

  &.mailto {
    color: #39c3e6;
  }

  :hover {
    text-decoration: none;
    color: ${(props: any): string => props.theme.fontBlue};
  }

  transition: border 0.3s ease;

  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 0.625rem 1.25rem 0.625rem;
    margin: 0 0.625rem;
    font-size: 15px;
  }

  transition: border 0.3s ease;
`

export const IXOLogo = styled.img`
  margin-right: 1.25rem;
  width: 3.125rem;
  margin-top: 2px;
`

export const FooterTextBlue = styled.span`
  color: #39c3e6;

  :hover {
    text-decoration: underline;
  }
`

export const FooterText = styled.div`
  padding: 10px 0px 10px 0;
  color: #808080;
  font-family: Roboto;
  font-size: 14px;
  line-height: 19px;

  @media (min-width: ${deviceWidth.tablet}px) {
    padding-left: 3.5rem;
  }

  a {
    font-weight: 400;
    margin-bottom: 1rem;
  }
  p {
    font-size: 13px;
    color: #808080;
    display: block;
    font-weight: 400;
    margin: 0;
  }
`

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  hr {
    border: 1px solid #2a2e2f;
    width: 500%;
    margin-left: -200%;
    margin-top: 3rem;
  }
`

export const ByLine = styled.div`
  align-items: baseline;
  a {
    color: #7b8285;
  }

  a:hover {
    color: white;
  }

  a:not(:first-child):before {
    content: '|';
    font-size: 1rem;
    margin: 0 15px;
    color: #808080;
  }

  p {
    &.legalInfo {
      margin-top: 1rem;
    }
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    p {
      &.loc {
        margin-right: 2.5rem;
      }
      &.legalInfo {
        margin-top: 0;
      }
    }
  }
`
