import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import {
  FormContainer,
  FormWrapper,
} from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { EntityType } from 'src/modules/Entities/types'
import { entityTypeMap } from 'src/modules/Entities/strategy-map'

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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
          <Form
            formData={filters}
            onChange={(control): void => handleUpdateDebounce(control.formData)}
            noHtml5Validate
            liveValidate
            showErrorList={false}
            schema={schema}
            transformErrors={formUtils.transformErrors}
            ObjectFieldTemplate={ObjectFieldTemplate2Column}
          >
            &nbsp;
          </Form>
        </FormWrapper>
      </div>
    </FormContainer>
  )
}

export default DisplayCredential
