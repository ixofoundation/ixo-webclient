import * as React from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

const Container = styled.div`
  padding: 20px 40px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  color: white;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.625rem;
  }
`
export const LayoutWrapper: React.SFC<{}> = ({ children }) => {
  return <Container className="container-fluid">{children}</Container>
}
