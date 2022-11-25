import React from 'react'
import styled from 'styled-components'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

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
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </MultiControlForm>
      </FormContainer>
    )
  },
)
TokenTemplateCard.displayName = 'TokenTemplateCard'

export default TokenTemplateCard
