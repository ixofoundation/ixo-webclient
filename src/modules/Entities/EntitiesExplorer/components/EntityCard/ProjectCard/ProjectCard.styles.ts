import styled from 'styled-components'
import { Logo as LogoBase } from '../EntityCard.styles'

export const Flag = styled.img`
  position: absolute;
  right: 40px;
`
export const Logo = styled(LogoBase)`
  position: absolute;
  bottom: 32px;
  right: 32px;
`

export const Impact = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 0;
  color: #a5adb0 !important;
`

export const Progress = styled.div`
  margin-top: 1rem;
  font-size: 36px;
  line-height: 1.2;
  font-weight: normal;
`

export const ProgressSuccessful = styled.span`
  color: black;
`

export const ProgressRequired = styled.span`
  color: grey;
`
