import React from 'react'
import { ELocalisation } from 'types/protocol'
import { Button } from '../../Components'
import { FormWrapper } from './LocalisationForm.styles'

interface Props {
  localisation: ELocalisation
  setLocalisation?: (value: ELocalisation) => void
}

const LocalisationForm: React.FC<Props> = ({ localisation, setLocalisation, ...rest }): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      {Object.entries(ELocalisation).map(([key, value]) => (
        <Button
          key={key}
          variant={localisation === value ? 'primary' : 'secondary'}
          size='sm'
          onClick={(): void => setLocalisation && setLocalisation(value)}
        >
          {value}
        </Button>
      ))}
    </FormWrapper>
  )
}

export default LocalisationForm
