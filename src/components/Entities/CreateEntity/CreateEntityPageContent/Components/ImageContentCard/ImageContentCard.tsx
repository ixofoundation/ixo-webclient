import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { customControls } from 'components/JsonForm/types'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'

interface Props extends FormCardProps {
  title: string
  content: string
  fileSrc: string
  imageDescription: string
  uploadingImage: boolean
}

const HeaderCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      content,
      fileSrc,
      imageDescription,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      title,
      content,
      imageDescription,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: { type: 'string', title: 'Title' },
        content: { type: 'string', title: 'Body Content' },
        fileSrc: { type: 'string', title: 'Image' },
        imageDescription: { type: 'string', title: 'Image Description' },
      },
    } as any

    const uiSchema = {
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      content: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 960,
        'ui:aspect': 16 / 9,
        'ui:circularCrop': false,
      },
      imageDescription: {
        'ui:widget': 'text',
        'ui:placeholder': 'Start Typing',
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
        >
          &nbsp;
        </MultiControlForm>
        <div className='text-right'>
          <LinkButton type='button' onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)
HeaderCard.displayName = 'HeaderCard'

export default HeaderCard
