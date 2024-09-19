import React from 'react'
import { FormWrapper, FormHeader, FormBody, FormRow } from './AssetCollectionProfileForm.styles'
import { IconUpload, ImageUpload, InputWithLabel } from '../../Components'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'

interface Props {
  image: string | undefined
  setImage: (image: string) => void
  logo: string | undefined
  setLogo: (logo: string) => void
  collectionName: string
  setCollectionName?: (collectionName: string) => void
  name: string
  setName?: (name: string) => void
  tokenName: string
  setTokenName?: (tokenName: string) => void
}

const AssetCollectionProfileForm: React.FC<Props> = ({
  image,
  setImage,
  logo,
  setLogo,
  collectionName,
  setCollectionName,
  name,
  setName,
  tokenName,
  setTokenName,
  ...rest
}): JSX.Element => {
  return (
    <FormWrapper {...rest}>
      <FormHeader>
        <ImageUpload image={image} handleChange={setImage} />
      </FormHeader>

      <FormBody>
        <FlexBox $justifyContent='flex-end'>
          <IconUpload icon={logo} placeholder='Logo' handleChange={setLogo} />
        </FlexBox>

        <FormRow>
          {setCollectionName ? (
            <InputWithLabel
              label='Collection Name'
              height='48px'
              inputValue={collectionName}
              handleChange={setCollectionName}
            />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {collectionName}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setName ? (
            <InputWithLabel label='Name' height='48px' inputValue={name} handleChange={setName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {name}
            </Typography>
          )}
        </FormRow>
        <FormRow>
          {setTokenName ? (
            <InputWithLabel label='Token Name' height='48px' inputValue={tokenName} handleChange={setTokenName} />
          ) : (
            <Typography color='grey700' size='xl' weight='bold'>
              {tokenName}
            </Typography>
          )}
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default AssetCollectionProfileForm
