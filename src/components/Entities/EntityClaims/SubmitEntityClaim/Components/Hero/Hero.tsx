import * as React from 'react'
import { HeroContainer } from './Hero.styles'

interface Props {
  entityTitle: string
  claimName: string
  claimDescription: string
}

export const Hero: React.FunctionComponent<Props> = ({ claimName, claimDescription }) => {
  return (
    <HeroContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>{claimName}</h1>
            <p>{claimDescription}</p>
          </div>
        </div>
      </div>
    </HeroContainer>
  )
}
