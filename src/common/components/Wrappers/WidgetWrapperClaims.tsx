import styled from 'styled-components'

const Container = styled.div`
  background: ${/* eslint-disable-line */ (props) => props.theme.bg.gradientWhite};
  padding: 10px 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);

  p,
  h3,
  a {
    color: ${/* eslint-disable-line */ (props) => props.theme.fontDarkGrey};
  }

  h3 {
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
    font-weight: normal;
    font-size: 32px;
  }
`

export interface ParentProps {
  title?: string
}

export const WidgetWrapperClaims: React.SFC<ParentProps> = ({ title, children }) => {
  return (
    <Container className='container-fluid'>
      <h3>{title}</h3>
      {children}
    </Container>
  )
}
