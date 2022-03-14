import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'

interface Props extends FormCardProps {
  title: string
  urls: string[]
}

const EmbeddedContentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      urls,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      title,
      urls: urls.join('|'),
    }

    const schema = {
      type: 'object',
      required: ['title', 'urls'],
      properties: {
        title: { type: 'string', title: 'Title' },
        urls: { type: 'string', title: 'URL Links' },
      },
    } as any

    const uiSchema = {
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      urls: {
        'ui:widget': customControls['embeddedtextbox'],
        'ui:socialIcon': 'URL Links',
        'ui:placeholder': 'Enter a valid URL in the format https://...',
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
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default EmbeddedContentCard
