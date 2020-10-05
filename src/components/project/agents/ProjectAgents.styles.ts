import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { deviceWidth } from 'lib/commonData'

export const Tab = styled(NavLink)`
  background: #143F54;
  border-radius: 0.25rem;
  padding: 0.3rem 1rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    text-decoration: none;
    color: #87DEF6;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  @media (min-width: ${deviceWidth.mobile}px) {
    font-size: 1.375rem;
  }
`

export const ActionButton = styled.button`
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #39C3E6;
  font-weight: 700;
  border: 1px solid #39C3E6;
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
  border-color: #143F54;
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
`

export const Container = styled.div`
  color: white;
  padding-bottom: 2rem;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: ${deviceWidth.mobile}px) {
    padding-left: 40px;
    padding-right: 40px;
  }
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