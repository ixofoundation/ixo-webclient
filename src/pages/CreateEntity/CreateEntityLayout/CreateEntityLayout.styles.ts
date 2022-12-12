import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const LayoutHeader = styled.div`
  background: ${(props): string => props.theme.ixoLightGrey};
  padding: 40px 0;
`

export const LayoutBody = styled.div`
  padding: 60px 0;
`

export const LayoutContainer = styled.div``
export const LayoutRow = styled.div``

export const BreadCrumbs = styled.div`
  text-transform: uppercase;
  a {
    color: ${(props): string => props.theme.ixoMediumGrey};
    &:hover {
      text-decoration: none;
      color: ${(props): string => props.theme.ixoMediumGrey};
    }
  }
`
