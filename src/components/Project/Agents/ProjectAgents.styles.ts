import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'

export const Tab = styled(NavLink)`
  background: #143f54;
  border-radius: 0.25rem;
  padding: 0.3rem 1rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    text-decoration: none;
    color: #87def6;
  }
`

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  @media (min-width: ${deviceWidth.mobile}px) {
    font-size: 1.375rem;
  }
`

export const ActionButton = styled.button`
  border-radius: 0.25rem;
  font-size: 1rem;
  color: ${(props): string => props.theme.highlight.light};
  font-weight: 700;
  border: 1px solid ${(props): string => props.theme.highlight.light};
  background: transparent;
  width: 120px;
  height: 36px;

  @media (max-width: ${deviceWidth.mobile}px) {
    width: 100%;
    height: 50px;
    margin-top: 13px;
  }
`

export const Divider = styled.hr`
  border-color: #143f54;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
`

export const Container = styled.div`
  color: white;
  padding-bottom: 2rem;
`

export const MobileOnly = styled.div`
  display: none;
  @media (max-width: ${deviceWidth.mobile}px) {
    display: block;
  }
`

export const DesktopOnly = styled.div`
  display: block;
  @media (max-width: ${deviceWidth.mobile}px) {
    display: none;
  }
`
