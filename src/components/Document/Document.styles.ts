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

export const Container = styled.a`
  display: block;
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;

  &:hover ${IconContainer} {
    opacity: 1;
    cursor: pointer;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`
