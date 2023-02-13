import React from 'react'
import styled from 'styled-components'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { EntityClaimItem } from '../../../../../../redux/createEntityClaims/createEntityClaims.types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  headlineTemplateId: string
  entityClaims: EntityClaimItem[]
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    width: 50%;
  }
`

const Progress = styled.span`
  color: #282828;
`

const Total = styled.span`
  color: #a5adb0;
`

const Goal = styled.div`
  font-size: 36px;
  margin-top: -40px;
  font-weight: 400;
`

const HeadlineMetric: React.FunctionComponent<Props> = React.forwardRef(
  ({ headlineTemplateId, entityClaims, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      headlineTemplateId,
    }

    let goal = '',
      max = 0
    if (headlineTemplateId) {
      const selectedTemplate = entityClaims.find((claim) => claim.template.templateId === headlineTemplateId)
      if (selectedTemplate) {
        goal = selectedTemplate.template.goal
        max = selectedTemplate.template.maxTargetClaims
      }
    }

    const schema = {
      type: 'object',
      required: ['headlineTemplateId'],
      properties: {
        headlineTemplateId: {
          type: 'string',
          title: 'Source of Headline Metric',
          enum: entityClaims.map((claim) => claim.template.templateId),
          enumNames: entityClaims.map((claim) => claim.template.title),
        },
      },
    } as any

    const uiSchema = {
      headlineTemplateId: {
        'ui:placeholder': 'Source of Headline Metric',
      },
    }

    return (
      <FormContainer>
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
        {goal.length > 0 && (
          <Goal>
            <Progress>0</Progress>
            <Total>
              /{max} {goal}
            </Total>
          </Goal>
        )}
      </FormContainer>
    )
  },
)
HeadlineMetric.displayName = 'HeadlineMetric'

export default HeadlineMetric
