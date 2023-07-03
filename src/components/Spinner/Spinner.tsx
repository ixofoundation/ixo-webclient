import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { selectEntityThemeConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { LoaderContainer, Pulse } from './Spinner.styles'

export interface Props {
  info?: string
  transparentBg?: boolean
  scale?: number
}

export const Spinner: React.SFC<Props> = ({ info, transparentBg, scale }) => {
  const theme = useAppSelector(selectEntityThemeConfig)

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: scale(${scale});
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: ${(props): string => (transparentBg ? '' : theme?.backgroundColor ?? props.theme.ixoDarkestBlue)};
    flex: 1 1 auto;
    p {
      color: ${(props) => props.theme.ixoNewBlue};
      margin-top: 10px;
    }
  `
  return (
    <Container>
      <LoaderContainer>
        <Pulse />1
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
  const theme = useAppSelector(selectEntityThemeConfig)

  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    background-color: ${(props): string => theme?.backgroundColor ?? props.theme.ixoDarkestBlue};
    flex: 1 1 auto;
    p {
      color: ${(props): string => props.theme.ixoNewBlue};
      margin-top: 10px;
      font-size: 32px;
      font-weight: 900;
    }
    a {
      color: ${(props): string => props.theme.ixoNewBlue};
    }
  `
  return (
    <Container>
      <p>{error}</p>
      <Link to={'/'}>Take me home</Link>
    </Container>
  )
}
