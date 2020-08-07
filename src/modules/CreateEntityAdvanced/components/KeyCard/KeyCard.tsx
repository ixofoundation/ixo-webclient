import React from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import {
  PaymentDenomination,
  KeyPurpose,
  KeyType,
} from '../../../Entities/types'
import {
  paymentDenominationMap,
  keyPurposeMap,
  keyTypeMap,
} from '../../../Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'

interface Props {
  id: string
  purpose: KeyPurpose
  type: KeyType
  denomination: PaymentDenomination
  controllerId: string
  dateCreated: string
  dateUpdated: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const KeyCard: React.FunctionComponent<Props> = ({
  id,
  purpose,
  type,
  denomination,
  controllerId,
  dateCreated,
  dateUpdated,
  handleUpdate,
  handleRemoveSection,
}) => {
  const formData = {
    purpose,
    type,
    denomination,
    controllerId,
    dateCreated,
    dateUpdated,
  }

  const schema = {
    type: 'object',
    required: [
      'purpose',
      'type',
      'denomination',
      'controllerId',
      'dateCreated',
      'dateUpdated',
    ],
    properties: {
      purpose: {
        type: 'string',
        title: 'Purpose of the Key',
        enum: Object.keys(KeyPurpose).map(key => KeyPurpose[key]),
        enumNames: Object.keys(KeyPurpose).map(
          key => keyPurposeMap[KeyPurpose[key]].title,
        ),
      },
      type: {
        type: 'string',
        title: 'Key Type',
        enum: Object.keys(KeyType).map(key => KeyType[key]),
        enumNames: Object.keys(KeyType).map(
          key => keyTypeMap[KeyType[key]].title,
        ),
      },
      denomination: {
        type: 'string',
        title: 'Key Value or Token',
        enum: Object.keys(PaymentDenomination).map(
          key => PaymentDenomination[key],
        ),
        enumNames: Object.keys(PaymentDenomination).map(
          key => paymentDenominationMap[PaymentDenomination[key]].title,
        ),
      },
      controllerId: {
        type: 'string',
        title: 'Enter DID or !name',
      },
      dateCreated: {
        type: 'string',
        title: 'Key Creation Date',
      },
      dateUpdated: {
        type: 'string',
        title: 'Latest Update',
      },
    },
  } as any

  const uiSchema = {
    purpose: {
      ['ui:placeholder']: 'Select Purpose',
    },
    type: {
      ['ui:placeholder']: 'Select Key',
    },
    denomination: {
      ['ui:placeholder']: 'Select Denomination',
    },
    controllerId: {
      ['ui:placeholder']: 'Enter DID or !name',
    },
    dateCreated: {
      ['ui:widget']: customControls['singledateselector'],
    },
    dateUpdated: {
      ['ui:widget']: customControls['singledateselector'],
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

export default KeyCard
