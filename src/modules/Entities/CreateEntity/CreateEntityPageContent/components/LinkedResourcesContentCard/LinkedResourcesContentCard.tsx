import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { ObjectFieldLinkedResourcesColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { LinkedResourceContent } from '../../types'
import styled from 'styled-components'

const Wrapper = styled.div`
  #add_embeddedUrl {
    display: none !important;
  }
`

interface Props extends FormCardProps, LinkedResourceContent {
  uploadingResource: boolean
}

const LinkedResourcesContentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      path,
      type,
      resourceFormat,
      displayName,
      displayDescription,
      endpoint,
      proof,
      encrypted,
      uploadingResource,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      path,
      type,
      resourceFormat,
      displayName,
      displayDescription,
      endpoint,
      proof,
      encrypted,
    }

    const schema = {
      type: 'object',
      required: [
        'path',
        'type',
        'displayName',
        'displayDescription',
        'endpoint',
      ],
      properties: {
        path: { type: 'string', title: 'Upload (or add by URI)' },
        displayName: { type: 'string', title: 'Resource Display Name' },
        endpoint: {
          type: 'string',
          title: 'Resource Link (or upload a file)',
        },
        type: { type: 'string', title: 'Type of Resource' },
        displayDescription: { type: 'string', title: 'Resource Description' },
      },
    } as any

    const uiSchema = {
      path: {
        'ui:widget': customControls['fileupload'],
        'ui:uploading': uploadingResource,
        'ui:maxDimension': 440,
        'ui:previewWidth': 160,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      displayName: {
        'ui:widget': 'text',
        'ui:placeholder': 'Descriptive name',
      },
      endpoint: {
        'ui:widget': customControls['embeddedtextbox'],
        'ui:socialIcon': 'URL Links',
        'ui:placeholder': 'https://...',
      },
      type: {
        'ui:widget': customControls['resourcetype'],
        'ui:placeholder': 'Resource Type',
      },
      displayDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start typing here',
      },
    }

    return (
      <Wrapper>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          customObjectFieldTemplate={ObjectFieldLinkedResourcesColumn}
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </Wrapper>
    )
  },
)

export default LinkedResourcesContentCard
