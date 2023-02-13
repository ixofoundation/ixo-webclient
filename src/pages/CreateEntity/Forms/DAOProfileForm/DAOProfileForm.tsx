import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './DAOProfileForm.styles'
import { ImageUpload, InputWithLabel } from '../../Components'
import { Box, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  orgName: string
  setOrgName?: (orgName: string) => void
  name: string
  setName?: (name: string) => void
}

const DAOProfileForm: React.FC<Props> = ({
  image,
  setImage,
  orgName,
  setOrgName,
  name,
  setName,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <Box width='100%' height='10px' style={{ background: theme.ixoGrey500 }} />
      <FormBody>
        <FormRow>
          {setOrgName ? (
            <InputWithLabel label='Organisation' inputValue={orgName} handleChange={setOrgName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {orgName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel label='Dao Name' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default DAOProfileForm
