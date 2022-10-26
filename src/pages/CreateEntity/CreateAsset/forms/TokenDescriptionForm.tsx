import React from 'react'
import { TextArea } from '../components'
import { FormWrapper } from './TokenDescriptionForm.styles'

interface Props {
  description: string
  setDescription: (desc: string) => void
}

const TokenDescriptionForm: React.FC<Props> = ({
  description,
  setDescription,
}): JSX.Element => {
  return (
    <FormWrapper>
      <TextArea
        inputValue={description}
        handleChange={setDescription}
        width={'400px'}
        height={'240px'}
        placeholder={'Describe the Asset Class'}
      />
    </FormWrapper>
  )
}

export default TokenDescriptionForm
