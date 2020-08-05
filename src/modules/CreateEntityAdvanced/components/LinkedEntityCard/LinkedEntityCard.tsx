import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { EntityType } from 'src/modules/Entities/types'
import { entityTypeMap } from 'src/modules/Entities/strategy-map'

interface Props {
  type: EntityType
  entityId: string
  handleUpdate: (formData: FormData) => void
}

const LinkedEntityCard: React.FunctionComponent<Props> = ({
  type,
  entityId,
  handleUpdate,
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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <Form
          formData={formData}
          onChange={(control): void => handleUpdateDebounce(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
          ObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </Form>
      </div>
    </FormContainer>
  )
}

export default LinkedEntityCard
