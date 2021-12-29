import React from 'react'
import { customControls } from 'common/components/JsonForm/types'
import { KeyPurpose, KeyType } from '../../../../../types'
import { keyPurposeMap, keyTypeMap } from '../../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  purpose: KeyPurpose
  type: KeyType
  keyValue: string
  signature: string
  controller: string
  dateCreated: string
  dateUpdated: string
}

const KeyCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      purpose,
      type,
      keyValue,
      signature,
      controller,
      dateCreated,
      dateUpdated,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      purpose,
      type,
      keyValue,
      signature,
      controller,
      dateCreated,
      dateUpdated,
    }

    const schema = {
      type: 'object',
      required: [
        'purpose',
        'type',
        'keyValue',
        'controller',
        'dateCreated',
        'dateUpdated',
        'signature',
      ],
      properties: {
        purpose: {
          type: 'string',
          title: 'Purpose of the Key',
          enum: Object.keys(KeyPurpose).map((key) => KeyPurpose[key]),
          enumNames: Object.keys(KeyPurpose).map(
            (key) => keyPurposeMap[KeyPurpose[key]].title,
          ),
        },
        type: {
          type: 'string',
          title: 'Key Type',
          enum: Object.keys(KeyType).map((key) => KeyType[key]),
          enumNames: Object.keys(KeyType).map(
            (key) => keyTypeMap[KeyType[key]].title,
          ),
        },
        keyValue: {
          type: 'string',
          title: 'Key Value or Token',
        },
        controller: {
          type: 'string',
          title: 'Controller DID or !name',
        },
        dateCreated: {
          type: 'string',
          title: 'Key Creation Date',
        },
        dateUpdated: {
          type: 'string',
          title: 'Latest Update',
        },
        signature: {
          type: 'string',
          title: 'Signature',
        },
      },
    } as any

    const uiSchema = {
      purpose: {
        'ui:placeholder': 'Select Purpose',
      },
      type: {
        'ui:placeholder': 'Select Key',
      },
      keyValue: {
        'ui:placeholder': 'Paste a Valid String',
      },
      controller: {
        'ui:placeholder': 'Enter DID or !name',
      },
      dateCreated: {
        'ui:widget': customControls['singledateselector'],
      },
      dateUpdated: {
        'ui:widget': customControls['singledateselector'],
      },
      signature: {
        'ui:placeholder': 'Enter signature',
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
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default KeyCard
