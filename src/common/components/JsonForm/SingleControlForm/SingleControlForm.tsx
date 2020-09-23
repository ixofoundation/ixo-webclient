import React from 'react'
import { JSONSchema7 } from 'json-schema'
import Form, { UiSchema } from '@rjsf/core'
import { FormContainer } from '../JsonForm.styles'
import { FormData } from '../types'
import * as formUtils from '../JsonForm.utils'
import { ControlContainer } from './SingleControlForm.styles'

interface Props {
  schema: JSONSchema7
  uiSchema: UiSchema
  formData: FormData
  uploading: boolean
  handleSubmit: () => void
  handleFormDataChange: (formData: any) => void
}

const SingleControlForm: React.FunctionComponent<Props> = ({
  children,
  schema,
  uiSchema,
  formData,
  uploading,
  handleSubmit,
  handleFormDataChange,
}) => {
  return (
    <FormContainer>
      <ControlContainer>
        <Form
          onSubmit={handleSubmit}
          formData={formData}
          onChange={(control): void => handleFormDataChange(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
        >
          {children}
        </Form>
      </ControlContainer>
    </FormContainer>
  )
}

export default SingleControlForm
