import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntity/editEntity.types'
import { customControls } from 'common/components/JsonForm/types'
import { Entity } from 'common/components/EntitySelector/types'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  templateId: string
  title: string
  description: string
  isPrivate: boolean
  minTargetClaims: number
  maxTargetClaims: number
  goal: string
  submissionStartDate: string
  submissionEndDate: string
  templates: Entity[]
}

const TemplateCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      templateId,
      title,
      description,
      isPrivate,
      minTargetClaims,
      maxTargetClaims,
      goal,
      submissionStartDate,
      submissionEndDate,
      templates,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      templateId,
      title,
      description,
      isPrivate,
      minTargetClaims,
      maxTargetClaims,
      goal,
      submissionDates:
        submissionStartDate && submissionEndDate ? `${submissionStartDate}|${submissionEndDate}` : undefined,
    }

    const schema = {
      type: 'object',
      required: [
        'templateId',
        'title',
        'description',
        'isPrivate',
        'minTargetClaims',
        'maxTargetClaims',
        'goal',
        'submissionDates',
      ],
      properties: {
        templateId: { type: 'string', title: 'Claim Template' },
        title: { type: 'string', title: 'H1 Title' },
        goal: { type: 'string', title: 'Goal' },
        description: { type: 'string', title: 'Description' },
        minTargetClaims: {
          type: 'number',
          title: 'Minimum target number of claims to be submitted',
        },
        maxTargetClaims: {
          type: 'number',
          title: 'Maximum target number of claims to be submitted',
        },
        isPrivate: { type: 'boolean', title: 'Private?' },
        submissionDates: { type: 'string', title: 'Submission Period' },
      },
    } as any

    const uiSchema = {
      templateId: {
        'ui:widget': customControls['entityselector'],
        'ui:entities': templates,
      },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      description: {
        'ui:widget': 'text',
        'ui:placeholder': 'Start Typing Here',
      },
      isPrivate: {
        'ui:widget': 'select',
      },
      minTargetClaims: {
        'ui:placeholder': 'Minimum',
      },
      maxTargetClaims: {
        'ui:placeholder': 'Maximum',
      },
      goal: {
        'ui:placeholder': 'Enter Goal',
      },
      submissionDates: {
        'ui:widget': customControls['daterangeselector'],
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
        customObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)
TemplateCard.displayName = 'TemplateCard'

export default TemplateCard
