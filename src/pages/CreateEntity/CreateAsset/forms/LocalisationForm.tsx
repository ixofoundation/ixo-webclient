import { Typography } from 'modules/App/App.styles'
import React from 'react'
import { ELocalisation } from 'types'
import { Button } from '../../components'
import { FormWrapper } from './LocalisationForm.styles'

interface Props {
  localisation: ELocalisation
  setLocalisation: (value: ELocalisation) => void
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
      {Object.entries(ELocalisation).map(([key, value]) => (
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
