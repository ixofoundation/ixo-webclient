import { theme, Typography } from 'common/components/App/App.styles'
import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'redux/createEntity/createEntity.hooks'
import { CreateEntityStrategyMap } from 'redux/createEntity/strategy-map'
import {
  LayoutBody,
  LayoutContainer,
  LayoutHeader,
  LayoutRow,
  LayoutWrapper,
  BreadCrumbs,
} from './CreateEntityLayout.styles'

interface Props {
  children?: React.ReactNode
}

const CreateEntityLayout: React.FC<Props> = ({ children }): JSX.Element => {
  const history = useHistory()
  const {
    location: { pathname },
  } = history

  const { stepNo, updateEntityType } = useCreateEntityState()
  const { getStrategyAndStepByPath } = useCreateEntityStrategy()
  const { strategy, step } = getStrategyAndStepByPath(pathname)
  const title = strategy?.title
  const entityType = strategy?.entityType
  const name = step?.name

  const renderBreadCrumbs = (): JSX.Element => {
    const breadCrumbs = [{ text: 'Protocol', link: '/' }, { text: title }]
    return (
      <BreadCrumbs>
        {breadCrumbs.map((item, index) => {
          if (index !== breadCrumbs.length - 1) {
            return (
              <Typography
                key={index}
                fontFamily={theme.secondaryFontFamily}
                color={theme.ixoMediumGrey}
                fontWeight={400}
                fontSize={'12px'}
                lineHeight={'14px'}
              >
                {item.link ? <NavLink to={item.link}> {item.text}</NavLink> : item.text}
                {'  >  '}
              </Typography>
            )
          }
          return (
            <Typography
              key={index}
              fontFamily={theme.secondaryFontFamily}
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize={'12px'}
              lineHeight={'14px'}
            >
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
      history.push(steps[stepNo].url)
    }
    // eslint-disable-next-line
  }, [stepNo, entityType])

  return (
    <LayoutWrapper>
      <LayoutHeader>
        <LayoutContainer className='container'>
          <LayoutRow className='row d-flex flex-column' style={{ gap: 20 }}>
            {renderBreadCrumbs()}
            <Typography
              fontFamily={theme.secondaryFontFamily}
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize='45px'
              lineHeight='53px'
              style={{ letterSpacing: 0.3 }}
            >
              {title}
            </Typography>
            <Typography
              fontFamily={theme.secondaryFontFamily}
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize='18px'
              lineHeight='21px'
              style={{ textTransform: 'uppercase', letterSpacing: 0.3 }}
            >
              {name}
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
