import React from 'react'
import { RemoveButton } from '../DisplayCredentialCard/DisplayCredentialCard.styles'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

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

  return (
    <div>
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
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          - Remove
        </RemoveButton>
      </div>
    </div>
  )
}

export default RequiredCredential
