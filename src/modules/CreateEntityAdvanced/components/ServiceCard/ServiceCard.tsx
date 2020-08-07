import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ServiceType } from '../../../Entities/types'
import { serviceTypeMap } from '../../../Entities/strategy-map'
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'

interface Props {
  id: string
  type: ServiceType
  shortDescription: string
  endpoint: string
  publicKey: string
  otherParams: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const ServiceCard: React.FunctionComponent<Props> = ({
  id,
  type,
  shortDescription,
  endpoint,
  publicKey,
  otherParams,
  handleUpdate,
  handleRemoveSection,
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

export default ServiceCard
