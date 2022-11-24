import React from 'react'
import { Container } from './Badges.styles'

interface Props {
  badges: string[]
}

const Badges: React.FunctionComponent<Props> = ({ badges }) => {
  return (
    <Container>
      {badges.map((badge, index) => (
        <img key={index} src={badge} alt='' width={34} height={34} />
      ))}
    </Container>
  )
}

export default Badges
