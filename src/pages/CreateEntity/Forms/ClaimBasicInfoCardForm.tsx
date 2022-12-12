import React from 'react'
import { FormWrapper, FormBody, FormRow } from './ClaimBasicInfoCardForm.styles'
import { InputWithLabel, SelectWithLabel, TextArea } from '../Components'
import { Typography } from 'components/Typography'
import { TClaimType } from 'types/protocol'

interface Props {
  type: TClaimType
  setType: (type: TClaimType) => void
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
}

const ClaimBasicInfoCardForm: React.FC<Props> = ({
  type,
  setType,
  title,
  setTitle,
  description,
  setDescription,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormBody>
        <FormRow>
          <SelectWithLabel label='Claim Type' value={type} handleChange={setType} />
        </FormRow>

        <FormRow>
          {setTitle ? (
            <InputWithLabel label='Claim Title' inputValue={title} handleChange={setTitle} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {title}
            </Typography>
          )}
        </FormRow>

        <FormRow>
          {setDescription ? (
            <TextArea
              placeholder='Describe the Claim Form'
              inputValue={description}
              handleChange={setDescription}
              height={'350px'}
            />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {description}
            </Typography>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default ClaimBasicInfoCardForm
