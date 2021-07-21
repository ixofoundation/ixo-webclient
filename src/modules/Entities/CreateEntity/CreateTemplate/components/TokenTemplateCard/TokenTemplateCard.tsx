import React from 'react'
import styled from 'styled-components'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'

interface Props extends FormCardProps {
  displayName: string
  email: string
  website: string
  mission: string
  fileSrc: string
  uploadingImage: boolean
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  > div {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  top: -2.5rem;
  right: 0;
  width: auto !important;

  button {
    width: 220px;
    height: 40px;
    font-weight: normal;
    font-size: 1rem;
    line-height: 19px;
    border-radius: 4px;
    border: none;
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    color: #fff;
    margin-left: 1.25rem;

    &:focus {
      outline-style: none;
      box-shadow: none;
      border: 1px solid #fff;
    }

    &:disabled {
      opacity: 0.8;
      color: ${(props: any): string => props.theme.fontLightGreyBlue};
    }
  }
`

const TokenTemplateCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      displayName,
      email,
      website,
      mission,
      fileSrc,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      displayName,
      email,
      website,
      mission,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['ownerId'],
      properties: {
        fileSrc: { type: 'string', title: 'Biodiversity Impact Token' },
        displayName: { type: 'string', title: 'Token Name' },
        email: { type: 'string', title: 'Collection/Set' },
        website: { type: 'string', title: 'Token ID or Denom' },
        mission: { type: 'string', title: 'Max Token Supply' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['documentupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 440,
        'ui:previewWidth': 160,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      displayName: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Token Name',
      },
      email: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Collection/Set',
      },
      website: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Token ID or Denom',
      },
      mission: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Max Token Supply',
      },
    }

    return (
      <FormContainer>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default TokenTemplateCard
