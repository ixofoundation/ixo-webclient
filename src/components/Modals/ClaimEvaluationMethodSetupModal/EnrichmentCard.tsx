import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { FormCardProps } from 'types/protocol'

export interface EnrichmentResource {
  productId: string
  resource: string
}

interface Props extends FormCardProps {
  context: string
  contextLink: string
  resources: EnrichmentResource[]
}

const EnrichmentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    { context, contextLink, resources, handleUpdateContent, handleSubmitted, handleRemoveSection, handleError },
    ref,
  ) => {
    const formData = {
      context,
      contextLink,
      resources,
    }

    const schema = {
      type: 'object',
      required: ['context', 'contextLink', 'resources'],
      properties: {
        context: {
          type: 'string',
          title: 'Context for the Claim Enrichment',
        },
        contextLink: {
          type: 'string',
          title: 'Link to the Context',
        },
        resources: {
          type: 'array',
          title: 'Resources',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              condition: { type: 'string', title: 'Product' },
              attribute: { type: 'string', title: 'Resource' },
            },
          },
        },
      },
    } as any

    const uiSchema = {
      context: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter a Context',
      },
      contextLink: {
        'ui:widget': 'text',
        'ui:placeholder': 'Paste a Resource Identifier (IRI)',
      },
      resources: {
        'ui:options': {
          addable: true,
          orderable: true,
          removable: true,
        },
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
EnrichmentCard.displayName = 'EnrichmentCard'

export default EnrichmentCard
