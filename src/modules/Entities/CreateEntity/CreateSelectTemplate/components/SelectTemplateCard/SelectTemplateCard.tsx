import React, { FunctionComponent, useMemo } from 'react'
import styled from 'styled-components'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import * as Toast from 'common/utils/Toast'
import { useSelector } from 'react-redux'
import { RootState } from 'common/redux/types'
import { selectEntityType } from 'modules/Entities/CreateEntity/CreateEntity.selectors'
import { EntityType } from 'modules/Entities/types'

const FormContainer = styled.div`
  border-top: 1px solid #e8edee;
  margin-top: 4rem;
  padding-top: 1.25rem;
`

const ImportButton = styled.button`
  border: 1px solid #56ccf2;
  border-radius: 4px;
  color: #49bfe0;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  background: transparent;
  width: 115px;
  height: 50px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

interface Props extends FormCardProps {
  handleResetContent: () => void
}

// eslint-disable-next-line react/display-name
const SelectTemplateCard: FunctionComponent<Props> = React.forwardRef(
  ({ handleSubmitted, handleUpdateContent, handleResetContent }, ref) => {
    const entityType = useSelector(selectEntityType)

    const entityTypes = [
      'Template',
      'Project',
      'Investment',
      'Asset',
      'Oracle',
      'Cell',
    ]
    const entityTypeNames = [
      'Claim',
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
          onFormDataChange={(formData) =>
            handleUpdateContent(formData.template)
          }
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
