import React from 'react'
import { EntityType } from '../../../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { FormCardProps } from '../../../types'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'

interface Props extends FormCardProps {
  type: EntityType
  entityId: string
}

const LinkedEntityCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      entityId,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const entityTypeMap = useSelector(selectEntityConfig)
    const formData = {
      type,
      entityId,
    }

    const schema = {
      type: 'object',
      required: ['type', 'entityId'],
      properties: {
        type: {
          type: 'string',
          title: 'Entity Type',
          enum: Object.keys(EntityType).map((key) => EntityType[key]),
          enumNames: Object.keys(EntityType).map(
            (key) => entityTypeMap[EntityType[key]].title,
          ),
        },
        entityId: { type: 'string', title: 'Entity ID' },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Entity',
      },
      entityId: {
        'ui:placeholder': 'Enter DID or !name',
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

export default LinkedEntityCard
