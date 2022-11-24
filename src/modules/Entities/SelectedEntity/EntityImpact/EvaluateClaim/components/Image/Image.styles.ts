import styled from 'styled-components'

export const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  opacity: 0;
`

export const Container = styled.div`
  position: relative;

  &:hover ${IconContainer} {
    opacity: 1;
    cursor: pointer;
  }
`

export const ImageWrapper = styled.div`
  display: block;
  background: black;
  position: relative;

  img {
    min-width: 45rem;
    max-width: 55rem;
  }
`

export const Shadow = styled.div`
  filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.3));
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const ModalInner = styled.div`
  padding: 2rem 0rem;
  margin: 0rem -0.7rem;
  position: relative;
`
