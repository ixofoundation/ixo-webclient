import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props extends FormCardProps {
  credential: string
  badge: string
}

const DisplayCredential: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      credential,
      badge,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
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

export default DisplayCredential
