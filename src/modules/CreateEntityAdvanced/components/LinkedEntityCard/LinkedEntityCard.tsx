import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { EntityType } from '../../../../modules/Entities/types'
import { entityTypeMap } from '../../../../modules/Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'

interface Props {
  id: string
  type: EntityType
  entityId: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const LinkedEntityCard: React.FunctionComponent<Props> = ({
  id,
  type,
  entityId,
  handleUpdate,
  handleRemoveSection,
}) => {
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
        enum: Object.keys(EntityType).map(key => EntityType[key]),
        enumNames: Object.keys(EntityType).map(
          key => entityTypeMap[EntityType[key]].title,
        ),
      },
      entityId: { type: 'string', title: 'Entity ID' },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Entity',
    },
    entityId: {
      ['ui:placeholder']: 'Enter DID or !name',
    },
  }

  return (
    <>
      <MultiControlForm
        onSubmit={(): void => null}
        onFormDataChange={(formData): void => handleUpdate(id, formData)}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
      <div className="text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </>
  )
}

export default LinkedEntityCard
