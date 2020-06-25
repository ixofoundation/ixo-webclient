import * as React from 'react'
import { HeroContainer, HeroActionsWrapper } from './Hero.styles'

export const Hero: React.FunctionComponent = () => {
  return (
    <HeroContainer>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <h6>Quality Primary Education</h6>
            <h1>Claim Name</h1>
            <p>This would be a short description of the claim.</p>
          </div>
          <HeroActionsWrapper className="col-md-4 col-12">
            <button>Save</button>
          </HeroActionsWrapper>
        </div>
      </div>
    </HeroContainer>
  )
}
