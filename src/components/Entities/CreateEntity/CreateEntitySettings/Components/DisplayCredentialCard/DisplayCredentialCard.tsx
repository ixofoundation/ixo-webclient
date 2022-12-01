import React from 'react'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { customControls } from 'components/JsonForm/types'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  credential: string
  badge: string
}

const DisplayCredential: React.FunctionComponent<Props> = React.forwardRef(
  ({ credential, badge, handleUpdateContent, handleSubmitted, handleError, handleRemoveSection }, ref) => {
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
        },
      },
    } as any

    const uiSchema = {
      credential: {
        'ui:placeholder': 'Enter a Credential ID',
      },
      badge: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Other',
        'ui:placeholder': 'Paste Url',
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
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </MultiControlForm>
        <div className='text-right'>
          <LinkButton type='button' onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)
DisplayCredential.displayName = 'DisplayCredential'

export default DisplayCredential
