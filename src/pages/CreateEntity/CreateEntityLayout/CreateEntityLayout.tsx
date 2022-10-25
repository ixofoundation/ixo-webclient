import { theme, Typography } from 'modules/App/App.styles'
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

interface Props {
  children?: React.ReactNode
}

const CreateEntityLayout: React.FC<Props> = ({ children }): JSX.Element => {
  // TODO: from redux
  const breadCrumbs = [
    { text: 'Protocol', link: '/' },
    { text: 'Create a token template' },
  ]
  const title = 'Create an Asset Class'
  const subTitle = 'Select Creation Process'

  const renderBreadCrumbs = (): JSX.Element => (
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
              {item.link ? (
                <NavLink to={item.link}> {item.text}</NavLink>
              ) : (
                item.text
              )}
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

  return (
    <LayoutWrapper>
      <LayoutHeader>
        <LayoutContainer className="container">
          <LayoutRow className="row d-flex flex-column" style={{ gap: 20 }}>
            {renderBreadCrumbs()}
            <Typography
              fontFamily={theme.secondaryFontFamily}
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize="45px"
              lineHeight="53px"
              style={{ letterSpacing: 0.3 }}
            >
              {title}
            </Typography>
            <Typography
              fontFamily={theme.secondaryFontFamily}
              color={theme.ixoBlack}
              fontWeight={400}
              fontSize="18px"
              lineHeight="21px"
              style={{ textTransform: 'uppercase', letterSpacing: 0.3 }}
            >
              {subTitle}
            </Typography>
          </LayoutRow>
        </LayoutContainer>
      </LayoutHeader>
      <LayoutBody>
        <LayoutContainer className="container">
          <LayoutRow className="row">{children}</LayoutRow>
        </LayoutContainer>
      </LayoutBody>
    </LayoutWrapper>
  )
}

export default CreateEntityLayout
