import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 40px;
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoGrey300};
  color: white;
`
export const LayoutWrapperClaims = ({ children }: { children?: ReactNode}) => {
  return <Container className='container-fluid'>{children}</Container>
}
