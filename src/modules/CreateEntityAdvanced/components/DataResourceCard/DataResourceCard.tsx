import React from 'react'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
import { DataResourceType } from '../../../Entities/types'
import { dataResourceTypeMap } from '../../../Entities/strategy-map'
import { FormCardProps } from '../../../CreateEntity/types'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props extends FormCardProps {
  type: DataResourceType
  dataId: string
  resourceLocator: string
  otherParams: string
}

const FundCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      dataId,
      resourceLocator,
      otherParams,
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

export default FundCard
