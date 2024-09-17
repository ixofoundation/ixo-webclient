import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './BaseProfileForm.styles'
import { IconUpload, ImageUpload, InputWithLabel } from '../../Components'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import _ from 'lodash'

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

const BaseProfileForm = ({
  image,
  setImage,
  logo,
  setLogo,
  orgName,
  setOrgName,
  name,
  setName,
  ...rest
}: Props): JSX.Element => {
  const { entityType } = useCreateEntityState()

  const upperFirstEntityType = _.upperFirst(entityType)

  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <FlexBox $justifyContent='flex-end'>
          <IconUpload icon={logo} placeholder={`${upperFirstEntityType} Icon`} handleChange={setLogo} />
        </FlexBox>

        <FormRow>
          {setOrgName ? (
            <InputWithLabel label='Organisation' height='48px' inputValue={orgName} handleChange={setOrgName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {orgName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel
              label={`${upperFirstEntityType} Name`}
              height='48px'
              inputValue={name}
              handleChange={setName}
            />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>
        <FlexBox my={10}>
          <Typography size='xl' color='grey300'>
            # Members
          </Typography>
        </FlexBox>
      </FormBody>
    </FormWrapper>
  )
}

export default BaseProfileForm
