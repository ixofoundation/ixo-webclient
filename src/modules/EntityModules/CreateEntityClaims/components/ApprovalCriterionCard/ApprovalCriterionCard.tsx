import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../CreateEntity/types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'

interface Props extends FormCardProps {
  context: string
  contextLink: string
  approvalCondition: string
  approvalAttributes: string[]
}

const ApprovalCriterionCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      context,
      contextLink,
      approvalCondition,
      approvalAttributes,
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
      approvalCondition,
      approvalAttributes,
    }

    const schema = {
      type: 'object',
      required: [
        'context',
        'contextLink',
        'approvalCondition',
        'approvalAttributes',
      ],
      properties: {
        context: {
          type: 'string',
          title: 'Context of the Approval Criteria',
        },
        contextLink: {
          type: 'string',
          title: 'Link to the Context',
        },
        approvalCondition: {
          type: 'string',
          title: 'Meets this Condition',
        },
        approvalAttributes: {
          type: 'array',
          title: 'Approve If',
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
      approvalCondition: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter a Required Condition',
      },
      approvalAttributes: {
        ['ui:options']: {
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

export default ApprovalCriterionCard
