import React, { useRef } from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
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
}

const HeaderCard: React.FunctionComponent<Props> = ({
  title,
  shortDescription,
  imageDescription,
  company,
  country,
  fileSrc,
  uploadingImage,
  sdgs,
  handleUpdateContent,
  handleError,
}) => {
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

  const multiFormRef = useRef() as any

  return (
    <>
      <MultiControlForm
        ref={multiFormRef}
        handleSubmit={(): void => console.log('submitted')}
        handleFormDataChange={handleUpdateContent}
        handleError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
      >
        <div onClick={(): void => multiFormRef.current.validateAndSubmit()}>
          Submit
        </div>
      </MultiControlForm>
    </>
  )
}

export default HeaderCard
