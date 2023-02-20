import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Container = styled.div`
  background: #f0f3f9;
  padding: 0px 38px;
  padding-top: 27px;
  padding-bottom: 16px;
`

export const SingleNav = styled(NavLink)`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  color: #a5adb0;
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
    color: #000;
    svg {
      display: none;
    }
  }

  svg {
    margin-left: 0.625rem;
    path {
      fill: #a5adb0;
    }
  }
`

export const Title = styled.div`
  color: #01283b;
  font-size: 45px;
  font-weight: normal;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
`
