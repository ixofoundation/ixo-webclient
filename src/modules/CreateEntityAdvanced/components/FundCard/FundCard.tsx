import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { FundSource } from '../../../Entities/types'
import { fundSourceMap } from '../../../Entities/strategy-map'
import { FormWrapper, RemoveButton } from '../CreateEntityAdvanced.styles'

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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
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
        </FormWrapper>
      </div>
      <div className="col-lg-12 text-right">
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          Remove
        </RemoveButton>
      </div>
    </FormContainer>
  )
}

export default FundCard
