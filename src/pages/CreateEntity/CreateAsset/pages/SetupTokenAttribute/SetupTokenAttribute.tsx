import { Box } from 'modules/App/App.styles'
import React, { useState } from 'react'
import { LocalisationForm, TokenAttributeCardForm } from '../../forms'
import { Localisations } from '../../forms/LocalisationForm'
import { PageWrapper } from './SetupTokenAttribute.styles'

const SetupTokenAttribute: React.FC = (): JSX.Element => {
  const [localisation, setLocalisation] = useState(Localisations.EN)
  return (
    <PageWrapper>
      <Box className="d-flex flex-column">
        <LocalisationForm
          localisation={localisation}
          setLocalisation={setLocalisation}
        />
        <Box className="mb-2" />
        <TokenAttributeCardForm />
      </Box>
      <Box></Box>
    </PageWrapper>
  )
}

export default SetupTokenAttribute
