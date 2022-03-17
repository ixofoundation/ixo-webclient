import React from 'react'
import { ServiceType } from '../../../../../types'
import { serviceTypeMap } from '../../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: ServiceType
  serviceId: string
  shortDescription: string
  serviceEndpoint: string
  publicKey: string
  properties: string
}

const ServiceCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      serviceId,
      shortDescription,
      serviceEndpoint,
      publicKey,
      properties,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      type,
      serviceId,
      shortDescription,
      serviceEndpoint,
      publicKey,
      properties,
    }

    const schema = {
      type: 'object',
      required: [
        'type',
        'serviceId',
        'shortDescription',
        'serviceEndpoint',
        'publicKey',
        'properties',
      ],
      properties: {
        type: {
          type: 'string',
          title: 'Service Type',
          enum: Object.keys(ServiceType).map((key) => ServiceType[key]),
          enumNames: Object.keys(ServiceType).map(
            (key) => serviceTypeMap[ServiceType[key]].title,
          ),
        },
        serviceId: {
          type: 'string',
          title: 'Service Identifier',
        },
        serviceEndpoint: {
          type: 'string',
          title: 'Service Endpoint',
        },
        publicKey: {
          type: 'string',
          title: 'Public Key / Token',
        },
        properties: {
          type: 'string',
          title: 'Other Parameters',
        },
        shortDescription: {
          type: 'string',
          title: 'Short Description',
        },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Service',
      },
      serviceId: {
        'ui:placeholder': 'Enter DID or !name',
      },
      serviceEndpoint: {
        'ui:placeholder': 'Enter URL',
      },
      publicKey: {
        'ui:placeholder': 'Enter Value',
      },
      properties: {
        'ui:placeholder': 'Paste a Valid String',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
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

export default ServiceCard
