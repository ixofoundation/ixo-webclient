import React from 'react'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
import { FormData } from '../../../../common/components/JsonForm/types'

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
    <>
      <MultiControlForm
        onSubmit={(): void => null}
        onFormDataChange={(formData): void => handleUpdate(id, formData)}
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

export default RequiredCredential
