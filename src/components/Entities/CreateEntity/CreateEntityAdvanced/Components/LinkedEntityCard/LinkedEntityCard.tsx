import React from 'react'
import { EntityType } from '../../../../../../types/entities'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: EntityType
  entityId: string
}

const LinkedEntityCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ type, entityId, handleUpdateContent, handleSubmitted, handleError, handleRemoveSection }, ref) => {
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
          enumNames: Object.keys(EntityType).map((key) => entityTypeMap[EntityType[key]].title),
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
LinkedEntityCard.displayName = 'LinkedEntityCard'

export default LinkedEntityCard
