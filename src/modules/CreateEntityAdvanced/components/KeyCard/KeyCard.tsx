import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import {
  FormContainer,
  FormWrapper,
} from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
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

interface Props {
  purpose: KeyPurpose
  type: KeyType
  denomination: PaymentDenomination
  controllerId: string
  dateCreated: string
  dateUpdated: string
  handleUpdate: (formData: FormData) => void
}

const KeyCard: React.FunctionComponent<Props> = ({
  purpose,
  type,
  denomination,
  controllerId,
  dateCreated,
  dateUpdated,
  handleUpdate,
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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
          <Form
            formData={formData}
            onChange={(control): void => handleUpdateDebounce(control.formData)}
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
        </FormWrapper>
      </div>
    </FormContainer>
  )
}

export default KeyCard
