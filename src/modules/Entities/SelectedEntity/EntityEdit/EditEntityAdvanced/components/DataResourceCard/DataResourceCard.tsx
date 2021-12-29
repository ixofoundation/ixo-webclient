import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { DataResourceType } from '../../../../../types'
import { dataResourceTypeMap } from '../../../../../strategy-map'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: DataResourceType
  dataId: string
  serviceEndpoint: string
  properties: string
}

const FundCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      dataId,
      serviceEndpoint,
      properties,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      type,
      dataId,
      serviceEndpoint,
      properties,
    }

    const schema = {
      type: 'object',
      required: ['type', 'dataId', 'serviceEndpoint', 'properties'],
      properties: {
        type: {
          type: 'string',
          title: 'Data Resource',
          enum: Object.keys(DataResourceType).map(
            (key) => DataResourceType[key],
          ),
          enumNames: Object.keys(DataResourceType).map(
            (key) => dataResourceTypeMap[DataResourceType[key]].title,
          ),
        },
        dataId: { type: 'string', title: 'Data Identifier' },
        serviceEndpoint: { type: 'string', title: 'Resource Locator' },
        properties: { type: 'string', title: 'Other Parameters' },
      },
    } as any

    const uiSchema = {
      type: { 'ui:placeholder': 'Select Resource' },
      dataId: { 'ui:placeholder': 'Enter DID or !name' },
      serviceEndpoint: { 'ui:placeholder': 'Enter URL' },
      properties: { 'ui:placeholder': 'Paste a Valid Parameter String' },
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
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default FundCard
