import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'

interface Props {
  id: string
  title: string
  urls: string[]
  handleUpdateContent: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const EmbeddedContentCard: React.FunctionComponent<Props> = ({
  id,
  title,
  urls,
  handleUpdateContent,
  handleRemoveSection,
}) => {
  const formData = {
    title,
    urls: urls.join('|'),
  }

  const schema = {
    type: 'object',
    required: [],
    properties: {
      title: { type: 'string', title: 'Title' },
      urls: { type: 'string', title: 'Url Links' },
    },
  } as any

  const uiSchema = {
    linkedInUrl: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    urls: {
      ['ui:widget']: customControls['embeddedtextbox'],
      ['ui:socialIcon']: 'URL Links',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <Form
          formData={formData}
          onChange={(control): void =>
            handleUpdateContentDebounce(id, control.formData)
          }
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
      </div>
      <div className="col-lg-12 text-right">
        <button type="button" onClick={(): void => handleRemoveSection(id)}>
          Remove
        </button>
      </div>
    </FormContainer>
  )
}

export default EmbeddedContentCard
