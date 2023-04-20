import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './DAOProfileForm.styles'
import { IconUpload, ImageUpload, InputWithLabel } from '../../Components'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  logo: string | undefined
  setLogo: (logo: string) => void
  orgName: string
  setOrgName?: (orgName: string) => void
  name: string
  setName?: (name: string) => void
}

const DAOProfileForm: React.FC<Props> = ({
  image,
  setImage,
  logo,
  setLogo,
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

      <FormBody>
        <FlexBox justifyContent='flex-end'>
          <IconUpload icon={logo} placeholder='DAO Icon' handleChange={setLogo} />
        </FlexBox>

        <FormRow>
          {setOrgName ? (
            <InputWithLabel label='Organisation' height='48px' inputValue={orgName} handleChange={setOrgName} />
          ) : (
            <Typography color='gray-medium' size='xl' weight='bold'>
              {orgName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel label='DAO Name' height='48px' inputValue={name} handleChange={setName} />
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
