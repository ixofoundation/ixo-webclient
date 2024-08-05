import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { selectEntityThemeConfig } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { LoaderContainer, Pulse } from './Spinner.styles'

const Container = styled.div<{ $backgroundColor: string; scale: number; $transparentBg?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: scale(${(props) => props.scale});
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-color: ${(props): string =>
    props.$transparentBg ? '' : props.$backgroundColor ?? props.theme.ixoDarkestBlue};
  flex: 1 1 auto;
  p {
    color: ${(props) => props.theme.colors.blue[5]};
    margin-top: 10px;
  }
`

export interface Props {
  info?: string
  transparentBg?: boolean
  scale?: number
}

export const Spinner = ({ info, transparentBg, scale = 1 }: Props) => {
  const theme = useAppSelector(selectEntityThemeConfig)

  return (
    <Container $transparentBg={transparentBg} scale={scale} $backgroundColor={theme?.backgroundColor}>
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
      color: ${(props): string => props.theme.colors.blue[5]};
      margin-top: 10px;
      font-size: 32px;
      font-weight: 900;
    }
    a {
      color: ${(props): string => props.theme.colors.blue[5]};
    }
  `
  return (
    <Container>
      <p>{error}</p>
      <Link to={'/'}>Take me home</Link>
    </Container>
  )
}
