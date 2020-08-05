import React from 'react'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
import { FormData } from '../../../../common/components/JsonForm/types'
import { FundSource } from '../../../Entities/types'
import { fundSourceMap } from '../../../Entities/strategy-map'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  id: string
  source: FundSource
  fundId: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const FundCard: React.FunctionComponent<Props> = ({
  id,
  source,
  fundId,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    source,
    fundId,
  }

  const schema = {
    type: 'object',
    required: ['source', 'fundId'],
    properties: {
      source: {
        type: 'string',
        title: 'Source of Funding',
        enum: Object.keys(FundSource).map(key => FundSource[key]),
        enumNames: Object.keys(FundSource).map(
          key => fundSourceMap[FundSource[key]].title,
        ),
      },
      fundId: { type: 'string', title: 'Identity of Funding Source' },
    },
  } as any

  const uiSchema = {
    source: {
      ['ui:placeholder']: 'Select a Funding Source',
    },
    fundId: { ['ui:placeholder']: 'Enter DID or !name' },
  }

  return (
    <>
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
      <div className="text-right">
        <LinkButton type="button" onClick={(): void => handleRemoveSection(id)}>
          - Remove
        </LinkButton>
      </div>
    </>
  )
}

export default FundCard
