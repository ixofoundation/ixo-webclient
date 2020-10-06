import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 40px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  color: white;
`
export const LayoutWrapper: React.SFC<{}> = ({ children }) => {
  return <Container className="container-fluid">{children}</Container>
}
