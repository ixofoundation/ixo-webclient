import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntity/editEntity.types'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { ApprovalAttribute } from '../../../../../../../redux/editEntityClaims/editEntityClaims.types'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  context: string
  contextLink: string
  approvalAttributes: ApprovalAttribute[]
}

const ApprovalCriterionCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      context,
      contextLink,
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
      approvalAttributes,
    }

    const schema = {
      type: 'object',
      required: ['context', 'contextLink', 'approvalAttributes'],
      properties: {
        context: {
          type: 'string',
          title: 'Context of the Approval Criteria',
        },
        contextLink: {
          type: 'string',
          title: 'Link to the Context',
        },
        approvalAttributes: {
          type: 'array',
          title: 'Approve If',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              attribute: { type: 'string', title: 'Attribute' },
              condition: { type: 'string', title: 'Meets this Condition' },
            },
          },
          /*           items: {
            type: 'string',
          }, */
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
      approvalAttributes: {
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
ApprovalCriterionCard.displayName = 'ApprovalCriterionCard'

export default ApprovalCriterionCard
