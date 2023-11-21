import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import { ReactNode } from 'react'

const Container = styled.div`
  padding: 20px 0px;
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoDarkestBlue};
  color: white;

  @media (max-width: ${deviceWidth.mobile}px) {
    padding: 0.625rem 0;
  }
`

interface Props {
  className?: string
  children?: ReactNode
}

export const LayoutWrapper: React.FunctionComponent<Props> = ({ children, className }) => {
  return <Container className={`container-fluid ${className}`}>{children}</Container>
}
