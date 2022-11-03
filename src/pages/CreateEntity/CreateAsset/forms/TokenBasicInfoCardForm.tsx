import React from 'react'
import {
  FormWrapper,
  FormHeader,
  FormBody,
  FormRow,
} from './TokenBasicInfoCardForm.styles'
import {
  HeadlineMetric,
  IconUpload,
  ImageUpload,
  Input,
  InputWithLabel,
  SelectWithLabel,
} from '../../components'
import { thousandSeparator } from 'common/utils/formatters'
import { Box, theme, Typography } from 'modules/App/App.styles'

interface Props {
  formData: any
  setFormData: (data: any) => void
}

const TokenAttributeCardForm: React.FC<Props> = ({
  formData,
  setFormData,
}): JSX.Element => {
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
            width="110px"
            height="36px"
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
          <SelectWithLabel
            width="150px"
            height="36px"
            label="Asset Type"
            value={formData.type}
            handleChange={(value): void =>
              setFormData((prev) => ({ ...prev, type: value }))
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
            inputValue={formData.tokenName}
            handleChange={(value): void =>
              setFormData((prev) => ({ ...prev, tokenName: String(value) }))
            }
          />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Class Name"
            inputValue={formData.name}
            handleChange={(value): void =>
              setFormData((prev) => ({
                ...prev,
                name: String(value),
              }))
            }
          />
        </FormRow>

        <FormRow>
          <HeadlineMetric />
        </FormRow>

        <FormRow>
          <InputWithLabel
            label="Max Amount (or blank if unlimited)"
            inputValue={thousandSeparator(formData.maxSupply, ',')}
            handleChange={(value): void => {
              const val = value.replace(/[^0-9]/g, '')
              if (!isNaN(val)) {
                setFormData((prev) => ({
                  ...prev,
                  maxSupply: val,
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
                    decimals: Number(val),
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

export default TokenAttributeCardForm
