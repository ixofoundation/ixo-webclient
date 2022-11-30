import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from 'constants/device'

export const ToolTip = styled.div`
  position: absolute;
  left: 90%;
  background: #001926;
  padding: 6px 10px;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  color: white;
  white-space: nowrap;

  :after {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    right: 100%;
    border-right: 8px solid #001926;
    top: 8px;
  }
`

export const NavItem = styled(NavLink)`
  color: white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-top: 5px solid transparent;
  position: relative;
  svg {
    width: 1.5rem;
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    margin: 30px 0;
    width: 100%;
    border-top: 0;
    border-left: 5px solid transparent;

    :hover ${ToolTip} {
      opacity: 1;
      left: 100%;
    }
  }

  :hover {
    text-decoration: none;
  }
`

export const Container = styled.div`
  width: 100%;
  padding-top: 0;
  position: relative;
  top: auto;
  display: none;
  justify-content: space-evenly;
  height: auto;
  z-index: 1;
  background: linear-gradient(180deg, #012639 0%, #002d42 97.29%);

  .active {
    border-top: 5px solid ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    position: sticky;
    top: 70px;
    width: 75px;
    min-width: 75px;
    display: block;
    padding-top: 15px;

    .active {
      border-top: 0;
      border-left: 5px solid ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
    }
  }
`
