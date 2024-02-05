import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutBody,
  LayoutContainer,
  LayoutHeader,
  LayoutRow,
  LayoutWrapper,
  BreadCrumbs,
} from './styles'
import { Typography } from 'components/Typography'
import { Box } from 'components/App/App.styles'
import { ScrollArea } from '@mantine/core'

interface Props {
  title: string
  subtitle: string
  breadCrumbs: { text: string; link?: string }[]
  children?: React.ReactNode
}

const CreateEntityLayout: React.FC<Props> = ({ title, subtitle, breadCrumbs, children }): JSX.Element => {
  const renderBreadCrumbs = (): JSX.Element => {
    return (
      <BreadCrumbs>
        {breadCrumbs.map((item, index) => (
          <Typography key={index} variant='secondary' size='sm' color='grey700'>
            {item.link ? <NavLink to={item.link}> {item.text}</NavLink> : item.text}
            &nbsp;&gt;&nbsp;
          </Typography>
        ))}

        <Typography variant='secondary' color='black' size='sm'>
          {title}
        </Typography>
      </BreadCrumbs>
    )
  }

  return (
    <ScrollArea w='100%' h='100%'>
      <LayoutWrapper>
        <LayoutHeader>
          <LayoutContainer className='container'>
            <LayoutRow className='row d-flex flex-column'>
              <Box className='mb-4'>{renderBreadCrumbs()}</Box>
              <Typography variant='secondary' size='5xl' className='mb-2'>
                {title}
              </Typography>
              <Typography variant='secondary' size='2xl'>
                {subtitle}
              </Typography>
            </LayoutRow>
          </LayoutContainer>
        </LayoutHeader>
        <LayoutBody>
          <LayoutContainer className='container'>
            <LayoutRow className='row'>{children}</LayoutRow>
          </LayoutContainer>
        </LayoutBody>
      </LayoutWrapper>
    </ScrollArea>
  )
}

export default CreateEntityLayout
