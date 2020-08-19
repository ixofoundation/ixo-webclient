import React from 'react'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'

interface Props extends FormCardProps {
  title: string
  shortDescription: string
  fileSrc: string
  imageDescription: string
  organisation: string
  sdgs: string[]
  location: string
  uploadingImage: boolean
}

const HeaderCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      shortDescription,
      imageDescription,
      organisation,
      location,
      fileSrc,
      uploadingImage,
      sdgs,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      fileSrc,
      title,
      shortDescription,
      organisation,
      location,
      sdgs: sdgs.join('|'),
      imageDescription,
    }

    const schema = {
      type: 'object',
      required: [
        'fileSrc',
        'title',
        'shortDescription',
        'organisation',
        'location',
      ],
      properties: {
        fileSrc: { type: 'string', title: 'Header Image' },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
        organisation: { type: 'string', title: 'Organisation' },
        location: { type: 'string', title: 'Country' },
        sdgs: { type: 'string', title: 'Tag' },
        imageDescription: { type: 'string', title: 'Header Image Description' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        ['ui:uploading']: uploadingImage,
        ['ui:maxDimension']: 960,
        ['ui:aspect']: 16 / 9,
        ['ui:circularCrop']: false,
      },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
      organisation: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Organisation',
      },
      location: {
        'ui:widget': customControls['countryselector'],
      },
      sdgs: {
        'ui:widget': customControls['sdgselector'],
      },
      imageDescription: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
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
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default HeaderCard
