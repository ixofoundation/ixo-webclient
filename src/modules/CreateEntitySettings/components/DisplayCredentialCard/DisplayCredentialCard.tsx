import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { customControls } from '../../../../common/components/JsonForm/types'
import { RemoveButton, FormWrapper } from './DisplayCredentialCard.styles'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  id: string
  credential: string
  badge: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const DisplayCredential: React.FunctionComponent<Props> = ({
  id,
  credential,
  badge,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    credential,
    badge,
  }

  const schema = {
    type: 'object',
    required: ['credential', 'badge'],
    properties: {
      credential: {
        type: 'string',
        title: 'Credential',
      },
      badge: {
        type: 'string',
        title: 'Credential Badge',
        format: 'uri',
      },
    },
  } as any

  const uiSchema = {
    credential: {
      ['ui:placeholder']: 'Enter a Credential ID',
    },
    badge: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Other',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  return (
    <div>
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
    </div>
  )
}

export default DisplayCredential
