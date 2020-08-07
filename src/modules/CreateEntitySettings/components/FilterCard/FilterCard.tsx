import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { EntityType } from '../../../../modules/Entities/types'
import { entityTypeMap } from '../../../../modules/Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  filters: { [name: string]: string[] }
  entityType: EntityType
  handleUpdate: (formData: FormData) => void
}

const convertArrayToObject = (array, key): {} => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}

const DisplayCredential: React.FunctionComponent<Props> = ({
  filters,
  entityType,
  handleUpdate,
}) => {
  const propertiesArray = entityTypeMap[entityType].filterSchema.ddoTags.map(
    category => ({
      type: 'array',
      title: category.name,
      items: {
        type: 'string',
        enum: category.tags.map(tag => tag.name),
      },
      uniqueItems: true,
    }),
  )

  const schema = {
    type: 'object',
    required: [],
    properties: convertArrayToObject(propertiesArray, 'title'),
  } as any

  return (
    <MultiControlForm
      onSubmit={(): void => null}
      onFormDataChange={(formData): void => handleUpdate(formData)}
      formData={filters}
      schema={schema}
      uiSchema={{}}
      multiColumn
    >
      &nbsp;
    </MultiControlForm>
  )
}

export default DisplayCredential
