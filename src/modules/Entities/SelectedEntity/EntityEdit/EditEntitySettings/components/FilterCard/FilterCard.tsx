import React from 'react'
import { EntityType } from '../../../../../types'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { convertArrayToObject } from 'common/utils/transformationUtils'
import { useSelector } from 'react-redux'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  filters: { [name: string]: string[] }
  entityType: EntityType
}

const Filter: React.FunctionComponent<Props> = React.forwardRef(
  (
    { filters, entityType, handleUpdateContent, handleSubmitted, handleError },
    ref,
  ) => {
    const entityTypeMap = useSelector(selectEntityConfig)
    const propertiesArray = entityTypeMap[entityType].filterSchema.ddoTags.map(
      (category) => ({
        type: 'array',
        title: category.name,
        items: {
          type: 'string',
          enum: category.tags.map((tag) => tag.name),
        },
        uniqueItems: true,
        maxItems: category.multiSelect ? undefined : 1,
      }),
    )

    // Add sector filter
    propertiesArray.push({
      type: 'array',
      title: entityTypeMap[entityType].filterSchema.sector.name,
      items: {
        type: 'string',
        enum: entityTypeMap[entityType].filterSchema.sector.tags.map(
          (tag) => tag.name,
        ),
      },
      uniqueItems: true,
      maxItems: 1,
    })

    const schema = {
      type: 'object',
      required: [],
      properties: convertArrayToObject(propertiesArray, 'title'),
    } as any

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={filters}
        schema={schema}
        uiSchema={{}}
        customObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default Filter
