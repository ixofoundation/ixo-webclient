import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { FormCardProps } from '../../../types'

interface Props extends FormCardProps {
  credential: string
  issuer: string
}

const RequiredCredential: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      credential,
      issuer,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
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
        'ui:placeholder': 'Enter Identifier',
      },
      issuer: {
        'ui:placeholder': 'Enter DID or !name',
      },
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

export default RequiredCredential
