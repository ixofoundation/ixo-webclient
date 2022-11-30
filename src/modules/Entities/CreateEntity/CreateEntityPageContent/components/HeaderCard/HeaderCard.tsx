import React from 'react'
import { customControls } from 'components/JsonForm/types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'

interface Props extends FormCardProps {
  title: string
  shortDescription: string
  headerFileSrc: string
  logoFileSrc: string
  imageDescription: string
  brand: string
  sdgs: string[]
  location: string
  uploadingHeaderImage: boolean
  uploadingLogoImage: boolean
}

const HeaderCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      shortDescription,
      imageDescription,
      brand,
      location,
      headerFileSrc,
      uploadingHeaderImage,
      logoFileSrc,
      uploadingLogoImage,
      sdgs,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      headerFileSrc,
      logoFileSrc,
      title,
      shortDescription,
      brand,
      location,
      sdgs: sdgs.join('|'),
      imageDescription,
    }

    const schema = {
      type: 'object',
      required: ['headerFileSrc', 'logoFileSrc', 'title', 'shortDescription', 'brand', 'location'],
      properties: {
        headerFileSrc: {
          type: 'string',
          title: 'Header Image (JPG/PNG at least 960px wide and 540px high)',
        },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
        logoFileSrc: { type: 'string', title: 'Brand Logo' },
        brand: { type: 'string', title: 'Brand' },
        location: { type: 'string', title: 'Country' },
        sdgs: { type: 'string', title: 'SDG Tags' },
        imageDescription: { type: 'string', title: 'Header Image Description' },
      },
    } as any

    const uiSchema = {
      headerFileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingHeaderImage,
        'ui:maxDimension': 960,
        'ui:aspect': 16 / 9,
        'ui:circularCrop': false,
      },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
      logoFileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingLogoImage,
        'ui:maxDimension': 440,
        'ui:previewWidth': 160,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      brand: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Brand',
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
HeaderCard.displayName = 'HeaderCard'

export default HeaderCard
