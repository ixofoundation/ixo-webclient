import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntity/editEntity.types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  context: string
  contextLink: string
  evaluationMethodology: string
  evaluationAttributes: string[]
}

const EvaluationCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      context,
      contextLink,
      evaluationAttributes,
      evaluationMethodology,
      handleUpdateContent,
      handleSubmitted,
      handleRemoveSection,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      context,
      contextLink,
      evaluationMethodology,
      evaluationAttributes,
    }

    const schema = {
      type: 'object',
      required: ['context', 'contextLink', 'evaluationMethodology', 'evaluationAttributes'],
      properties: {
        context: {
          type: 'string',
          title: 'Context of the Evaluation',
        },
        contextLink: {
          type: 'string',
          title: 'Link to the Context',
        },
        evaluationMethodology: {
          type: 'string',
          title: 'Evaluation Methodology',
        },
        evaluationAttributes: {
          type: 'array',
          title: 'Attributes to Evaluate',
          minItems: 1,
          items: {
            type: 'string',
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
      evaluationMethodology: {
        'ui:widget': 'text',
        'ui:placeholder': 'Paste a Document Reference',
      },
      evaluationAttributes: {
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
EvaluationCard.displayName = 'EvaluationCard'

export default EvaluationCard
