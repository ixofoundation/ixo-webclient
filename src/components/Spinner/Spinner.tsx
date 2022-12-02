import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { LoaderContainer, Pulse } from './Spinner.styles'

export interface Props {
  info?: string
  transparentBg?: boolean
  scale?: number
}

export const Spinner: React.SFC<Props> = ({ info, transparentBg, scale }) => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: scale(${scale});
    height: 100%;
    background-color: ${(props): string => (transparentBg ? '' : props.theme.bg.blue)};
    flex: 1 1 auto;
    p {
      color: ${/* eslint-disable-line */ (props) => props.theme.highlight.light};
      margin-top: 10px;
    }
  `
  return (
    <Container>
      <LoaderContainer>
        <Pulse />
        {/* <LoaderWrapper>
          <IxoIcon className="icon-ixo-x" />
        </LoaderWrapper> */}
      </LoaderContainer>
      {info ? <p>{info}</p> : null}
    </Container>
  )
}

interface ProjectLoadingErrorProps {
  error: string
}

export const ProjectLoadingError: React.FC<ProjectLoadingErrorProps> = ({ error }) => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background-color: ${(props): string => props.theme.bg.blue};
    flex: 1 1 auto;
    p {
      color: ${(props): string => props.theme.highlight.light};
      margin-top: 10px;
      font-size: 32px;
      font-weight: 900;
    }
    a {
      color: ${(props): string => props.theme.highlight.light};
    }
  `
  return (
    <Container>
      <p>{error}</p>
      <Link to={'/'}>Take me home</Link>
    </Container>
  )
}
