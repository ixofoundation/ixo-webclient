import React from 'react'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'
import { FormWrapper, RemoveButton } from '../PageContent.styles'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

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
    required: ['title', 'urls'],
    properties: {
      title: { type: 'string', title: 'Title' },
      urls: { type: 'string', title: 'Url Links' },
    },
  } as any

  const uiSchema = {
    title: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    urls: {
      ['ui:widget']: customControls['embeddedtextbox'],
      ['ui:socialIcon']: 'URL Links',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  return (
    <div>
      <div>
        <FormWrapper>
          <MultiControlForm
            handleSubmit={(): void => null}
            handleFormDataChange={(formData): void =>
              handleUpdateContent(id, formData)
            }
            formData={formData}
            schema={schema}
            uiSchema={uiSchema}
          >
            &nbsp;
          </MultiControlForm>
        </FormWrapper>
      </div>
      <div>
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          - Remove
        </RemoveButton>
      </div>
    </div>
  )
}

export default EmbeddedContentCard
