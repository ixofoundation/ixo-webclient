import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LoaderContainer = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Pulse = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${/* eslint-disable-line */ (props) => props.theme.ixoBlue};
  position: absolute;
  margin: 0;
  padding: 1px;

  @keyframes spinPulse {
    0% {
      width: 40px;
      height: 40px;
      background: ${(props): string => props.theme.highlight.light};
    }
    100% {
      width: 80px;
      height: 80px;
      background: rgba(0, 34, 51, 0);
    }
  }
  animation: spinPulse 1.5s infinite ease;
`

export interface Props {
  info: string
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
      <p>{info}</p>
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
