import { Typography } from 'modules/App/App.styles'
import React from 'react'
import { Button } from '../../components'
import { FormWrapper } from './LocalisationForm.styles'

export enum Localisations {
  EN = 'EN',
  FR = 'FR',
  ES = 'ES',
  CHI = 'CHI',
}

interface Props {
  localisation: Localisations
  setLocalisation: (value: Localisations) => void
}

const LocalisationForm: React.FC<Props> = ({
  localisation,
  setLocalisation,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        Localisation:
      </Typography>
      {Object.entries(Localisations).map(([key, value]) => (
        <Button
          key={key}
          variant={localisation === value ? 'primary' : 'secondary'}
          size="sm"
          onClick={(): void => setLocalisation(value)}
        >
          {value}
        </Button>
      ))}
    </FormWrapper>
  )
}

export default LocalisationForm
