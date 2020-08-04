import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { FormData } from '../../../../common/components/JsonForm/types'
import { Attestation } from '../../types'

interface Props {
  attestation: Attestation
  question: string
  shortDescription: string
  handleUpdateContent: (formData: FormData, attestation: Attestation) => void
}

const BasicTextInput: React.FunctionComponent<Props> = ({
  attestation,
  question,
  shortDescription,
  handleUpdateContent,
}) => {
  const formData = {
    question,
    shortDescription,
  }

  const schema = {
    type: 'object',
    required: [],
    properties: {
      question: { type: 'string', title: 'Question' },
      shortDescription: { type: 'string', title: 'Short Description' },
    },
  } as any

  const uiSchema = {
    question: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Question',
    },
    shortDescription: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Start Typing',
    },
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer>
      <Form
        formData={formData}
        onChange={(control): void =>
          handleUpdateContentDebounce(control.formData, attestation)
        }
        noHtml5Validate
        liveValidate
        showErrorList={false}
        schema={schema}
        uiSchema={uiSchema}
        transformErrors={formUtils.transformErrors}
        ObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        <span className="hide">&nbsp;</span>
      </Form>
    </FormContainer>
  )
}

export default BasicTextInput
