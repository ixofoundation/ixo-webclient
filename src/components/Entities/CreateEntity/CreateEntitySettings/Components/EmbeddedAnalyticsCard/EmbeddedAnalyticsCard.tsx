import React from 'react'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { customControls } from 'components/JsonForm/types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  title: string
  urls: string[]
}

const EmbeddedAnalyticsCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ title, urls, handleUpdateContent, handleSubmitted, handleError, handleRemoveSection }, ref) => {
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
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
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
EmbeddedAnalyticsCard.displayName = 'EmbeddedAnalyticsCard'

export default EmbeddedAnalyticsCard
