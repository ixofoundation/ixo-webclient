import React from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  ref: any
  title: string
  shortDescription: string
  fileSrc: string
  imageDescription: string
  company: string
  sdgs: string[]
  country: string
  uploadingImage: boolean
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
}

const HeaderCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      shortDescription,
      imageDescription,
      company,
      country,
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
      company,
      country,
      sdgs: sdgs.join('|'),
      imageDescription,
    }

    const schema = {
      type: 'object',
      required: ['fileSrc', 'title', 'shortDescription', 'company', 'country'],
      properties: {
        fileSrc: { type: 'string', title: 'Header Image' },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
        company: { type: 'string', title: 'Organisation' },
        country: { type: 'string', title: 'Country' },
        sdgs: { type: 'string', title: 'Tag' },
        imageDescription: { type: 'string', title: 'Header Image Description' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        ['ui:widget']: customControls['imageupload'],
        ['ui:uploading']: uploadingImage,
        ['ui:maxDimension']: 960,
        ['ui:aspect']: 16 / 9,
        ['ui:circularCrop']: false,
      },
      title: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter Title',
      },
      shortDescription: {
        ['ui:widget']: 'textarea',
        ['ui:placeholder']: 'Start Typing Here',
      },
      company: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter Organisation',
      },
      country: {
        ['ui:widget']: customControls['countryselector'],
      },
      sdgs: {
        ['ui:widget']: customControls['sdgselector'],
      },
      imageDescription: {
        ['ui:widget']: 'text',
        ['ui:placeholder']: 'Enter Title',
      },
    }

    console.log('iam form')

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
