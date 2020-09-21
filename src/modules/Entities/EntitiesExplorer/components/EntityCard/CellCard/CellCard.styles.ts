import styled from 'styled-components'
import { Logo as LogoBase } from '../EntityCard.styles'

// TODO - use first bottom style when stats available
export const Logo = styled(LogoBase)`
  position: absolute;
  right: 32px;
  bottom: 170px;
  // bottom: 118px;
`

export const SummaryContainer = styled.div`
  margin-bottom: 18px;
  font-size: 22px;
`

export const SummaryLabel = styled.span`
  color: grey;
  font-weight: 400;
`

export const SummaryValue = styled.span`
  color: #000;
  margin-right: 0.5rem;
  font-weight: bold;
`
