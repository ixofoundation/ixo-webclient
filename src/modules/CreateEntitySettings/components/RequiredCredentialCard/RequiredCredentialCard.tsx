import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props {
  id: string
  credential: string
  issuer: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const RequiredCredential: React.FunctionComponent<Props> = ({
  id,
  credential,
  issuer,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    credential,
    issuer,
  }

  const schema = {
    type: 'object',
    required: ['credential', 'issuer'],
    properties: {
      credential: {
        type: 'string',
        title: 'Credential',
      },
      issuer: {
        type: 'string',
        title: 'Credential Issuer',
      },
    },
  } as any

  const uiSchema = {
    credential: {
      ['ui:placeholder']: 'Enter Identifier',
    },
    issuer: {
      ['ui:placeholder']: 'Enter DID or !name',
    },
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

export default RequiredCredential
