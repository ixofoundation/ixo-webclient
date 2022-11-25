import React from 'react'
import { Container, ShieldContainer, ShieldLabel, ShieldText, ShieldTextContainer } from './Shield.styles'

export enum ShieldColor {
  Grey = '#b6b6b6',
  Orange = '#f89d28',
  Green = '#b6b6b6',
  Red = '#e2223b',
  Blue = '#39c3e6',
  Maroon = '#7c2740',
  Yellow = '#e4bc3d',
}

interface Props {
  label: string
  text: string
  color: ShieldColor | string
}

const Shield: React.FunctionComponent<Props> = ({ label, text, color }) => {
  return (
    <Container>
      <ShieldContainer>
        <ShieldLabel>
          <ShieldText>{label}</ShieldText>
        </ShieldLabel>
        <ShieldTextContainer style={{ backgroundColor: color }}>
          <ShieldText>{text}</ShieldText>
        </ShieldTextContainer>
      </ShieldContainer>
    </Container>
  )
}

export default Shield
