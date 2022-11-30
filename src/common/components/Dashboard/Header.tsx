import React, { useContext } from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import { DashboardThemeContext, ThemeContext } from './Dashboard'

const Container = styled.div<{ theme: ThemeContext }>`
  font-weight: 400;
  font-size: 28px;
  padding: 0 0.25rem;
  line-height: 41px;
  color: ${({ theme }): string => (theme.isDark ? '#fff' : '#01283b')};

  @media (min-width: ${deviceWidth.mobile}px) {
    padding: 1.5rem 0;
    font-size: 45px;
  }
`

interface Props {
  title: string
  subtle?: string
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
  const theme = useContext(DashboardThemeContext)

  return <Container theme={theme}>{title}</Container>
}

export default Header
