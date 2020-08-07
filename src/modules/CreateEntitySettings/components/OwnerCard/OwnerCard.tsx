import React from 'react'
import { customControls } from '../../../../common/components/JsonForm/types'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  name: string
  country: string
  email: string
  website: string
  mission: string
  identifier: string
  matrixId: string
  fileSrc: string
  uploadingImage: boolean
}

const OwnerCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      name,
      country,
      email,
      website,
      mission,
      identifier,
      matrixId,
      fileSrc,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      name,
      country,
      email,
      website,
      mission,
      identifier,
      matrixId,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['identifier'],
      properties: {
        fileSrc: { type: 'string', title: 'Logo or Profile Pic' },
        name: { type: 'string', title: 'Display Name' },
        country: { type: 'string', title: 'Country of Origin' },
        email: { type: 'string', title: 'Public Email', format: 'email' },
        website: { type: 'string', title: 'Public Website', format: 'uri' },
        mission: { type: 'string', title: 'Mission' },
        identifier: { type: 'string', title: 'Identifier' },
        matrixId: { type: 'string', title: 'Public MatrixID' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        ['ui:widget']: customControls['imageupload'],
        ['ui:uploading']: uploadingImage,
        ['ui:maxDimension']: 440,
        ['ui:previewWidth']: 440,
        ['ui:aspect']: 1,
        ['ui:circularCrop']: false,
      },
      name: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter Title',
      },
      country: {
        ['ui:widget']: customControls['countryselector'],
      },
      email: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter Email',
      },
      website: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter /Paste URL',
      },
      mission: {
        ['ui:widget']: 'textarea',
        ['ui:placeholder']: 'Short Description',
      },
      identifier: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter ID or !name',
      },
      matrixId: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter MatrixID',
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
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default OwnerCard
