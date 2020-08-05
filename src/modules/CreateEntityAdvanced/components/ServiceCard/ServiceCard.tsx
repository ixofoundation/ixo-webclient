import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import {
  FormContainer,
  FormWrapper,
} from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { ServiceType } from '../../../Entities/types'
import { serviceTypeMap } from '../../../Entities/strategy-map'

interface Props {
  type: ServiceType
  shortDescription: string
  endpoint: string
  publicKey: string
  otherParams: string
  handleUpdate: (formData: FormData) => void
}

const ServiceCard: React.FunctionComponent<Props> = ({
  type,
  shortDescription,
  endpoint,
  publicKey,
  otherParams,
  handleUpdate,
}) => {
  const formData = {
    type,
    shortDescription,
    endpoint,
    publicKey,
    otherParams,
  }

  const schema = {
    type: 'object',
    required: [
      'type',
      'shortDescription',
      'endpoint',
      'publicKey',
      'otherParams',
    ],
    properties: {
      type: {
        type: 'string',
        title: 'Service Type',
        enum: Object.keys(ServiceType).map(key => ServiceType[key]),
        enumNames: Object.keys(ServiceType).map(
          key => serviceTypeMap[ServiceType[key]].title,
        ),
      },
      shortDescription: {
        type: 'string',
        title: 'Short Description',
      },
      endpoint: {
        type: 'string',
        title: 'Service Endpoint',
      },
      publicKey: {
        type: 'string',
        title: 'Public Key / Token',
      },
      otherParams: {
        type: 'string',
        title: 'Other Parameters',
      },
    },
  } as any

  const uiSchema = {
    type: {
      ['ui:placeholder']: 'Select Service',
    },
    shortDescription: {
      ['ui:widget']: 'textarea',
      ['ui:placeholder']: 'Start Typing Here',
    },
    endpoint: {
      ['ui:placeholder']: 'Enter URL',
    },
    publicKey: {
      ['ui:placeholder']: 'Enter Value',
    },
    otherParams: {
      ['ui:placeholder']: 'Paste a Valid String',
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

export default ServiceCard
