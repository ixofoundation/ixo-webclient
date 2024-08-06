import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './BaseProfileForm.styles'
import { IconUpload, ImageUpload, InputWithLabel } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import _ from 'lodash'
import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'
import { Flex } from '@mantine/core'

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
  const { entityType } = useCreateEntityStateAsActionState()

  const upperFirstEntityType = _.upperFirst(entityType)

  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <Flex justify='flex-end'>
          <IconUpload icon={logo} placeholder={`${upperFirstEntityType} Icon`} handleChange={setLogo} />
        </Flex>

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
        <Flex my={10}>
          <Typography size='xl' color='grey300'>
            # Members
          </Typography>
        </Flex>
      </FormBody>
    </FormWrapper>
  )
}

export default BaseProfileForm
