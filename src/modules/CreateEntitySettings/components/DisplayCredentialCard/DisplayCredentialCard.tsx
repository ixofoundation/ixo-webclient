import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { customControls } from '../../../../common/components/JsonForm/types'

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

export default DisplayCredential
