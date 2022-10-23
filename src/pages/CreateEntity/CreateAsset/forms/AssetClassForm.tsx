import React, { useState } from 'react'
import {
  FormWrapper,
  FormHeader,
  FormBody,
  FormRow,
} from './AssetClassForm.styles'
import {
  HeadlineMetric,
  IconUpload,
  ImageUpload,
  Input,
  InputWithLabel,
} from '../components'
import { thousandSeparator } from 'common/utils/formatters'
import { Box, theme, Typography } from 'modules/App/App.styles'

const AssetClassForm: React.FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    denom: undefined,
    image: undefined,
    icon: undefined,
    assetType: undefined,
    assetName: undefined,
    collectionName: undefined,
    maximumQuantity: undefined,
    decimals: undefined,
  })

  return (
    <FormWrapper>
      <FormHeader>
        <ImageUpload
          image={formData.image}
          handleChange={(value): void =>
            setFormData((prev) => ({ ...prev, image: value }))
          }
        />
      </FormHeader>

      <FormBody>
        <FormRow style={{ gap: 10, justifyContent: 'space-between' }}>
          <InputWithLabel
            width={'110px'}
            label="DENOM"
            inputValue={formData.denom}
            error={formData.denom === 'CSTOVE' && 'Not available'} // TODO:
            handleChange={(value): void =>
              setFormData((prev) => ({
                ...prev,
                denom: String(value).toUpperCase(),
              }))
            }
          />
          <InputWithLabel
            width={'150px'}
            label="Asset Type"
            inputValue={formData.assetType}
            handleChange={(value): void =>
              setFormData((prev) => ({ ...prev, assetType: String(value) }))
            }
          />
          <IconUpload
            icon={formData.icon}
            handleChange={(value): void =>
              setFormData((prev) => ({ ...prev, icon: value }))
            }
          />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Asset Name"
            inputValue={formData.assetName}
            handleChange={(value): void =>
              setFormData((prev) => ({ ...prev, assetName: String(value) }))
            }
          />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Collection Name"
            inputValue={formData.collectionName}
            handleChange={(value): void =>
              setFormData((prev) => ({
                ...prev,
                collectionName: String(value),
              }))
            }
          />
        </FormRow>

        <FormRow>
          <HeadlineMetric />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Maximum Quantity"
            inputValue={thousandSeparator(formData.maximumQuantity, ',')}
            handleChange={(value): void => {
              const val = value.replace(/[^0-9]/g, '')
              if (!isNaN(val)) {
                setFormData((prev) => ({
                  ...prev,
                  maximumQuantity: val,
                }))
              }
            }}
          />
        </FormRow>

        <FormRow>
          <Box className="d-flex align-items-center" style={{ gap: 10 }}>
            <Input
              width="45px"
              className="text-center"
              placeholder="0"
              maxLength={2}
              inputValue={formData.decimals}
              handleChange={(value): void => {
                const val = value.replace(/[^0-9]/g, '')
                if (!isNaN(val)) {
                  setFormData((prev) => ({
                    ...prev,
                    decimals: Number(value),
                  }))
                }
              }}
            />
            <Typography
              fontWeight={700}
              fontSize="18px"
              lineHeight="18px"
              color={theme.ixoMediumGrey}
            >
              decimals
            </Typography>
          </Box>
        </FormRow>
      </FormBody>
    </FormWrapper>
  )
}

export default AssetClassForm
