import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'
import { CreateEntityStrategyMap } from 'redux/createEntity/strategy-map'
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
  children?: React.ReactNode
}

const CreateEntityLayout: React.FC<Props> = ({ children }): JSX.Element => {
  const history = useHistory()
  const {
    location: { pathname },
  } = history

  const { stepNo, updateEntityType, gotoStepByNo } = useCreateEntityState()
  const { getStrategyAndStepByPath } = useCreateEntityStrategy()
  const { strategy, step } = getStrategyAndStepByPath(pathname)
  const title = strategy?.title ?? 'Create a Protocol'
  const entityType = strategy?.entityType
  const subtitle = step?.name ?? 'Select a Type of Protocol'

  const renderBreadCrumbs = (): JSX.Element => {
    const breadCrumbs = [{ text: 'Protocol', link: '/create/entity' }, { text: title }]
    return (
      <BreadCrumbs>
        {breadCrumbs.map((item, index) => {
          if (index !== breadCrumbs.length - 1) {
            return (
              <Typography key={index} variant='secondary' size='sm' color='gray-medium'>
                {item.link ? <NavLink to={item.link}> {item.text}</NavLink> : item.text}
                &nbsp;&gt;&nbsp;
              </Typography>
            )
          }
          return (
            <Typography key={index} variant='secondary' color='black' size='sm'>
              {item.text}
            </Typography>
          )
        })}
      </BreadCrumbs>
    )
  }

  useEffect(() => {
    if (entityType) {
      updateEntityType(entityType)
    }
    // eslint-disable-next-line
  }, [entityType])

  useEffect(() => {
    if (entityType && stepNo) {
      const { steps } = CreateEntityStrategyMap[entityType]
      steps[stepNo]?.url && history.push(steps[stepNo].url)
    }
    // eslint-disable-next-line
  }, [stepNo, entityType])

  useEffect(() => {
    step?.id && gotoStepByNo(step.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step?.id])

  return (
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
  )
}

export default CreateEntityLayout
