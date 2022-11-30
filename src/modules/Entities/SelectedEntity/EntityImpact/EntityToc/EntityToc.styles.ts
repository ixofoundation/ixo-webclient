import styled from 'styled-components'
import { LayoutWrapper } from 'common/components/Wrappers/LayoutWrapper'

export const Layout = styled(LayoutWrapper)`
  padding-top: 0;
  font-weight: 400;
`
export const PageTitle = styled.div`
  color: white;
  font-size: 1.425rem;
  font-weight: normal;
`

export const PageInfoContainer = styled.div`
  font-size: 0.8125rem;
  margin-top: 0.25rem;

  > span {
    margin-right: 0.75rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const StatusLabel = styled.span`
  color: #85ad5c;
`

export const CardBoardWrapper = styled.div`
  margin-top: 1.75rem;
  margin-bottom: 3.25rem;
`
