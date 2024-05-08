import React, { useContext } from 'react'
import styled from 'styled-components'
import { deviceWidth } from 'constants/device'
import { DashboardThemeContext, ThemeContext } from './Dashboard'
import { ActionIcon } from '@mantine/core'
import { TbReload } from "react-icons/tb";
import { useEntity } from 'hooks/entity/useEntity'
import { useParams } from 'react-router-dom'

const ReloadButton = () => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const { loading, refetch } = useEntity(entityId)
  return <ActionIcon variant='outline' color='blue' size="lg" radius="sm" loading={loading} onClick={refetch}>
      <TbReload />
  </ActionIcon>
}

const Container = styled.div<{ theme: ThemeContext }>`
  display: flex;
  justify-content: space-between;
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
  title: string | JSX.Element
  subtle?: string
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
  const theme = useContext(DashboardThemeContext)

  return <Container theme={theme}>{title}<ReloadButton/></Container>
}

export default Header
