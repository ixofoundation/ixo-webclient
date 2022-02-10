import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { FundSource } from '../../../../../types'
import { fundSourceMap } from '../../../../../strategy-map'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  source: FundSource
  fundId: string
}

const FundCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      source,
      fundId,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
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
          enum: Object.keys(FundSource).map((key) => FundSource[key]),
          enumNames: Object.keys(FundSource).map(
            (key) => fundSourceMap[FundSource[key]].title,
          ),
        },
        fundId: { type: 'string', title: 'Identity of Funding Source' },
      },
    } as any

    const uiSchema = {
      source: {
        'ui:placeholder': 'Select a Funding Source',
      },
      fundId: { 'ui:placeholder': 'Enter DID or !name' },
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
