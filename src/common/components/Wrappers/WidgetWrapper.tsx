import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { deviceWidth } from 'lib/commonData'

export enum gridSizes {
  standard = 'NORMAL',
  double = 'DOUBLE',
}

export interface ParentProps {
  title?: string
  link?: boolean
  path?: string
  linkIcon?: string
  gridHeight?: gridSizes
  padding?: boolean
  titleIcon?: JSX.Element
  light?: boolean
}

export const WidgetWrapper: React.SFC<ParentProps> = ({
  title,
  link,
  path,
  linkIcon,
  titleIcon,
  gridHeight,
  children,
  padding = true,
  light = false,
}) => {
  const Container = styled.div`
    background: ${/* eslint-disable-line */ (props) =>
      light ? 'unset' : props.theme.bg.gradientBlue};
    border: 1px solid
      ${/* eslint-disable-line */ props => light ? 'transparent' : props.theme.widgetBorder};
    padding: ${padding && padding === true ? '20px' : 0};
    box-shadow: ${light ? 'unset' : '0 2px 10px 0 rgba(0, 0, 0, 0.18)'};
    transform-origin: center;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    border-radius: 4px;
    height: 100%;

    h3 {
      font-family: ${/* eslint-disable-line */ props =>
        props.theme.fontRobotoCondensed};
      font-weight: normal;
      font-size: 19px;
    }

    @media (max-width: ${deviceWidth.mobile}px) {
      padding: 0.8rem 0.625rem;
    }
  `

  const FlexTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem;
    ${padding && padding === true
      ? ''
      : 'position: absolute; top: 30px; left: 30px;'}
    
    img, svg {
      width: 1.1rem;
      object-fit: contain;
      margin-right: 0.625rem;
    }

    @media (max-width: ${deviceWidth.mobile}px) {
      margin-bottom: 0.75rem;
    }
  `

  const FlexContent = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: center;
  `

  const WrappedLink = styled(Link)`
    color: white;

    p,
    a,
    i,
    h3 {
    }

    i {
      font-size: 20px;
      transition: transform 0.3s ease, opacity 0.3s;
      opacity: 0.4;
    }

    :hover {
      text-decoration: none;
      color: white;
    }

    :hover ${Container} {
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.5);
    }

    :hover p,
    :hover h3,
    :hover a,
    :hover i {
    }

    :hover i {
      transform: scale(1.1);
      opacity: 1;
    }
    .decimal {
      color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
    }
  `
  const setGridHeight = (): string => {
    if (!gridHeight || window.innerWidth < 576) {
      return 'none'
    } else if (gridHeight === gridSizes.standard) {
      return '330px'
    } else {
      return '660px'
    }
  }

  if (link) {
    return (
      <WrappedLink to={path}>
        <Container
          className="container-fluid"
          style={{ minHeight: setGridHeight() }}
        >
          <FlexTitle>
            <div>
              { titleIcon }    
              {title && title}
            </div>
            {linkIcon && <i className={linkIcon} />}
          </FlexTitle>
          <FlexContent>{children}</FlexContent>
        </Container>
      </WrappedLink>
    )
  } else {
    return (
      <Container
        className="container-fluid"
        style={{ minHeight: setGridHeight() }}
      >
        <FlexTitle style={{ justifyContent: 'flex-start' }}>
          { titleIcon }
          {title && title}
        </FlexTitle>
        <FlexContent>{children}</FlexContent>
      </Container>
    )
  }
}
