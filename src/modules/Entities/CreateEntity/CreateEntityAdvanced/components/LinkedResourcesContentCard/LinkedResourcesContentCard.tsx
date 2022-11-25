import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { ObjectFieldLinkedResourcesColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { LinkedResourceContent } from '../../types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
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
      name,
      description,
      uploadingResource,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      file: path,
      type,
      name,
      description,
      path,
    }

    const schema = {
      type: 'object',
      required: ['path', 'type', 'name', 'description'],
      properties: {
        file: { type: 'string', title: 'Upload (or add by URI)' },
        name: { type: 'string', title: 'Resource Display Name' },
        path: {
          type: 'string',
          title: 'Resource Link (or upload a file)',
        },
        type: { type: 'string', title: 'Type of Resource' },
        description: { type: 'string', title: 'Resource Description' },
      },
    } as any

    const uiSchema = {
      file: {
        'ui:widget': customControls['fileupload'],
        'ui:uploading': uploadingResource,
        'ui:path': path,
      },
      name: {
        'ui:widget': 'text',
        'ui:placeholder': 'Descriptive name',
      },
      path: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Other',
        'ui:placeholder': 'https://...',
      },
      type: {
        'ui:widget': customControls['resourcetype'],
        'ui:placeholder': 'Resource Type',
      },
      description: {
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
        {handleRemoveSection && (
          <div className='text-right'>
            <LinkButton type='button' onClick={handleRemoveSection}>
              - Remove
            </LinkButton>
          </div>
        )}
      </Wrapper>
    )
  },
)
LinkedResourcesContentCard.displayName = 'LinkedResourcesContentCard'

export default LinkedResourcesContentCard
