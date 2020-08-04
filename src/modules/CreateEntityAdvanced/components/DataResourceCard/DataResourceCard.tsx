import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { DataResourceType } from '../../../Entities/types'
import { dataResourceTypeMap } from '../../../Entities/strategy-map'

interface Props {
  id: string
  type: DataResourceType
  dataId: string
  resourceLocator: string
  otherParams: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const FundCard: React.FunctionComponent<Props> = ({
  id,
  type,
  dataId,
  resourceLocator,
  otherParams,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    type,
    dataId,
    resourceLocator,
    otherParams,
  }

  const schema = {
    type: 'object',
    required: ['type', 'dataId', 'resourceLocator', 'otherParams'],
    properties: {
      type: {
        type: 'string',
        title: 'Data Resource',
        enum: Object.keys(DataResourceType).map(key => DataResourceType[key]),
        enumNames: Object.keys(DataResourceType).map(
          key => dataResourceTypeMap[DataResourceType[key]].title,
        ),
      },
      dataId: { type: 'string', title: 'Data Identifier' },
      resourceLocator: { type: 'string', title: 'Resouce Locator' },
      otherParams: { type: 'string', title: 'Other Parameters' },
    },
  } as any

  const uiSchema = {
    type: { ['ui:placeholder']: 'Select Resource' },
    dataId: { ['ui:placeholder']: 'Enter DID or !name' },
    resourceLocator: { ['ui:placeholder']: 'Enter URL' },
    otherParams: { ['ui:placeholder']: 'Paste a Valid Parameter String' },
  }

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <Form
          formData={formData}
          onChange={(control): void =>
            handleUpdateDebounce(id, control.formData)
          }
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
      <div className="col-lg-12 text-right">
        <button type="button" onClick={(): void => handleRemoveSection(id)}>
          Remove
        </button>
      </div>
    </FormContainer>
  )
}

export default FundCard
