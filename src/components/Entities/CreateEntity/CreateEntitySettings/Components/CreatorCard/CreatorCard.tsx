import React from 'react'
import { customControls } from 'components/JsonForm/types'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  creatorId: string
  credential: string
  fileSrc: string
  uploadingImage: boolean
}

const CreatorCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      displayName,
      location,
      email,
      website,
      mission,
      creatorId,
      credential,
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
      location,
      email,
      website,
      mission,
      creatorId,
      credential,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['fileSrc', 'displayName', 'location', 'email', 'website', 'mission', 'creatorId'],
      properties: {
        fileSrc: { type: 'string', title: 'Logo or Profile Pic' },
        empty: { type: 'null' },
        displayName: { type: 'string', title: 'Display Name' },
        location: { type: 'string', title: 'Country of Origin' },
        email: { type: 'string', title: 'Public Email', format: 'email' },
        website: { type: 'string', title: 'Public Website', format: 'uri' },
        mission: { type: 'string', title: 'Mission' },
        creatorId: { type: 'string', title: 'Identifier' },
        credential: {
          type: 'string',
          title: 'Credential ID',
        },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 440,
        'ui:previewWidth': 160,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      displayName: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      location: {
        'ui:widget': customControls['countryselector'],
      },
      email: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Email',
      },
      website: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter /Paste URL',
      },
      mission: {
        'ui:widget': 'text',
        'ui:placeholder': 'Short Description',
      },
      creatorId: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter ID or !name',
      },
      credential: {
        'ui:widget': 'text',
        'ui:placeholder': 'Paste Credential',
      },
    }

    return (
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
    )
  },
)
CreatorCard.displayName = 'CreatorCard'

export default CreatorCard
