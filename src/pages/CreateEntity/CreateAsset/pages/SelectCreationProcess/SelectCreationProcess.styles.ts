import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 50px;
`

export const Selections = styled.div`
  display: flex;
  gap: 30px;
`

export const OptionBox = styled.div`
  background: ${(props): string => props.theme.ixoLightGrey2};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 12px;
  width: 140px;
  height: 140px;
  transition: all 0.2s;
`

export const OptionBoxWrapper = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  cursor: pointer;
  width: 200px;

  &:hover {
    text-decoration: none;
    ${OptionBox} {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`
