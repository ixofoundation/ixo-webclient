import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutBody,
  LayoutContainer,
  LayoutHeader,
  LayoutRow,
  LayoutWrapper,
  BreadCrumbs,
} from './CreateEntityLayout.styles'
import { Typography } from 'components/Typography'
import { Box } from 'components/App/App.styles'

interface Props {
  title: string
  subtitle: string
  breadCrumbs: { text: string; link?: string }[]
  children?: React.ReactNode
}

type RenderBreadCrumbsProps = {
  breadCrumbs: { text: string; link?: string }[]
  title: string
}

const RenderBreadCrumbs = ({breadCrumbs, title}: RenderBreadCrumbsProps): JSX.Element => {
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

const CreateEntityLayout: React.FC<Props> = ({ title, subtitle, breadCrumbs, children }): JSX.Element => {
  return (
    <LayoutWrapper>
      <LayoutHeader>
        <LayoutContainer className='container'>
          <LayoutRow className='row d-flex flex-column'>
            <Box className='mb-4'><RenderBreadCrumbs breadCrumbs={breadCrumbs} title={title} /></Box>
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
  )
}

export default CreateEntityLayout
