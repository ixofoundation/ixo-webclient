import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  fileSrc: string
  uploadingImage: boolean
}

const HeaderCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      name,
      position,
      linkedInUrl,
      twitterUrl,
      fileSrc,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      name,
      position,
      linkedInUrl,
      twitterUrl,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['name', 'position'],
      properties: {
        fileSrc: { type: 'string', title: 'Image' },
        empty: { type: 'null' },
        name: { type: 'string', title: 'Name' },
        position: { type: 'string', title: 'Position' },
        linkedInUrl: { type: 'string', title: 'Linked In' },
        twitterUrl: { type: 'string', title: 'Twitter' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 440,
        'ui:previewWidth': 100,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      name: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      position: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      linkedInUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'LinkedIn',
        'ui:placeholder': 'Paste Url',
      },
      twitterUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Twitter',
        'ui:placeholder': 'Paste Url',
      },
    }

    return (
      <>
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
        <div className="col-lg-12 text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default HeaderCard
