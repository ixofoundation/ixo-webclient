import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { DataResourceType } from '../../../Entities/types'
import { dataResourceTypeMap } from '../../../Entities/strategy-map'
import { FormWrapper } from '../../../CreateEntityPageContent/components/PageContent.styles'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'
import { RemoveButton } from '../../../..//common/components/JsonForm/CustomWidgets/SDGSelector/SDGSelector.styles'

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

  return (
    <>
      <FormWrapper>
        <MultiControlForm
          handleSubmit={(): void => null}
          handleFormDataChange={(formData): void => handleUpdate(id, formData)}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
      </FormWrapper>
      <div className="text-right">
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          - Remove
        </RemoveButton>
      </div>
    </>
  )
}

export default FundCard
