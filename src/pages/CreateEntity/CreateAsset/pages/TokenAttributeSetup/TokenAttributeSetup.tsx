import React from 'react'
import { TokenAttributeCardForm } from '../../forms'
import { PageWrapper } from './TokenAttributeSetup.styles'

const TokenAttributeSetup: React.FC = (): JSX.Element => {
  return (
    <PageWrapper>
      <TokenAttributeCardForm />
    </PageWrapper>
  )
}

export default TokenAttributeSetup
