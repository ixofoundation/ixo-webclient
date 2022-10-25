import React from 'react'
import { TokenAttributeCardForm } from '../../forms'
import { PageWrapper } from './SetupTokenAttribute.styles'

const SetupTokenAttribute: React.FC = (): JSX.Element => {
  return (
    <PageWrapper>
      <TokenAttributeCardForm />
    </PageWrapper>
  )
}

export default SetupTokenAttribute
