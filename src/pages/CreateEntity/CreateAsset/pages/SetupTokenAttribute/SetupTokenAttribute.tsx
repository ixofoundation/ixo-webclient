import { Box } from 'modules/App/App.styles'
import React, { useState } from 'react'
import { LocalisationForm, TokenAttributeCardForm } from '../../forms'
import { Localisations } from '../../forms/LocalisationForm'
import { PageWrapper } from './SetupTokenAttribute.styles'

const SetupTokenAttribute: React.FC = (): JSX.Element => {
  const [localisation, setLocalisation] = useState(Localisations.EN)
  const [formData, setFormData] = useState({
    denom: undefined,
    image: undefined,
    icon: undefined,
    assetType: undefined,
    assetName: undefined,
    collectionName: undefined,
    maximumQuantity: undefined,
    decimals: undefined,
  })

  return (
    <PageWrapper>
      <Box className="d-flex flex-column">
        <LocalisationForm
          localisation={localisation}
          setLocalisation={setLocalisation}
        />
        <Box className="mb-2" />
        <TokenAttributeCardForm formData={formData} setFormData={setFormData} />
      </Box>
      <Box></Box>
    </PageWrapper>
  )
}

export default SetupTokenAttribute
