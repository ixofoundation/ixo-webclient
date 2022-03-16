import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { selectSelectedTemplateType } from 'modules/Entities/CreateEntity/CreateEntity.selectors'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { FormCardProps } from '../../../types'

const FormContainer = styled.div`
  border-top: 1px solid #e8edee;
  margin-top: 4rem;
  padding-top: 1.25rem;
`

// eslint-disable-next-line react/display-name
const SelectTemplateCard: FunctionComponent<FormCardProps> = React.forwardRef(
  ({ handleSubmitted, handleUpdateContent }, ref) => {
    const entityType = useSelector(selectSelectedTemplateType)

    // TODO: Token Class Template should be in a new URL
    const entityTypes = [
      'Template',
      'Token Class Template',
      'Project',
      'Investment',
      'Asset',
      'Oracle',
      'Cell',
    ]
    const entityTypeNames = [
      'Claim',
      'Token Class',
      'Project',
      'Investment',
      'Asset (Coming Soon)',
      'Oracle (Coming Soon)',
      'DAO (Coming Soon)',
    ]
    const formData = {
      template: entityType,
    }

    const schema = {
      type: 'object',
      properties: {
        template: {
          type: 'string',
          title: 'Select the Type of Template to Create',
          enum: entityTypes,
          enumNames: entityTypeNames,
        },
      },
    }

    const uiSchema = {
      template: {
        'ui:placeholder': 'Select Template',
      },
    }

    return (
      <FormContainer>
        <MultiControlForm
          formData={formData}
          ref={ref}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          liveValidate={false}
          multiColumn
        >
          <></>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default SelectTemplateCard
