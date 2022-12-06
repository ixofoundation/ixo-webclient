import React from 'react'
import styled from 'styled-components'
import Mic from 'assets/icons/Mic'
import { requireCheckDefault } from 'utils/images'

const Container = styled.div`
  margin-left: 2rem;
  position: relative;
  margin-top: -1rem;
`

const IconContainer = styled.div`
  position: absolute;
  background: white;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
  transform: translate(-25%, 25%);
`
const AudioAvatar: React.FunctionComponent = () => {
  return (
    <Container>
      <img src={requireCheckDefault(require('assets/images/avatar.png'))} alt='Audio Avatar' />
      <IconContainer>
        <Mic />
      </IconContainer>
    </Container>
  )
}

export default AudioAvatar
